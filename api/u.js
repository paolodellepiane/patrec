permute = arr => {
    res = [];
    for (let i = 0; i < arr.length; i++)
        for (let j = i + 1; j < arr.length; j++)
            res.push([arr[i], arr[j]]);
    return res;
}

origin = (a, b) => (b.x * a.y - a.x * b.y) / (b.x - a.x);

slope = (a, b) => (b.y - a.y) / (b.x - a.x);

areEquals = (a, b) => a.x === b.x && a.y === b.y;

simpleHash = (a, b) => {
    if (b.x === a.x) return a.x;
    return `${slope(a, b)},${origin(a, b)}`;
}

union = (a, b) => [...new Set([...a, ...b])].sort();

withPoints = (lines, ps) => {
    const a = ps[0], b = ps[1];
    if (areEquals(a, b)) return;
    let hash = simpleHash(a, b);
    if (!lines.has(hash))
        lines.set(hash, new Set());
    lines.get(hash)
        .add(a)
        .add(b);
    return lines;
}

calculateLines = space =>
    [...permute(space)
        .reduce(withPoints, new Map())
        .values()];

exports.getCollinearLines = space => n =>
    calculateLines(space)
        .filter(l => l.size >= n)
        .map(s => [...s.values()].map(p => ({ x: p.x, y: p.y })));

