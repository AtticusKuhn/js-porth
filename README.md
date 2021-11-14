# JS porth
This is like [Porth](https://gitlab.com/tsoding/porth)
but implmented in javascript.

# Purpose
Porth only supports linux, so this can be run in the broswer so people on all operating systems can
see the beauty of Porth.
# Future Plans
I plan to make an interactive playground and website for people to try porth in javascript
I am going to add more intrinsics such as write_document so people can make websites in porth.
# How to run
you can see js_porth in action at https://eulerthedestroyer.github.io/js-porth/
in order to run, clone this repository and then run `npm run build-html`
# Example
If you want to see an example, go to ./src/example.porth That file gets generated into ./generated.js
```porth
1 while dup 100 < do
  dup 15 mod 0 = if
    "FizzBuzz" print
  else dup 3 mod 0 = if
    "Fizz" print
  else dup 5 mod 0 = if
    "Buzz" print
  else 
    dup print
  end
  1 +
end drop
```
```js
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
stack.lt(); ; return stack.pop() })(stack)) { stack.dup();
stack.push(15);
stack.mod();
stack.push(0);
stack.eq();
if(stack.pop()){stack.push("FizzBuzz");
stack.print()}else{ stack.dup();
stack.push(3);
stack.mod();
stack.push(0);
stack.eq(); if(stack.pop()){stack.push("Fizz");
stack.print()}else{ stack.dup();
stack.push(5);
stack.mod();
stack.push(0);
stack.eq(); if(stack.pop()){stack.push("Buzz");
stack.print()}else{ ; stack.dup();
stack.print()}}};
stack.push(1);
stack.plus() } ;
stack.drop()
```