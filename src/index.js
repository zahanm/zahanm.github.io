/* @flow */
'use strict';

class Foo {
  name: string;
  constructor() {
    this.name = 'fuzzy';
  }
  sayHello(): string {
    return `my name is ${this.name}`;
  }
}

var f: Foo = new Foo();
console.log(f.sayHello());
