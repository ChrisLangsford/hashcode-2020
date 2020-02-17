const fs = require("fs");
const Graph = require("./graph");

console.log(`main: ${main('./a_example.in', './a_out.in').score}`);

function main(inputFileName, outputFileName) {
    let lines = readFile(inputFileName).trim().split("\n");
    console.log(lines);
    let W = parseInt(lines[0].split(' ')[0]);
    let wt = lines[1].split(' ').map(x => parseInt(x));
    let out = knapsackFaster(W, wt, wt, wt.length);
    //TODO: finish this up to write the output file in the correct format
    writeFile(outputFileName, `${out}\n`);
    return out;
}

function knapsackSlower(W, wt, val, n) {
//from research, this will solve in 2^n time - less performant

    //If there are no items left to use or the required weight is 0 return 0
    if (n === 0 || W === 0) {
        return 0;
    }
    //If the weight of the last item is less than required weight, include it
    if (wt[n - 1] > W) {
        return knapsackSlower(W, wt, val, n - 1);
    } else {
        //take the maximum between selecting the nth item and not selecting the nth item (i.e. supply different start weights)
        return Math.max(
            val[n - 1] + knapsackSlower(W - wt[n - 1], wt, val, n - 1),
            knapsackSlower(W, wt, val, n - 1)
        );
    }
}

function knapsackFaster(W, wt, val, n) {
    //from research: this should solve it in O(wn) time which is much faster for larger input data sets
    let i, w;
    let K = [];
    //TODO: finish this implementation to return which pizzas are included in the solution
    let out = {score: 0, pizzas: []};

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
    out.score = K[n][W];
    return out
}

function usingGraph(W, wt) {
    let graph = new Graph();
    wt = wt.sort((a, b) => {
        return a - b
    });
    wt.forEach(weight => {
        graph.addNode(weight);
        graph.interconnectAllNodes();
    });

    //rough pseudocode - Shiv feel free to pick this up if you're keen
    //1. create 2d paths array for each pizza type
    //2. while solution not found
    //3. add another entry to paths
    //3.1 any path === W return as solution
    //3.2 if paths.length > 1 && any path size > W cull that path
    // 3.3 if paths length === 1 & path size > W remove last element and return
    console.log(JSON.stringify(graph));
    return null;
}

function readFile(path) {
    try {
        let fileName = require.resolve(path);
        return fs.readFileSync(fileName, 'utf8');
    } catch (e) {
        console.error(e);
    }
}

function writeFile(path, contents) {
    fs.writeFile(path, contents, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('File saved ' + path);
    });
}

function test() {
    return true;
}

module.exports = {
    main: main,
    test: test,
    knapsackSlower: knapsackSlower,
    knapsackFaster: knapsackFaster,
    usingGraph: usingGraph
};