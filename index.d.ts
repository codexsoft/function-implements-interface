export declare function implementsInterface<T>(object: {
    [index: string]: unknown;
} | any, objInterface: {
    [index: string]: any;
}): object is T;
