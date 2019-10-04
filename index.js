"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function implementsInterface(object, objInterface) {
    if (typeof object !== 'object' || typeof objInterface !== 'object') {
        return false;
    }
    for (var key in objInterface) {
        var expectedType = objInterface[key];
        if (expectedType === undefined) {
            continue;
        }
        var actualValue = object[key];
        var actualType = typeof actualValue;
        if (typeof expectedType === 'string') {
            if ((expectedType === 'array') && !Array.isArray(actualValue)) {
                return false;
            }
            else if ((expectedType === 'object') && (actualType !== 'object')) {
                return false;
            }
            else if ((expectedType !== 'object') && (expectedType !== 'array') && (actualType !== expectedType)) {
                return false;
            }
        }
        else if (Array.isArray(expectedType)) {
            if (!Array.isArray(actualValue)) {
                return false;
            }
            if (!arrayMatchesInterface(actualValue, expectedType)) {
                return false;
            }
        }
        else if (typeof expectedType === 'object') {
            if ((actualType !== 'object') || !implementsInterface(actualValue, expectedType)) {
                return false;
            }
        }
    }
    return true;
}
exports.implementsInterface = implementsInterface;
function arrayMatchesInterface(actualArray, allowedTypesForArray) {
    if (!Array.isArray(actualArray) || !Array.isArray(allowedTypesForArray)) {
        return false;
    }
    var arraysInAllowedTypes = null;
    var objectsInAllowedTypes = null;
    return actualArray.every(function (actualArrayItem) {
        var actualArrayItemType = typeof actualArrayItem;
        if (Array.isArray(actualArrayItem)) {
            if (arraysInAllowedTypes === null) {
                arraysInAllowedTypes = [];
                for (var _i = 0, allowedTypesForArray_1 = allowedTypesForArray; _i < allowedTypesForArray_1.length; _i++) {
                    var allowedTypesItem = allowedTypesForArray_1[_i];
                    if (Array.isArray(allowedTypesItem)) {
                        arraysInAllowedTypes.push(allowedTypesItem);
                    }
                }
            }
            if (!arraysInAllowedTypes.some(function (allowedArray) {
                return arrayMatchesInterface(actualArrayItem, allowedArray);
            })) {
                if (!lodash_1.includes(allowedTypesForArray, 'array')) {
                    return false;
                }
            }
        }
        if (actualArrayItemType === 'object') {
            if (objectsInAllowedTypes === null) {
                objectsInAllowedTypes = [];
                for (var _a = 0, allowedTypesForArray_2 = allowedTypesForArray; _a < allowedTypesForArray_2.length; _a++) {
                    var allowedTypesItem = allowedTypesForArray_2[_a];
                    if (typeof allowedTypesItem === 'object') {
                        objectsInAllowedTypes.push(allowedTypesItem);
                    }
                }
            }
            if (!objectsInAllowedTypes.some(function (allowedObjectStructure) {
                return implementsInterface(actualArrayItem, allowedObjectStructure);
            })) {
                if (!lodash_1.includes(allowedTypesForArray, 'object')) {
                    return false;
                }
            }
        }
        return lodash_1.includes(allowedTypesForArray, actualArrayItemType);
    });
}
exports.arrayMatchesInterface = arrayMatchesInterface;
//# sourceMappingURL=index.js.map