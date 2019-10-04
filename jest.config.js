module.exports = {
    "globals": {
        "ts-jest": {
            "tsConfig": "tsconfig.jest.json",
            "diagnostics": false,
        }
    },
    "roots": [
        "<rootDir>/tests"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
};