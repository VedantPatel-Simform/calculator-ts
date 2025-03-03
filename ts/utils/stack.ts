function stack() {
  let arr: string[] = [];

  return {
    peek(): string | undefined {
      return arr[arr.length - 1]; // Returns undefined if empty
    },
    pop(): string | undefined {
      return arr.pop(); // Returns undefined if empty
    },
    push(val: string): void {
      arr.push(val);
    },
    isEmpty(): boolean {
      return arr.length === 0;
    },
  };
}

export default stack;
