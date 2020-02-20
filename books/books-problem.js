const fs = require("fs");
const SortedMap = require("collections/sorted-map");
const {Book, Library} = require("./structures.js");

console.log(`main: ${main('./in/a.txt', './out/a_out.txt')}`);

function main(inputFileName, outputFileName) {
    const LINES = readFile(inputFileName).trim().split("\n");
    const DAYS = LINES[0].split(" ")[2];

    let globalLibrary = [];

    let books = LINES[1].split(" ");
    for (let i = 0; i < books.length; i++) {
        globalLibrary.push(new Book(i, books[i]));
    }

    let l = 2;
    let libIds = 0;
    let libraries = [];
    while (l !== LINES.length) {
        let l1 = LINES[l].split(" ");
        let l2 = LINES[l+1].split(" ");
        libraries.push(new Library(l1[1], l1[2], l2));
        l += 2;
        libIds++;
    }
    // let librariesSorted = new SortedMap(libraries, equals, compare);

    writeFile(outputFileName, `${JSON.stringify(globalLibrary)}`);
    return globalLibrary;
}

// function equals(left, right) {
//     return left.id == right.id;
// }
//
// function compare(left, right) {
//     if (left.getFitness() > right.getFitness()) {
//         return 1;
//     } else {
//         return 0;
//     }
//     return -1;
// }

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

function fitness(sign_up_time, send_rate, books) {
    return sign_up_time / send_rate * length(books) * score_books(books);
}

function score_books(books) {
    var score = 0;
    books.array.forEach(element => {
        score += element;
    });
}

module.exports = {
    main: main,
    test: test
};