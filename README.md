# function-implements-interface

`npm install @codexsoft/function-implements-interface`

Allows runtime-check that object implements an interface (missing functionality in TypeScript)

```javascript
let actualObj = {x: 'asd', y: 42};
let expectedInterface = {x: 'string'};
implementsInterface(actualObj, expectedInterface);
// returns true
```

interface objects are regular javascript objects where values are expected types.

`x: "function"` will expect that x is function 

`x: "string"` will expect that x is string
 
`x: "number"` will expect that x is number
 
`x: "object"` will expect that x is object
 
`x: "array"` will expect that x is array

`x: ["number", "string"]` will expect that x is number OR string

`x: {y: "number", z: "string""}` will expect that x is object and implements provided interface structure (recursive)

note, that in js every array is object, but not every object is array.

for typescript 

```typescript
import {implementsInterface} from "@codexsoft/function-implements-interface";
 
// regular typescript interface
interface SomeInterface {
    x: string;
}

// interface structure object
let someInterface = {
    x: 'string',
}

let obj = {x: 'hello world'};
if (implementsInterface<SomeInterface>(obj, someInterface)) {
// typescript will know that obj IS SomeInterface
    console.log(obj.x); 
}
```