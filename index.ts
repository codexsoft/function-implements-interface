import {includes} from 'lodash';

export default function implementsInterface<T>(object: {[index: string]: unknown}|any, objInterface: {[index: string]: any;}): object is T {

    if (typeof object !== 'object' || typeof objInterface !== 'object') {
        return false;
    }

    for (let key in objInterface) {
        let expectedType = objInterface[key];
        if (expectedType === undefined) {
            continue;
        }

        let actualValue: unknown = object[key];
        let actualType = typeof actualValue;

        if (typeof expectedType === 'string') {

            if ((expectedType === 'array') && !Array.isArray(actualValue)) {
                return false;
            } else if ((expectedType === 'object') && (actualType !== 'object')) {
                return false;
            } else if ((expectedType !== 'object') && (expectedType !== 'array') && (actualType !== expectedType)) {
                return false;
            }

        } else if (Array.isArray(expectedType)) {

            if (!Array.isArray(actualValue)) {
                return false;
            }

            if (!arrayMatchesInterface(actualValue, expectedType)) {
                return false;
            }

        } else if (typeof expectedType === 'object') {
            if ((actualType !== 'object') || !implementsInterface(<any>actualValue, expectedType)) {
                return false;
            }
        }

    }

    return true;
}

function arrayMatchesInterface(actualArray: unknown[], allowedTypesForArray: unknown[]): boolean {

    if (!Array.isArray(actualArray) || !Array.isArray(allowedTypesForArray)) {
        return false;
    }

    let arraysInAllowedTypes: any[]|null = null;
    let objectsInAllowedTypes: any[]|null = null;

    return actualArray.every((actualArrayItem: unknown): boolean => {
        let actualArrayItemType = typeof actualArrayItem;

        if (Array.isArray(actualArrayItem)) {

            if (arraysInAllowedTypes === null) {
                arraysInAllowedTypes = [];
                for (let allowedTypesItem of allowedTypesForArray) {
                    if (Array.isArray(allowedTypesItem)) {
                        arraysInAllowedTypes.push(allowedTypesItem);
                    }
                }
            }

            if (!arraysInAllowedTypes.some((allowedArray: any[]) => {
                return arrayMatchesInterface(actualArrayItem, allowedArray);
            })) {
                if (!includes(allowedTypesForArray, 'array')) {
                    return false;
                }
            }

        }

        if (actualArrayItemType === 'object') {

            if (objectsInAllowedTypes === null) {
                objectsInAllowedTypes = [];
                for (let allowedTypesItem of allowedTypesForArray) {
                    if (typeof allowedTypesItem === 'object') {
                        objectsInAllowedTypes.push(allowedTypesItem);
                    }
                }
            }

            if (!objectsInAllowedTypes.some((allowedObjectStructure: any) => {
                return implementsInterface(<{[index: string]: unknown}>actualArrayItem, allowedObjectStructure);
            })) {
                if (!includes(allowedTypesForArray, 'object')) {
                    return false;
                }
            }

        }

        return includes(allowedTypesForArray, actualArrayItemType);
    });

}