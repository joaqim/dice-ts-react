interface IStandardDiceDeck {
  totalDice: number;
  dicePairs: IDicePair[];
}

interface IWeightedDiceDeck {
  totalDice: number;
  dicePairs: IDicePair[];
  probabilityWeighting: number;
  recentlyRolledCount: number;
}

export interface IDicePair {
  dice1: number;
  dice2: number;
}

export abstract class DiceController {
  abstract throwDice(): IDicePair;
}

export interface IWeightedDiceDeckController {
  minimumCardsBeforeReshuffling: number;
  probabilityReductionForRecentlyRolled: number;
  maximumRecentRollMemory: number;
}



export class WeightedDiceDeckController extends DiceController implements IWeightedDiceDeckController {
  //private readonly minimumCardsBeforeReshuffling: number;
  //private readonly probabilityReductionForRecentlyRolled: number;
  public minimumCardsBeforeReshuffling: number;
  public probabilityReductionForRecentlyRolled: number;

  private weightedDiceDeck: IWeightedDiceDeck[] = [];
  private cardsLeftInDeck: number = -1;
  private recentRolls: number[];
  public maximumRecentRollMemory: number;

  constructor() {
    super();
    this.initWeightedDiceDeck();
    this.reshuffleWeightedDiceDeck();
    this.updateWeightedDiceDeckProbabilities();

    this.minimumCardsBeforeReshuffling = 13;
    this.probabilityReductionForRecentlyRolled = 0.3;

    this.recentRolls = [];
    this.maximumRecentRollMemory = 5;
  }

  throwDice(): IDicePair {
    return this.drawWeightedCard();
  }

  private drawWeightedCard(): IDicePair {
    if (this.cardsLeftInDeck < this.minimumCardsBeforeReshuffling)
      this.reshuffleWeightedDiceDeck();
    this.updateWeightedDiceDeckProbabilities();
    this.adjustWeightedDiceDeckBasedOnRecentRolls();
    return this.getWeightedDice();
  }

  private initWeightedDiceDeck() {
    this.weightedDiceDeck.push({
      totalDice: 2,
      dicePairs: [],
      probabilityWeighting: 0,
      recentlyRolledCount: 0,
    });
    this.weightedDiceDeck.push({
      totalDice: 3,
      dicePairs: [],
      probabilityWeighting: 0,
      recentlyRolledCount: 0,
    });
    this.weightedDiceDeck.push({
      totalDice: 4,
      dicePairs: [],
      probabilityWeighting: 0,
      recentlyRolledCount: 0,
    });
    this.weightedDiceDeck.push({
      totalDice: 5,
      dicePairs: [],
      probabilityWeighting: 0,
      recentlyRolledCount: 0,
    });
    this.weightedDiceDeck.push({
      totalDice: 6,
      dicePairs: [],
      probabilityWeighting: 0,
      recentlyRolledCount: 0,
    });
    this.weightedDiceDeck.push({
      totalDice: 7,
      dicePairs: [],
      probabilityWeighting: 0,
      recentlyRolledCount: 0,
    });
    this.weightedDiceDeck.push({
      totalDice: 8,
      dicePairs: [],
      probabilityWeighting: 0,
      recentlyRolledCount: 0,
    });
    this.weightedDiceDeck.push({
      totalDice: 9,
      dicePairs: [],
      probabilityWeighting: 0,
      recentlyRolledCount: 0,
    });
    this.weightedDiceDeck.push({
      totalDice: 10,
      dicePairs: [],
      probabilityWeighting: 0,
      recentlyRolledCount: 0,
    });
    this.weightedDiceDeck.push({
      totalDice: 11,
      dicePairs: [],
      probabilityWeighting: 0,
      recentlyRolledCount: 0,
    });
    this.weightedDiceDeck.push({
      totalDice: 12,
      dicePairs: [],
      probabilityWeighting: 0,
      recentlyRolledCount: 0,
    });
  }

  reshuffleWeightedDiceDeck() {
    const standardDiceDeck = this.getStandardDiceDeck();

   standardDiceDeck.forEach((dicePairsForTotalDice: IStandardDiceDeck, totalDiceIndex) => {
      this.weightedDiceDeck[totalDiceIndex].dicePairs =
        dicePairsForTotalDice.dicePairs;
    })

    const totalCombinations = 36;
    this.cardsLeftInDeck = totalCombinations;
  }

  private updateWeightedDiceDeckProbabilities() {
    for (const diceDeckForTotalDice of this.weightedDiceDeck) {
      diceDeckForTotalDice.probabilityWeighting =
        diceDeckForTotalDice.dicePairs.length / this.cardsLeftInDeck;
    }
  }

