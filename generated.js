let stack = []; 

Array.prototype.lt = function () {
    let a = this.pop();
    let b = this.pop();
    if(a===undefined || b===undefined) throw new Error("not enough arguments for lt")
    return this.push(a > b)
}
Array.prototype.eq = function () {
    let a = this.pop();
    let b = this.pop();
    if(a===undefined || b===undefined) throw new Error("not enough arguments for eq")
    return this.push(a === b)
}
Array.prototype.mod = function () {
    let a = this.pop()
    let b=  this.pop()
    if(a===undefined || b===undefined) throw new Error("not enough arguments for mod")
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
    if(a===undefined) throw new Error("not enough arguments for dup")
    this.push(a)
    this.push(a)
}
Array.prototype.drop = function () {
    let a= this.pop()
    if(a===undefined) throw new Error("not enough arguments for drop")
}
Array.prototype.plus = function () {
    let a = this.pop();
    let b = this.pop();
    if(a===undefined || b===undefined) throw new Error("not enough arguments for plus")
    this.push(a+b)
}
Array.prototype.print = function () {
    let a =this.pop()
    if(a===undefined) throw new Error("not enough arguments for print")
    console.log(a)
}
Array.prototype.swap = function () {
    let a = this.pop()
    let b = this.pop()
    if (a === undefined || b === undefined) {
        throw new Error("not enough arguments for swap intrinsic")
    }
    this.push(a)
    this.push(b)
}
    ;
;
;
stack.push(6);
stack.print()