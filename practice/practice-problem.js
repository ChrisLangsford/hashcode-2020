const fs = require("fs");

console.log(`main: ${main()}`);

function main() {
    let lines = readFile('./a_example.in').trim().split("\n");
    console.log(lines);
}

function run(W, wt, val, n) {

    //If there are no items left to use or the required weight is 0 return 0
    if (n === 0 || W === 0) {
        return 0;
    }
    //If the weight of the last item is less than required weight, include it
    if (wt[n - 1] > W) {
        return run(W, wt, val, n - 1);
    } else {
        //take the maximum between selecting the nth item and not selecting the nth item (i.e. supply different start weights)
        return Math.max(
            val[n - 1] + run(W - wt[n - 1], wt, val, n - 1),
            run(W, wt, val, n - 1)
        );
    }
}

function readFile(path) {
    try {
        let fileName = require.resolve(path);
        return fs.readFileSync(fileName, 'utf8');
    } catch (e) {
        console.error(e);
    }
}

function test() {
    return true;
}

module.exports = {main: main, test: test, run: run};