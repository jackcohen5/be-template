module.exports = {
    roots: ['<rootDir>/src'],
    testRegex: '((\\.|/*.)(test))\\.ts$',
    modulePaths: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/src/config/setupJest.ts'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
}
