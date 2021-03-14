module.exports = function toReadable(number) {
    if (number === 0) return "zero";
    let result = [];

    let powers = new Map([
        [3, "thousand"],
        [6, "million"],
        [9, "billion"],
        [12, "trillion"],
        [15, "quadrillion"],
    ]);

    const numberString = number.toString();
    let power = 0;

    for (let digit = numberString.length - 1; digit >= 0; digit -= 3) {
        const tripleReadable = convertTripleToReadable(
            numberString.slice(Math.max(0, digit - 2), digit + 1)
        );
        if (tripleReadable && power) {
            result.unshift(powers.get(power));
        }
        if (tripleReadable) result.unshift(tripleReadable);
        power += 3;
    }
    return result.join(" ");

    function convertTripleToReadable(triple) {
        let result = [];
        let units = new Map([
            ["0", ""],
            ["1", "one"],
            ["2", "two"],
            ["3", "three"],
            ["4", "four"],
            ["5", "five"],
            ["6", "six"],
            ["7", "seven"],
            ["8", "eight"],
            ["9", "nine"],
        ]);

        let unitsPower1 = new Map([
            ["0", ""],
            ["2", "twenty"],
            ["3", "thirty"],
            ["4", "forty"],
            ["5", "fifty"],
            ["6", "sixty"],
            ["7", "seventy"],
            ["8", "eighty"],
            ["9", "ninety"],
        ]);

        let last = new Map([
            ["10", "ten"],
            ["11", "eleven"],
            ["12", "twelve"],
            ["13", "thirteen"],
            ["14", "fourteen"],
            ["15", "fifteen"],
            ["16", "sixteen"],
            ["17", "seventeen"],
            ["18", "eighteen"],
            ["19", "nineteen"],
        ]);
        let digits = new Map([
            [0, units],
            [1, unitsPower1],
            [2, units],
        ]);
        let power = 0;
        let lastTwo = triple.slice(
            Math.max(0, triple.length - 2),
            triple.length
        );
        if (last.has(lastTwo)) {
            result.push(last.get(lastTwo));
            power = 2;
        }
        for (let i = triple.length - 1 - power; i >= 0; i--) {
            const digitReadable = digits.get(power).get(triple[i]);
            if (power === 2 && digitReadable) result.unshift("hundred");
            if (digitReadable) result.unshift(digitReadable);
            power++;
        }
        return result.join(" ");
    }
};
