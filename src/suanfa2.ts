const table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF';
const tr = {};
for (let i = 0; i < 58; ++i) {
    tr[table[i]] = i;
}

const s = [11, 10, 3, 8, 4, 6];
const xor = 177451812;
const add = 8728348608;

export function bidToAid2(bid: string) {
    let r = 0;
    for (let i = 0; i < 6; ++i) {
        r += tr[bid[s[i]]] * 58 ** i;
    }
    return (r - add) ^ xor
}