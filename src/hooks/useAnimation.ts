import React, { useState, useEffect } from "react";

function hasKey<O extends object, K extends PropertyKey>(
  obj: O,
  key: K,
): obj is O & Record<K, any> {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

const useAnimation = (easing: keyof Easing = "default", duration = 500, updateBool = true, delay = 0): number => {
  // The useAnimationTimer hook calls useState every animation frame ...
  // ... giving us elapsed time and causing a rerender as frequently ...
  // ... as possible for a smooth animation.
  const elapsed = useAnimationTimer(duration, delay, updateBool);
  // Amount of specified duration elapsed on a scale from 0 - 1
  const n = Math.min(1, elapsed / duration);
  // Return altered value based on our specified easing function
  return useEasing(n, easing);
}

interface Easing {
  linear: "linear",
  elastic: "elastic",
  inExpo: "inExpo",
  default: "linear",
}


const useEasing = (n:number, easing: keyof Easing):number  => {
  // Some easing functions copied from:
  // https://github.com/streamich/ts-easing/blob/master/src/index.ts
  const easingFns = {
    linear: (n:number) => n,
    elastic: (n:number) =>
      n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
    inExpo: (n:number) => Math.pow(2, 10 * (n - 1)),
  }

  if(!hasKey(easingFns, easing))
    throw "Invalid easing: " + easing
  return easingFns[easing](n)
}

function useAnimationTimer(duration = 1000, delay = 0, updateBool = true) {
  const [elapsed, setTime] = useState(0);

  useEffect(
    () => {
      let animationFrame: number, timerStop: NodeJS.Timeout, start:number;

      // Function to be executed on each animation frame
      function onFrame() {
        setTime(Date.now() - start);
        loop();
      }

      // Call onFrame() on next animation frame
      function loop() {
        animationFrame = requestAnimationFrame(onFrame);

      }

      function onStart() {
        // Set a timeout to stop things when duration time elapses
        timerStop = setTimeout(() => {
          cancelAnimationFrame(animationFrame);
          setTime(Date.now() - start);
        }, duration);

        // Start the loop
        start = Date.now();
        loop();
      }

      // Start after specified delay (defaults to 0)
      const timerDelay = setTimeout(onStart, delay);

      // Clean things up
      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        cancelAnimationFrame(animationFrame);
      };
    },
    [duration, delay, updateBool] // Only re-run effect if duration or delay changes
  );

  return elapsed;
}

export default useAnimation;