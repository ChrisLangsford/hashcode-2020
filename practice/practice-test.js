let assert = require('assert');
let practiceProblem = require('./practice-problem.js');

describe('Test', () => {
    describe('test 1', () => {
        it('should pass', () => {
            assert.equal(true, practiceProblem.test());
        });
    });
    describe('basic logic test', () => {
        it('should output 16', () => {
            assert.equal(16, practiceProblem.knapsackSlower(17, [2, 5, 6, 8], [2, 5, 6, 8], 4));
        });
        it('should output 16', () => {
            assert.equal(16, practiceProblem.knapsackFaster(17, [2, 5, 6, 8], [2, 5, 6, 8], 4).score);
        });
    });
});
