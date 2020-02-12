const fs = require("fs");

console.log(`main: ${main()}`);

function main() {
    let lines = readFile('./a_example.in').trim().split("\n");
    console.log(lines);
}

function run(W, wt, val, n) {
//from research, this will solve in 2^n time - less performant

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

function run2(W, wt, val, n) {
    //from research: this should solve it in O(wn) time which is much faster than run1
    let i, w;
    let K = [];

    //shwifty way of initializing map - probably better to do this with an actual Map object but YOLO
    for (let j = 0; j <= n; j++) {
        K.push([]);
        for (let k = 0; k <= W; k++) {
            k[j] = [];
        }
    }

    for (i = 0; i <= n; i++) {
        for (w = 0; w <= W; w++) {
            if (i === 0 || w === 0) {
                K[i][w] = [];
            } else if (wt[i - 1] <= w) {
                K[i][w] = Math.max(val[i - 1] + K[i - 1][w - wt[i - 1]], K[i - 1][w]);
            } else {
                K[i][w] = K[i - 1][w];
            }
        }
    }
    return K[n][W];
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

module.exports = {main: main, test: test, run: run, run2: run2};