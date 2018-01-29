let Victor = require('victor');

union = (a, b) => [...new Set([...a, ...b])].sort();

sumMagnitudes = points => points.map(p => Victor.fromObject(p))
    .reduce((acc, v, i, a) => i > 0 ? acc + a[i].distance(a[i - 1]) : 0, 0);

arePointsCollinear = ([a, b, c]) =>
    sumMagnitudes([a, c]) === sumMagnitudes([a, b, c]) ||
    sumMagnitudes([a, b]) === sumMagnitudes([a, c, b]) ||
    sumMagnitudes([b, c]) === sumMagnitudes([b, a, c]);

areLinesCollinear = (a, b) => {
    let count = 0;
    for (let i = 0; i < a.length; i++) {
        if (b.includes(a[i]) && ++count === 2) return true;
    }
    return false;
};

getPermutations = arr => {
    perms = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            for (let y = j + 1; y < arr.length; y++) {
                perms.push([i, j, y]);
            }
        }
    }
    return perms;
};

exports.getCollinearLines = (space, n) => {
    let lines = getPermutations(space).filter(t => arePointsCollinear([space[t[0]], space[t[1]], space[t[2]]]));
    let collinearLines = lines.map((l, i, a) => {
        if (!l.done) {
            l.done = true;
            return [l].concat(a.slice(i + 1)
                .filter(l2 => !l2.done && areLinesCollinear(l, l2))
                .map(l2 => { l2.done = true; return l2; }));
        }
    }).filter(a => a);
    return collinearLines
        .map(x => x.reduce((acc, v) => union(acc, v), []))
        .filter(x => x.length >= n);
};

exports.test = () => {
    let space = [
        { x: 0, y: 0 },
        { x: 4, y: 2 },
        { x: 8, y: 4 },
        { x: 5, y: 5 },
        { x: 6, y: 8 },
        { x: 12, y: 6 }
    ];

    console.log(JSON.stringify(exports.getCollinearLines(space, 3)));
};