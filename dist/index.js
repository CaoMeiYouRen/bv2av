"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const suanfa1_1 = require("./suanfa1");
const suanfa2_1 = require("./suanfa2");
function check(bid) {
    return suanfa1_1.bidToAid(bid) === suanfa2_1.bidToAid2(bid);
}
console.log(check('BV17x411w7KC'));
console.log(check('BV1Q541167Qg'));
console.log(check('BV1mK4y1C7Bz'));
console.log(check('BV1X5411t7AT'));
