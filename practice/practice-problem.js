const fs = require("fs");

console.log(`main: ${main()}`);

function main() {
    let lines = readFile('./a_example.in').trim().split("\n");
    console.log(lines);
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

module.exports = {main: main, test: test};