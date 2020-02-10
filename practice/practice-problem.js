const fs = require("fs");

console.log(`main: ${main()}`);

function main() {
    readFile('./input-1.txt', (err, lines) => {
        console.log(lines);
    });
}

function readFile(path, callback) {
    try {
        let fileName = require.resolve(path);
        fs.readFile(fileName, 'utf8', callback);
    } catch (e) {
        callback(e)
    }
}

function test() {
    return true;
}

module.exports = {main: main, test: test};