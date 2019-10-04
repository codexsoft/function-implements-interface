import {implementsInterface} from "../index";

test('basic', () => {

    let tests = [
        [{}, {x: 'string'}, false],
        [{x: ''}, {x: 'string'}, true],
        [{x: 42}, {x: 'string'}, false],
        [{x: {}}, {x: 'object'}, true],
        [{x: 'asd', y: 42}, {x: 'string'}, true],
        [{x: ['asd', 42, 'fff'], y: 42}, {x: 'array'}, true],
        [{x: ['asd', 42, 'fff'], y: 42}, {x: []}, false],
        [{x: ['asd', 42, 'fff'], y: 42}, {x: ['string','number']}, true],
        [{x: ['asd', {}, 'fff'], y: 42}, {x: ['string','number']}, false],
        [{x: ['asd', 'bbb', 'qwe'], y: 42}, {x: ['string']}, true],
        [{x: 'asd', y: 42}, {x: ['number', 'object']}, false],
        [{x: {z: 42}, y: 42}, {x: {z: 'number'}}, true],
        [{x: {z: [42]}, y: 42}, {x: {z: ['number']}}, true],
    ];

    tests.forEach(function(el: any) {
        let actualObj = el[0];
        let expectedInterface = el[1];
        let expectedResult = el[2];

        let realResult = implementsInterface(actualObj, expectedInterface);
        expect(realResult).toBe(expectedResult);
    });


});