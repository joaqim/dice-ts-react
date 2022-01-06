

/**
 * Gets random int
 * @param {number} min
 * @param {number} max
 * @returns random int - min & max inclusive
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