  private getWeightedDice(): IDicePair {
    const totalProbabilityWeight = this.getTotalProbabilityWeight();

    let targetRandomNumber = Math.random() * totalProbabilityWeight;
    for (const diceDeckForTotalDice of this.weightedDiceDeck) {
      if (targetRandomNumber <= diceDeckForTotalDice.probabilityWeighting) {
        const drawnCard = randomElementFromArray(
          diceDeckForTotalDice.dicePairs
        );
        removeElementFromArray(diceDeckForTotalDice.dicePairs, drawnCard);

        this.recentRolls.push(diceDeckForTotalDice.totalDice);
        diceDeckForTotalDice.recentlyRolledCount++;
        this.cardsLeftInDeck--;

        if (this.recentRolls.length > this.maximumRecentRollMemory)
          this.updateRecentlyRolled();
        return drawnCard;
      }
      targetRandomNumber -= diceDeckForTotalDice.probabilityWeighting;
    }

    //JL4('Something seriously wrong with weighted dice deck')
    const defaultRollIfError = { dice1: 3, dice2: 4 };
    return defaultRollIfError;
  }

  private getTotalProbabilityWeight(): number {
    let totalProbabilityWeight = 0;
    for (const dicePairs of this.weightedDiceDeck) {
      totalProbabilityWeight += dicePairs.probabilityWeighting;
    }

    return totalProbabilityWeight;
  }

  private updateRecentlyRolled() {
    const ignore0and1 = 2;
    const totalDiceFiveRollsAgo = this.recentRolls[0];
    this.weightedDiceDeck[totalDiceFiveRollsAgo - ignore0and1]
      .recentlyRolledCount--;
    this.recentRolls.shift();
  }

  private adjustWeightedDiceDeckBasedOnRecentRolls() {
    for (const diceDeckForTotalDice of this.weightedDiceDeck) {
      const probabilityReduction =
        diceDeckForTotalDice.recentlyRolledCount *
        this.probabilityReductionForRecentlyRolled;
      const probabilityMultiplier = 1 - probabilityReduction;
      diceDeckForTotalDice.probabilityWeighting *= probabilityMultiplier;
      if (diceDeckForTotalDice.probabilityWeighting < 0)
        diceDeckForTotalDice.probabilityWeighting = 0;
    }
  }

  private getStandardDiceDeck(): IStandardDiceDeck[] {
    const standardDiceDeck: IStandardDiceDeck[] = [];
    standardDiceDeck.push({
      totalDice: 2,
      dicePairs: [{ dice1: 1, dice2: 1 }],
    });
    standardDiceDeck.push({
      totalDice: 3,
      dicePairs: [
        { dice1: 1, dice2: 2 },
        { dice1: 2, dice2: 1 },
      ],
    });
    standardDiceDeck.push({
      totalDice: 4,
      dicePairs: [
        { dice1: 1, dice2: 3 },
        { dice1: 2, dice2: 2 },
        { dice1: 3, dice2: 1 },
      ],
    });
    standardDiceDeck.push({
      totalDice: 5,
      dicePairs: [
        { dice1: 1, dice2: 4 },
        { dice1: 2, dice2: 3 },
        { dice1: 3, dice2: 2 },
        { dice1: 4, dice2: 1 },
      ],
    });
    standardDiceDeck.push({
      totalDice: 6,
      dicePairs: [
        { dice1: 1, dice2: 5 },
        { dice1: 2, dice2: 4 },
        { dice1: 3, dice2: 3 },
        { dice1: 4, dice2: 2 },
        { dice1: 5, dice2: 1 },
      ],
    });
    standardDiceDeck.push({
      totalDice: 7,
      dicePairs: [
        { dice1: 1, dice2: 6 },
        { dice1: 2, dice2: 5 },
        { dice1: 3, dice2: 4 },
        { dice1: 4, dice2: 3 },
        { dice1: 5, dice2: 2 },
        { dice1: 6, dice2: 1 },
      ],
    });
    standardDiceDeck.push({
      totalDice: 8,
      dicePairs: [
        { dice1: 2, dice2: 6 },
        { dice1: 3, dice2: 5 },
        { dice1: 4, dice2: 4 },
        { dice1: 5, dice2: 3 },
        { dice1: 6, dice2: 2 },
      ],
    });
    standardDiceDeck.push({
      totalDice: 9,
      dicePairs: [
        { dice1: 3, dice2: 6 },
        { dice1: 4, dice2: 5 },
        { dice1: 5, dice2: 4 },
        { dice1: 6, dice2: 3 },
      ],
    });
    standardDiceDeck.push({
      totalDice: 10,
      dicePairs: [
        { dice1: 4, dice2: 6 },
        { dice1: 5, dice2: 5 },
        { dice1: 6, dice2: 4 },
      ],
    });
    standardDiceDeck.push({
      totalDice: 11,
      dicePairs: [
        { dice1: 5, dice2: 6 },
        { dice1: 6, dice2: 5 },
      ],
    });
    standardDiceDeck.push({
      totalDice: 12,
      dicePairs: [{ dice1: 6, dice2: 6 }],
    });

    return standardDiceDeck;
  }
}

export function randomElementFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function removeElementFromArray<T>(array: T[], element: T): boolean {
  const index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
    return true;
  }
  return false;
}
