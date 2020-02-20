class Book {
    constructor(id, score) {
        this.id = id;
        this.score = score;
    }
}

class Library {
    constructor(signupTime, processingTime, books, fitness, sortedBooks) {
        this.signupTime = signupTime;
        this.processingTime = processingTime;
        this.books = books;
        this.fitness = fitness;
        this.sortedBooks = sortedBooks;
    }

    getFitness() {
        return this.fitness;
    }

    setFitness(fitness) {
        this.fitness = fitness;
    }
}


module.exports = {Book, Library};