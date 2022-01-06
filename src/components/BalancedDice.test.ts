import ShapiroWilkW from "../utilities/shapiro-wilk";
import { IDicePair, WeightedDiceDeckController as DeckController } from "./BalancedDice"
//import * as ShapiroWilkW from '../utilities/shapiro-wilk.js'

interface ShapiroWilkResult {
    wValue: number;
    pValue: number;
}

type ShapiroWilkResultType = ShapiroWilkResult | undefined
type ShapiroWilkResultArray = Array<ShapiroWilkResultType>

const generateDiceResultArray = (deck: DeckController, size: number): Array<number> => {
    let array = new Array<number>(size);
    for (let i = 0; i < size; i++) {
        const dice = deck.throwDice();
        array[i] = dice.dice1 + dice.dice2;
    }
    return array;
}

const generateShapiroWilkResultArray = (deck: DeckController, samples = 100, times = 1): ShapiroWilkResultArray => {
    var results = new Array<ShapiroWilkResultType>(times)
    for (let n = 0; n < times; n++) {
        const diceNumberArray = generateDiceResultArray(deck, samples);
        results[n] = ShapiroWilkW(diceNumberArray)
    }
    return results
}

const getAverage = (dataArray: ShapiroWilkResultArray): ShapiroWilkResult => {
    let wValueSum = 0.0;
    let pValueSum = 0.0;
    let dataCount = 0;
    dataArray.forEach((data) => {
        if (data) {
            dataCount += 1
            wValueSum += data.wValue
            pValueSum += data.pValue
        }
    })

    return {
        wValue: wValueSum / dataCount,
        pValue: pValueSum / dataCount,
    }
}

const testDistribution = (deck: DeckController, samples = 100, times = 1): ShapiroWilkResult => {
    var resultsArray = generateShapiroWilkResultArray(deck, samples, times);
    return getAverage(resultsArray)
}

// @ponicode
describe("BalancedDice.WeightedDiceDeckController", () => {
    let deck: DeckController;

    beforeEach(() => {
        deck = new DeckController()
        deck.minimumCardsBeforeReshuffling = 13;            // Default: 13
        deck.probabilityReductionForRecentlyRolled = 0.3;   // Default: 0.3
        deck.maximumRecentRollMemory = 5;                   // Default: 5
    })

    test("Throw Dice", () => {
        let d = deck.throwDice();
        expect(d.dice1).toBeGreaterThanOrEqual(1)
        expect(d.dice2).toBeLessThanOrEqual(12)
    })

    test("Test for Normal Distribution - n=1000", () => {
        const result = testDistribution(deck, 1000, 2)
        // https://japi.org/r2a4a4a4/normal-distribution-p-value-and-confidence-intervals
        // https://emilkirkegaard.dk/en/2014/11/w-values-from-the-shapiro-wilk-test-visualized-with-different-datasets/
        // Normal distributions have:
        // P-value > 0.05
        // W-value close to  99.9%

        expect(result?.pValue).toBeGreaterThan(0.05)
        expect(/* TODO: Make better comparison. could stick with > 94 */
            Math.floor(result?.wValue * 100.0))
            .toBeCloseTo(97)

    })

    test("Test for Normal Distribution - n=100", () => {
        const result = testDistribution(deck, 100, 100)

        // We expect our Weighted Dice to have a significant W-value,
        // even with 100 samples + test 100 times
        expect(result?.pValue).toBeGreaterThan(0.05)
        expect(result?.wValue).toBeGreaterThan(0.965)

    })

    test("Test for Normal Distribution - n=50", () => {
        const result = testDistribution(deck, 50, 100)
        // P-Value tapers off when n<100
        expect(result?.pValue).toBeGreaterThan(0.05)
        expect(result?.wValue).toBeGreaterThan(0.93)
    })

    test("Test for Normal Distribution - n=5 (Low P-value expected)", () => {
        const result = testDistribution(deck, 5, 100)
        expect(result?.pValue).toBeLessThan(.65)
    })

    test("Test for Norm Dist with less time between shuffling the deck - n=1000", () => {
        deck.minimumCardsBeforeReshuffling = 7;
        const result = testDistribution(deck, 1000, 2)
        // https://japi.org/r2a4a4a4/normal-distribution-p-value-and-confidence-intervals
        // https://emilkirkegaard.dk/en/2014/11/w-values-from-the-shapiro-wilk-test-visualized-with-different-datasets/
        // Normal distributions have:
        // P-value > 0.05
        // W-value close to  99.9%

        expect(result?.pValue).toBeGreaterThan(0.05)
        expect(/* TODO: Make better comparison. could stick with > 94 */
            Math.floor(result?.wValue * 100.0))
            .toBeCloseTo(97)

        console.log(result)
    })
})