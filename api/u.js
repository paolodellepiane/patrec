exports.getCollinearLines = (space, n) => {
    let collinearLines = permute(space, n).filter(t => arePointsCollinear(t));
    collinearLines = collinearLines.map((l, i, a) => {
        if (!l.done) {
            l.done = true;
            return [l].concat(a.slice(i + 1)
                .filter(l2 => !l2.done && areLinesCollinear(l, l2))
                .map(l2 => { l2.done = true; return l2; }));
        }
    }).filter(a => a);
    return collinearLines
        .map(x => x.reduce((acc, v) => union(acc, v), []))
        .map(x => x.map(p => ({ x: p.x, y: p.y })));
}

slope = (a, b) => (b.y - a.y) / (b.x - a.x);

union = (a, b) => [...new Set([...a, ...b])].sort();

permute = (arr, n) => {
    let res = [];
    __recpermute = (start, head) => {
        if (head.length >= n) {
            res.push(head.map(h => arr[h]));
            return;
        }
        for (let i = start; i < arr.length; i++) {
            __recpermute(i + 1, [...head, i]);
        }
    }
    __recpermute(0, []);
    return res;
}

arePointsCollinear = ps => {
    if (ps.length <= 2) return true;
    const base = slope(ps[0], ps[1]);
    if (!isFinite(base)) return false;
    return ps.slice(2).every(p => {
        let s2 = slope(ps[0], p);
        if (!isFinite(s2)) return false;
        return s2 === base;
    });
};

areLinesCollinear = (a, b) => {
    let count = 0;
    for (let i = 0; i < a.length; i++)
        if (b.includes(a[i]) && ++count === 2) return true;
    return false;
};