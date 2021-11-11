let stack = []; 

Array.prototype.lt = function () {
    return this.push(this.pop() > this.pop())
}
Array.prototype.eq = function () {
    return this.push(this.pop() === this.pop())
}
Array.prototype.mod = function () {
    let a = this.pop()
    let b=  this.pop()
    return this.push(b % a )
}
Array.prototype.over = function () {
    let a = this.pop()
    let b = this.pop()
    if (a === undefined || b === undefined) {
        throw new Error("not enough arguments for over intrinsic")
    }
    this.push(b)
    this.push(a)
    this.push(b)
}
Array.prototype.dup = function () {
    let a = this.pop()
    this.push(a)
    this.push(a)
}
Array.prototype.drop = function () {
    this.pop()
}
Array.prototype.plus = function () {
    stack.push(stack.pop() + stack.pop())
}
Array.prototype.print = function () {
    console.log(stack.pop())
}
Array.prototype.swap = function () {
    let a = stack.pop()
    let b = stack.pop()
    if (a === undefined || b === undefined) {
        throw new Error("not enough arguments for swap intrinsic")
    }
    stack.push(a)
    stack.push(b)
}
    stack.push(1);

// while loop
while (
    ((stack) => { stack.dup();
stack.push(100);
stack.lt(); ; return stack.pop() })(stack)) { stack.push("loop");
stack.print();
stack.dup();
stack.push(15);
stack.mod();
stack.push(0);
stack.eq();
if(stack.pop()){stack.push("FizzBuzz\n");
//identifier puts 
}else{ stack.dup();
stack.push(3);
stack.mod();
stack.push(0);
stack.eq(); if(stack.pop()){stack.push("Fizz\n");
//identifier puts 
}else{ stack.dup();
stack.push(5);
stack.mod();
stack.push(0);
stack.eq(); if(stack.pop()){stack.push("Buzz\n");
//identifier puts 
}else{ ; stack.dup();
stack.print()}}};
stack.push(1);
stack.plus() } ;
stack.drop()