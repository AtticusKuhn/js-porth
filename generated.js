let stack = [];
stack.push(1);
stack.push(2);
stack.push(stack.pop() + stack.pop());
console.log(stack.pop())