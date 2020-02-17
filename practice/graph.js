module.exports = Graph = function () {
    this.storage = {};
    this.size = 0;
};

Graph.prototype.addNode = function (value) {
    this.storage[value] = {};
    this.size++;
};

Graph.prototype.addEdge = function (from, to) {
    this.storage[from][to] = true;
    this.storage[to][from] = true;
};

Graph.prototype.removeEdge = function (from, to) {
    delete this.storage[from][to];
    delete this.storage[to][from];
};

Graph.prototype.contains = function (target) {
    return this.storage.hasOwnProperty(target);
};

Graph.prototype.hasEdge = function (from, to) {
    return this.storage[from].hasOwnProperty(to);
};

Graph.prototype.removeNode = function (value) {
    delete this.storage[value];
    this.size--;
    Object.keys(this.storage).forEach(key => {
        if (this.storage[key][value]) {
            delete this.storage[key][value];
        }
    });
};

Graph.prototype.interconnectAllNodes = function () {
    Object.keys(this.storage).forEach(fromKey => {
        Object.keys(this.storage).forEach(toKey => {
            if (fromKey !== toKey) {
                this.addEdge(fromKey, toKey);
            }
        });
    });
};
//Credit Seth Koch ~ Youtube for this implementation of a graph:)
