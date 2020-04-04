/**
 * base interface class for reinforced learning
 * @class ReinforcedLearningBase
 * @memberOf ml
 */
export declare class ReinforcedLearningBase {
    /**
     * base class for reinforced learning
     * @param {Object} [options={}]
     * @prop {Number} options.bounds - number of bounds / bandits
     * @prop {Function} options.getBound - get value of bound
     * @prop {Number} this.bounds - number of bounds / bandits
     * @prop {Array} this.last_selected - list of selections
     * @prop {Number} this.total_reward - total rewards
     * @prop {Number} this.iteration - total number of iterations
     * @returns {this}
     */
    constructor(options?: {});
    /**
     * interface instance method for reinforced learning step
    */
    learn(): void;
    /**
     * interface instance method for reinforced training step
    */
    train(): void;
    /**
     * interface instance method for reinforced prediction step
    */
    predict(): void;
}
/**
 * Implementation of the Upper Confidence Bound algorithm
 * @class UpperConfidenceBound
 * @memberOf ml
 */
export declare class UpperConfidenceBound extends ReinforcedLearningBase {
    /**
     * creates a new instance of the Upper confidence bound(UCB) algorithm. UCB is based on the principle of optimism in the face of uncertainty, which is to choose your actions as if the environment (in this case bandit) is as nice as is plausibly possible
     * @see {@link http://banditalgs.com/2016/09/18/the-upper-confidence-bound-algorithm/}
     * @example
     * const dataset = new ms.ml.UpperConfidenceBound({bounds:10});
     * @param {Object} [options={}]
     * @prop {Map} this.numbers_of_selections - map of all bound selections
     * @prop {Map} this.sums_of_rewards - successful bound selections
     * @returns {this}
     */
    constructor(options?: {});
    /**
     * returns next action based off of the upper confidence bound
     * @return {number} returns bound selection
     */
    predict(): number;
    /**
     * single step trainning method
     * @param {Object} ucbRow - row of bound selections
     * @param {Function} [getBound=this.getBound] - select value of ucbRow by selection value
     * @return {this}
     */
    learn(options?: {}): this;
    /**
     * training method for upper confidence bound calculations
     * @param {Object|Object[]} ucbRow - row of bound selections
     * @param {Function} [getBound=this.getBound] - select value of ucbRow by selection value
     * @return {this}
     */
    train(options: any): this;
}
/**
 * Implementation of the Thompson Sampling algorithm
 * @class ThompsonSampling
 * @memberOf ml
 */
export declare class ThompsonSampling extends ReinforcedLearningBase {
    /**
     * creates a new instance of the Thompson Sampling(TS) algorithm. TS a heuristic for choosing actions that addresses the exploration-exploitation dilemma in the multi-armed bandit problem. It consists in choosing the action that maximizes the expected reward with respect to a randomly drawn belief
     * @see {@link https://en.wikipedia.org/wiki/Thompson_sampling}
     * @example
     * const dataset = new ms.ml.ThompsonSampling({bounds:10});
     * @param {Object} [options={}]
     * @prop {Map} this.numbers_of_rewards_1 - map of all reward 1 selections
     * @prop {Map} this.numbers_of_rewards_0 - map of all reward 0 selections
     * @returns {this}
     */
    constructor(options?: {});
    /**
     * returns next action based off of the thompson sampling
     * @return {number} returns thompson sample
     */
    predict(): number;
    /**
     * single step trainning method
     * @param {Object} tsRow - row of bound selections
     * @param {Function} [getBound=this.getBound] - select value of tsRow by selection value
     * @return {this}
     */
    learn(options?: {}): this;
    /**
     * training method for thompson sampling calculations
     * @param {Object|Object[]} tsRow - row of bound selections
     * @param {Function} [getBound=this.getBound] - select value of tsRow by selection value
     * @return {this}
     */
    train(options: any): this;
}
