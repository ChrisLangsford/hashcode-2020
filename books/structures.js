class Book {
    constructor(id, score) {
        this.id = id;
        this.score = score;
    }
}

class Library {
    constructor(books, signupTime, processingTime) {
        this.books = books;
        this.signupTime = signupTime;
        this.processingTime = processingTime;
    }
}


module.exports = {Book, Library};