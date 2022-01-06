import { CSSProperties } from "react";

const applyAnimation = (a: number[][], axis = { x: 0, y: 0, z: 0 }, rotationDegrees: number = 0, scale = 1.00): CSSProperties => {
  if (a == undefined || a.length != 6 || a[0].length != 4)
    throw 'applyAnimation: Animation is expected to be a 4x4 Matrix + 3 Euler Vector(XYZ)'
  if (scale <= 0 || scale >= 2.0)
    throw "Scale is invalid: must be 0 < scale < 2";
  scale = 2.0 - scale;
  const locScale = 4 * scale;
  const depthScale = 1.4;

  // Rotation Matrix
  let rm: number[][] = [[]];
  switch (rotationDegrees) {
    case (-45):
      rm = [
        [0.7, 0.7, 0, 0],
        [-0.7, 0.7, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ]
    case (-20):
      rm = [
        [0.9, 0.3, 0, 0],
        [-0.3, 0.9, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ]
    case (20):
      rm = [
        [0.9, -0.3, 0, 0],
        [0.3, 0.9, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ]
    case (45):
      rm = [
        [0.7, -0.7, 0, 0],
        [0.7, 0.7, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ]
    default:
      rm = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ]
  }

  return {
    transformOrigin: "center",
    WebkitTransform: `
    /*
          matrix3d(0, -1, 0, 0,
                   1, 0, 0, 0,
                   0, 0, 1, 0,
                   0, 0, 0, 1) 
                   */

                   /*
          matrix3d(0.7, -0.7, 0, 0,
                   0.7, 0.7, 0, 0,
                   0, 0, 1, 0,
                   0, 0, 0, 1) 
                   */

                   /*
          matrix3d(
            ${rm[0][0]},${rm[0][1]},${rm[0][2]},${rm[0][3]},
            ${rm[1][0]},${rm[1][1]},${rm[1][2]},${rm[1][3]},
            ${rm[2][0]},${rm[2][1]},${rm[2][2]},${rm[2][3]},
            ${rm[3][0]},${rm[3][1]},${rm[3][2]},${rm[3][3]}
          )
          */


          /*scale3d(${scale},${scale},${scale})*/

          translate3d(
            ${a[4][0] * locScale}vw,
            ${a[4][1] * locScale}vw,
            ${a[4][2] * locScale * depthScale}vw
          )


          
          /*
          rotateX(${a[5][0]}deg)
          rotateY(${a[5][1]}deg)
          rotateZ(${a[5][2]}deg)
          */


          matrix3d(
            ${a[0][0]},${a[0][1]},${a[0][2]},${a[0][3]},
            ${a[1][0]},${a[1][1]},${a[1][2]},${a[1][3]},
            ${a[2][0]},${a[2][1]},${a[2][2]},${a[2][3]},
            ${a[3][0]},${a[3][1]},${a[3][2]},${a[3][3] * scale}
          )
  
          rotateX(${90 * axis.x}deg)
          rotateY(${90 * axis.y}deg)
          rotateZ(${90 * axis.z}deg)
          `,
  };
}


export default applyAnimation
