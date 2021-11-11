let stack = [];

let memory = new Uint8Array(201);
Array.prototype.lt = function () {
    let a = this.pop();
    let b = this.pop();
    if (a === undefined || b === undefined) throw new Error("not enough arguments for lt")
    return this.push(a < b)
}
Array.prototype.eq = function () {
    let a = this.pop();
    let b = this.pop();
    if (a === undefined || b === undefined) throw new Error("not enough arguments for eq")
    return this.push(a === b)
}
Array.prototype.mod = function () {
    let a = this.pop()
    let b = this.pop()
    if (a === undefined || b === undefined) throw new Error("not enough arguments for mod")
    return this.push(b % a)
}
Array.prototype.shl = function () {
    let a = this.pop()
    let b = this.pop()
    if (a === undefined || b === undefined) throw new Error("not enough arguments for shl")
    return this.push(b >> a)
};
Array.prototype.shr = function () {
    let a = this.pop()
    let b = this.pop()
    if (a === undefined || b === undefined) throw new Error("not enough arguments for shr")
    return this.push(b << a)
}
Array.prototype.or = function () {
    let a = this.pop()
    let b = this.pop()
    if (a === undefined || b === undefined) throw new Error("not enough arguments for or")
    return this.push(b || a)
};
Array.prototype.and = function () {
    let a = this.pop()
    let b = this.pop()
    if (a === undefined || b === undefined) throw new Error("not enough arguments for and")
    return this.push(b && a)
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
    if (a === undefined) throw new Error("not enough arguments for dup")
    this.push(a)
    this.push(a)
}
Array.prototype.drop = function () {
    let a = this.pop()
    if (a === undefined) throw new Error("not enough arguments for drop")
}
Array.prototype.plus = function () {
    let a = this.pop();
    let b = this.pop();
    if (a === undefined || b === undefined) throw new Error("not enough arguments for plus")
    this.push(a + b)
}
Array.prototype.minus = function () {
    let a = this.pop();
    let b = this.pop();
    if (a === undefined || b === undefined) throw new Error("not enough arguments for minus")
    this.push(a - b)
}
Array.prototype.print = function () {
    let a = this.pop()
    if (a === undefined) throw new Error("not enough arguments for print")
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
Array.prototype.store8 = function () {
    let a = this.pop()
    let b = this.pop()
    if (a === undefined || b === undefined) throw new Error("not enough arguments for store8 intrinsic")
    memory[a] = b;
}
Array.prototype.load8 = function () {
    let a = this.pop()
    if (a === undefined) throw new Error("not enough arguments for load8 intrinsic")
    this.push(memory[a])
}
    // code for comment 
    /// Max width of the row 
    ;
// code for comment 
/// Memory layout 
;
// code for memory 
stack.push(0);
// code for memory 
stack.push(100);
// code for number_literal 
stack.push(0);
// code for number_literal 
stack.push(100);
// code for number_literal 
stack.push(2);
// code for minus 
stack.minus();
// code for plus 
stack.plus();
// code for number_literal 
stack.push(1);
// code for swap 
stack.swap();
// code for store8 
stack.store8();
// code for number_literal 
stack.push(100);
// code for number_literal 
stack.push(100);
// code for plus 
stack.plus();
// code for number_literal 
stack.push(10);
// code for swap 
stack.swap();
// code for store8 
stack.store8();
// code for number_literal 
stack.push(0);
// code for while 

// while loop
while (
    ((stack) => { // code for dup 
        stack.dup();
        // code for identifier 
        //identifier N 
        stack.push(100);
        // code for number_literal 
        stack.push(2);
        // code for minus 
        stack.minus();
        // code for lt 
        stack.lt(); console.log(stack); return stack.pop()
    })(stack)) { // code for number_literal 
    stack.push(0);
    // code for while 

    // while loop
    while (
        ((stack) => { // code for dup 
            stack.dup();
            // code for identifier 
            //identifier N 
            stack.push(100);
            // code for lt 
            stack.lt();; return stack.pop()
        })(stack)) { // code for dup 
        stack.dup();
        // code for identifier 
        //identifier row 
        stack.push(0);
        // code for plus 
        stack.plus();
        // code for load8 
        stack.load8();
        // code for number_literal 
        stack.push(1);
        // code for eq 
        stack.eq();
        // code for ifElse 
        if (stack.pop()) {// code for dup 
            stack.dup();
            // code for identifier 
            //identifier display 
            stack.push(100);
            // code for plus 
            stack.plus();
            // code for string_literal 
            stack.push("*");
            // code for swap 
            stack.swap();
            // code for store8 
            stack.store8()
        } else {
            ; // code for dup 
            stack.dup();
            // code for identifier 
            //identifier display 
            stack.push(100);
            // code for plus 
            stack.plus();
            // code for string_literal 
            stack.push(" ");
            // code for swap 
            stack.swap();
            // code for store8 
            stack.store8()
        };
        // code for number_literal 
        stack.push(1);
        // code for plus 
        stack.plus()
    };
    // code for drop 
    stack.drop();
    // code for identifier 
    //identifier N 
    stack.push(100);
    // code for number_literal 
    stack.push(1);
    // code for plus 
    stack.plus();
    // code for identifier 
    //identifier display 
    stack.push(100);
    // code for print 
    stack.print();
    // code for identifier 
    //identifier row 
    stack.push(0);
    // code for load8 
    stack.load8();
    // code for number_literal 
    stack.push(1);
    // code for shl 
    stack.shr();
    // code for identifier 
    //identifier row 
    stack.push(0);
    // code for number_literal 
    stack.push(1);
    // code for plus 
    stack.plus();
    // code for load8 
    stack.load8();
    // code for or 
    console.log("before or 1", stack)
    stack.or();
    // code for number_literal 
    stack.push(1);
    // code for while 

    // while loop
    while (
        ((stack) => { // code for dup 
            stack.dup();
            // code for identifier 
            //identifier N 
            stack.push(100);
            // code for number_literal 
            stack.push(2);
            // code for minus 
            stack.minus();
            // code for lt 
            stack.lt();; return stack.pop()
        })(stack)) { // code for swap 
        stack.swap();
        // code for number_literal 
        stack.push(1);
        // code for shl 
        stack.shr();
        // code for number_literal 
        stack.push(7);
        // code for and 
        stack.and();
        // code for over 
        stack.over();
        // code for identifier 
        //identifier row 
        stack.push(0);
        // code for plus 
        stack.plus();
        // code for number_literal 
        stack.push(1);
        // code for plus 
        stack.plus();
        // code for load8 
        console.log(memory)
        stack.load8();
        // code for or 
        console.log("before or2  ", stack)

        stack.or();
        // code for dup 
        stack.dup();
        // code for dup 
        stack.dup();
        // code for number_literal 
        stack.push(110);
        // code for swap 
        stack.swap();
        // code for shr 
        stack.shl();
        // code for number_literal 
        stack.push(1);
        // code for and 
        stack.and();
        // code for swap 
        stack.swap();
        // code for identifier 
        //identifier row 
        stack.push(0);
        // code for plus 
        stack.plus();
        // code for store8 
        stack.store8();
        // code for swap 
        stack.swap();
        // code for number_literal 
        stack.push(1);
        // code for plus 
        stack.plus()
    };
    // code for drop 
    stack.drop();
    // code for drop 
    stack.drop();
    // code for number_literal 
    stack.push(1);
    // code for plus 
    stack.plus()
};
// code for drop 
stack.drop()