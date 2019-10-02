"use strict";

/*function eval() {
    return;
}*/

function expressionCalculator(expr) {
    let expression = expr.replace(/ /gm, '');

    // check brackets
    if (!checkBrackets(expression)) {
        throw "ExpressionError: Brackets must be paired";
    }

    // slice string to array 
    let expressionArray = expression.match(/[^\d()]+|[()]|[\d.]+/g) || [];

    // main cycle
    for (let index = 0; index < expressionArray.length; index += 1) {
        let chunkStart;
        let chunkEnd;
        let chunk;
        if (expressionArray[index] === ')' || index === expressionArray.length - 1) {
            chunkEnd = index;
            chunkStart = index;
            while (chunkStart !== 0) {
                if (expressionArray[chunkStart] === '(') {
                    break;
                }
                chunkStart -= 1;
            }

            chunk = expressionArray.splice(chunkStart, chunkEnd - chunkStart + 1, ' ');
            index = 0;
            if (chunk[0] === '(' && chunk[chunk.length - 1] === ')') {
                chunk = chunk.slice(1, -1);
            }
            expressionArray[chunkStart] = calculate(chunk);
        }
    }

    return expressionArray[0];
}

function calculate(array) {
    let chunk = array;

    // check multiply or devide
    while (chunk.includes('/') || chunk.includes('*')) {
        for (let index = 0; index < chunk.length; index += 1) {

            switch (chunk[index]) {
                case '*':
                    let multipliers = chunk.splice((index - 1), 3, '');
                    chunk[index - 1] = mul(multipliers);
                    index = 0;
                    break;
                case '/':
                    let deviders = chunk.splice((index - 1), 3, '');
                    chunk[index - 1] = dev(deviders);
                    index = 0;
                    break;
                default:
                    break;
            }
        }
    }

    // check summ or subtraction
    while (chunk.includes('+') || chunk.includes('-')) {
        for (let index = 0; index < chunk.length; index += 1) {
            switch (chunk[index]) {
                case '+':
                    let terms = chunk.splice(index - 1, 3, '');
                    chunk[index - 1] = sum(terms);
                    index = 0;
                    break;
                case '-':
                    let subtraction = chunk.splice(index - 1, 3, '');
                    chunk[index - 1] = min(subtraction);
                    index = 0;
                    break;
                default:
                    break;
            }
        }
    }

    return chunk[0];
}

function sum(array) {
    if (array.length === 1) {
        return array[0];
    }
    const sumArray = array;
    const numbersArray = sumArray.map(item => +item);
    const answer = numbersArray[0] + numbersArray[2];
    return answer;
}

function min(array) {
    if (array.length === 1) {
        return array[0];
    }
    const minArray = array;
    const numbersArray = minArray.map(item => +item);
    const answer = numbersArray[0] - numbersArray[2];
    return answer;
}

function mul(array) {
    if (array.length === 1) {
        return array[0];
    }
    const mulArray = array;
    const numbersArray = mulArray.map(item => +item);
    const answer = numbersArray[0] * numbersArray[2];
    return answer;
}

function dev(array) {
    if (array.length === 1) {
        return array[0];
    }
    const devArray = array;
    const numbersArray = devArray.map(item => +item);
    const answer = numbersArray[0] / numbersArray[2];
    const finite = isFinite(answer);
    if (!finite) {
        throw "TypeError: Devision by zero.";
    }
    return answer;
}

function checkBrackets(str) {
    let openStack = [];
    let closeStack = [];
    str.split('').forEach(element => {
        if (element === '(') {
            openStack.push(element);
        } else if (element === ')') {
            closeStack.push(element);
        }
    });

    if (openStack.length === closeStack.length) {
        return true;
    } else return false;
}

module.exports = {
    expressionCalculator
}