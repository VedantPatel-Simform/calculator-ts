function stack() {
    let arr = [];
    return {
        peek() {
            return arr[arr.length - 1]; // Returns undefined if empty
        },
        pop() {
            return arr.pop(); // Returns undefined if empty
        },
        push(val) {
            arr.push(val);
        },
        isEmpty() {
            return arr.length === 0;
        },
    };
}
export default stack;
