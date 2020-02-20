const fs = require("fs");
const {Book, Library} = require("./structures.js");

console.log(`main: ${main('./in/a.txt', './out/a_out.txt')}`);

function main(inputFileName, outputFileName) {
    let lines = readFile(inputFileName).trim().split("\n");

    let globalLibrary = [];

    let books = lines[1].split(" ");
    for (let i = 0; i < books.length; i++) {
        globalLibrary.push(new Book(i, books[i]));
    }

     writeFile(outputFileName, `${JSON.stringify(globalLibrary)}`);
    return globalLibrary;
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
    test: test
};