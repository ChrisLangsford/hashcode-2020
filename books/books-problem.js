const fs = require("fs");
const SortedArray = require("collections/sorted-array");
const {Book, Library} = require("./structures.js");

// console.log(`main: ${}`);
main('./in/c.txt', './books/out/c_out.txt')
function main(inputFileName, outputFileName) {
    const LINES = readFile(inputFileName).trim().split("\n");
    const DAYS = LINES[0].split(" ")[2];

    let globalLibrary = [];

    let books = LINES[1].split(" ");
    for (let i = 0; i < books.length; i++) {
        globalLibrary.push(new Book(i, books[i]));
    }

    let l = 2;
    let libId = 0;
    let libraries = [];
    while (l !== LINES.length) {
        let l1 = LINES[l].split(" ");
        let l2 = LINES[l + 1].split(" ");

        let books = l2.map(b => {
            return globalLibrary[b];
        });

        var sortedBooks = SortedArray(books, booksEqual, compareBooks);
        libraries.push(new Library(libId, l1[1], l1[2], books, fitness(l1[1], l1[2], books), sortedBooks));
        l += 2;
        libId++;
    }
    let librariesSorted = new SortedArray(libraries, equals, compare);

    let SIGNUP_ORDER = [];

    let days = DAYS;
    let selectedBooks = {};
    //map of book id to library id
    librariesSorted.array.forEach(lib => {
        days -= lib.signupTime;
        SIGNUP_ORDER.push(lib.id);
        let numBooks = lib.processingTime * days;
        if (numBooks < lib.length) {
            let bookCount = 0;
            lib.sortedBooks.forEach(book => {
                if (bookCount < numBooks) {
                    if (!selectedBooks[book.id]) {
                        selectedBooks[book.id] = lib.id;
                    }
                    bookCount++;
                }
            });
        } else {
            lib.sortedBooks.forEach(book => {
                if (!selectedBooks[book.id]) {
                    selectedBooks[book.id] = lib.id;
                }
            })
        }
    });
    let out = `${SIGNUP_ORDER.length}\n`;
    for (let i = 0; i < SIGNUP_ORDER.length; i++) {
        out += `${SIGNUP_ORDER[i]} ${Object.values(selectedBooks).filter(book => {
            return book === SIGNUP_ORDER[i]
        }).length}\n${Object.entries(selectedBooks).filter(([bookId, libId]) => {
            if (libId === SIGNUP_ORDER[i]) {
                return bookId;
            }
        }).map(x => x[0]).join(" ")}\n`
    }


    writeFile(outputFileName, `${out}`);
    return globalLibrary;
}

function equals(left, right) {
    return left.id === right.id;
}

function compare(left, right) {
    if (left.getFitness() < right.getFitness()) {
        return 1;
    } else {
        return 0;
    }
    return -1;
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

function fitness(sign_up_time, send_rate, books) {
    return sign_up_time / send_rate * books.length * score_books(books);
}

function score_books(books) {
    var score = 0;
    books.forEach(element => {
        score += element.score;
    });
    return score;
}

function booksEqual(left, right) {
    return left.id == right.id;
}

function compareBooks(left, right) {
    if (left.score == right.score) {
        return 0;
    } else {
        if (left.score < right.score) {
            return 1;
        } else {
            return -1;
        }
    }
}

module.exports = {
    main: main,
    test: test
};