import type {JestConfigWithTsJest} from 'ts-jest'

const JestConfig: JestConfigWithTsJest = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['./jest.setup.ts']
}

export default JestConfig
