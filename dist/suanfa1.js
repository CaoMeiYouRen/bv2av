"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'.split('');
const tr = {};
for (let i = 0; i < table.length; i++) {
    tr[table[i]] = i;
}
const s = [11, 10, 3, 8, 4, 6, 2, 9, 5, 7];
const xor = 177451812n;
const add = 100618342136696320n;
function bidToAid(x) {
    let r = 0n;
    for (let i = 0; i < 10; i++) {
        r += BigInt(tr[x[s[i]]]) * 58n ** BigInt(i);
    }
    return Number((r - add) ^ xor);
}
exports.bidToAid = bidToAid;
function enc(x) {
    if (typeof x === 'number') {
        x = BigInt(x);
    }
    x = (x ^ xor) + add;
    const r = 'BV          '.split('');
    for (let i = 0; i < 10; i++) {
        r[s[i]] = table[Number(x / 58n ** BigInt(i) % 58n)];
    }
    return r.join('');
}
exports.enc = enc;
function getBv(str) {
    const res = str.match(/(BV([A-Za-z0-9]){10,})/);
    return res ? res[1] : '';
}
