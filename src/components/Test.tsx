import useMouse from '@react-hook/mouse-position';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import useAnimation from '../hooks/useAnimation';
import useWindowSize, { ISize } from '../hooks/useWindowSize';
import DiceStyle from '../styles/DiceStyle';
import { getRandomInt } from '../utilities/Random';
import Dice from './Dice';
//import animation_json from "../animations_json/animations_3xForces_2xDice.json"
//import animation_json from "../animations_json/animations.json"
import animation_json from "../animations_json/animations_3xForces_3.json"
import applyAnimation from '../utilities/applyAnimation';


interface TestState {
}

const initialState = {};

type TestProps = {
    children?: ReactNode
}
const SwipeableConfig = {
    delta: { up: 150 },
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
    rotationAngle: 90,
}

type DiceStatus = 'onMouse' | 'thrown';

//BEGIN --- Dice ---
var anim_dice_arr = animation_json.animations;

const FORCE_COUNT = 3;

const Force = {
    LOW: 0,
    MED: 1,
    HIGH: 2,
}

const toForceName = (force: number) => {
    switch (force) {
        case (Force.LOW):
            return "Low"
        case (Force.MED):
            return "Medium"
        case (Force.HIGH):
            return "High"
    }
}

/* index+1=dice_number, [up,down,left,right] (neighbours) */
const dice_graph = [
    [2, 5, 4, 3],
    [6, 1, 4, 3],
    [6, 1, 2, 5],
    [2, 5, 6, 1],
    [1, 6, 4, 3],
    [5, 2, 4, 3],
]

const getAxisChange = (result: number, desiredResult = 0) => {
    if (desiredResult == 0) return { x: 0, y: 0, z: 0 }
    if (result == desiredResult) return { x: 0, y: 0, z: 0 }
    if (result + desiredResult == 7) return { x: 2, y: 0, z: 0 }
    for (let i = 0; i < 4; i++) {
        var neighbour = dice_graph[result - 1][i];
        if (neighbour == desiredResult) {
            switch (i) {
                case (0): /* up */
                    return { x: 0, y: -1, z: 0 }
                case (1): /* down */
                    return { x: 0, y: 1, z: 0 }
                case (2): /* left */
                    return { x: -1, y: 0, z: 0 }
                case (3): /* right */
                    return { x: 1, y: 0, z: 0 }
            }
        }
    }
}
//END --- Dice ---

const Test = ({ children }: TestProps) => {
    //BEGIN --- Dice ---
    const [desiredResult, setResult] = useState(4);

    const [updateBool, forceUpdate] = useState(false);

    const [force, setForce] = useState(Force.LOW);

    const [animationIndex, setAnimationIndex] = useState(0);
    const [animation, setAnimation] = useState(anim_dice_arr[animationIndex][force]);

    const [animationFrame, setAnimationFrame] = useState(
        animation.data[animationIndex]
    );

    const frame = useAnimation("linear", animation.frame_count * (24 / 1), updateBool);

    useEffect(() => {
        setAnimation(anim_dice_arr[animationIndex][force])
        update();
    }, [animationIndex, force]);

    useEffect(() => {
        setAnimationFrame(animation.data[Math.floor(frame as number * (animation.frame_count - 1))])
    }, [frame, animation]);

    const roll = (force = Force.MED) => {
        var randomInt = animationIndex;
        while (randomInt == animationIndex && anim_dice_arr.length != 1)
            randomInt = getRandomInt(0, anim_dice_arr.length - 1)

        setResult(getRandomInt(1, 6));

        setForce(force)
        setAnimationIndex(randomInt)
        setForce(getRandomInt(Force.LOW, Force.HIGH))
        update();
    }


    const update = () => {
        if (frame == 1.0) forceUpdate(!updateBool)
    }


    //END --- Dice ---

    const size: ISize = useWindowSize()

    const ref = useRef(null);
    const mouse = useMouse(ref, {
        enterDelay: 100,
        leaveDelay: 100,
        fps: 60
    })

    const [dicePos, setDicePos] = useState({ x: 0, y: 0 })
    const [diceDir, setDiceDir] = useState(0)
    const [diceStatus, setDiceStatus] = useState('onMouse');

    const handlers = useSwipeable({
        onSwiping: (eventData) => {
            //console.log("He do be schmooving tho'", { x: eventData.absX, y: eventData.absY })
            //setMousePos({ x: eventData.absX, y: eventData.absY })
            //setDicePos({ x: eventData.absX + size.width! / 2, y: size.height! / 2 - eventData.absY })
        },
        onSwiped: (eventData) => {
            //console.log(eventData)
        },
        onSwipedUp: (eventData) => {
            console.log("User Swiped Up!", eventData)

            if (eventData.deltaX < 200) {
                setDiceDir(-45);
            } else if (eventData.deltaX < 100) {
                setDiceDir(-20);
            } else if (eventData.deltaX > 100) {
                setDiceDir(20);
            } else if (eventData.deltaX > 200) {
                setDiceDir(45);
            } else {
                setDiceDir(0);
            }

            if (eventData.velocity > 5) {
                roll(Force.HIGH)
            } else if (eventData.velocity > 2) {
                roll(Force.HIGH)
            } else {
                roll(Force.LOW)
            }

            setDiceStatus('thrown')
        },
        ...SwipeableConfig,
    });

    useEffect(() => {
        if (mouse.x && mouse.y && diceStatus == 'onMouse')
            setDicePos({ x: mouse.x - size.width! / 2, y: -size.height! / 2 + mouse.y })
    }
        , [mouse])
    useEffect(() => {
        if (mouse.x && mouse.y && diceStatus == 'onMouse')
            setDicePos({ x: mouse.x - size.width! / 2, y: -size.height! / 2 + mouse.y })
    }
        , [size])

    return <>
    <div {...handlers} ref={ref} style={{ position: "relative", top: 0, width: "100%", height: "100%", overflow: "hidden" }}>
        <div style={{
            pointerEvents: "none",
            width: "100px",
            height: "100px",
            marginTop: "100wv",
            marginLeft: "-50px",
            //backgroundColor: "red",
            position: "absolute",
            top: "50%",
            left: "50%",
            transformOrigin: "center",
            animationDuration: "3s",
            transform: `translateX(${dicePos.x}px) translateY(${dicePos.y}px) rotateZ(-90deg)`
        }} >
        </div>
        <div style={{
            transform: 'rotateZ(-90deg) translateX(-150px) translateY(-50px)'
        }}>
            <Dice style={applyAnimation(animationFrame, getAxisChange(animation.result, desiredResult), diceDir)} />
        </div>
       {/*  <p style={{ color: "red" }}>{Math.floor(frame * animation.frame_count)}/{animation.frame_count}</p> */}
       {/*  <div style={{ pointerEvents: "none" }}>
            <span>{mouse.x}, {mouse.y}</span><br />
            <span>{dicePos.x}, {dicePos.y}</span><br />
            <span>Animation Nr: {animationIndex as number}</span><br />
            <span>{diceDir}</span>
        </div>
 */}


    </div>
        <button onClick={() => roll()} style={{
            position: "absolute",
            margin: 0,
            display: "block",
            bottom: "7.2vh",
            background: "#f76939",
            padding: "1vh 40px",
            borderRadius: "4px",
            color: "#fff",
            cursor: "pointer",
            transform: "translateY(-50%)"
        }}><h1>Roll</h1></button>
        </>
}

export default Test
