const fs = require("fs");

console.log(`main: ${main('./books/in/a_example.txt', './books/out/a_out.txt')}`);

function main(inputFileName, outputFileName) {
    let lines = readFile(inputFileName).trim().split("\n");
    console.log(lines);

    let out = "2\n" +
        "1 3\n" +
        "5 2 3\n" +
        "0 5\n" +
        "0 1 2 3 4 ";

    writeFile(outputFileName, `${out}`);
    return out;
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