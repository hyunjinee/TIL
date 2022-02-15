function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        console.log(Array(padding + 1));
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

console.log(padLeft("Hello world", 4));
console.log('Hello world', 'Hohn says');
// console.log(padLeft("Hello world", true));