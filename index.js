import {jsqubits} from 'jsqubits'

const deutsch = (f) => {
    return jsqubits('|01>')
        .hadamard(jsqubits.ALL)
        .applyFunction(1, 0, f)
        .hadamard(jsqubits.ALL).measure(1).result;
};

let f1 = (x) => {return 1;};
let f2 = (x) => {return 0;};
let f3 = (x) => {return x;};
let f4 = (x) => {return (x + 1) % 2;};

console.log('v1', deutsch(f1))
console.log('v2', deutsch(f2))
console.log('v3', deutsch(f3))
console.log('v4', deutsch(f4))
