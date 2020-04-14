import { bidToAid } from './suanfa1'
import { bidToAid2 } from './suanfa2'
function check(bid: string) {
    return bidToAid(bid) === bidToAid2(bid)
}
console.log(check('BV17x411w7KC'))
console.log(check('BV1Q541167Qg'))
console.log(check('BV1mK4y1C7Bz'))
console.log(check('BV1X5411t7AT'))


