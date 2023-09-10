"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validations_1 = require("../../../utils/functions/validations");
describe('utils/funtions - validation.ts', () => {
    it('should return null when all parameters is correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const image = {
            filename: 'santamonica',
            height: '100',
            width: '100',
        };
        const error = yield (0, validations_1.validateImage)(image);
        expect(error).toBeNull();
    }));
    it('should return error when filename is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const image = { height: '100', width: '100' };
        const error = yield (0, validations_1.validateImage)(image);
        expect(error === null || error === void 0 ? void 0 : error.code).toEqual(400);
        expect(error === null || error === void 0 ? void 0 : error.message).toEqual('filename is missing!!!');
    }));
    it('should return error when width is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const image = {
            filename: 'santamonica',
            height: '100',
        };
        const error = yield (0, validations_1.validateImage)(image);
        expect(error === null || error === void 0 ? void 0 : error.code).toEqual(400);
        expect(error === null || error === void 0 ? void 0 : error.message).toEqual('width is missing!!!');
    }));
    it('should return error when height is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const image = {
            filename: 'santamonica',
            width: '100',
        };
        const error = yield (0, validations_1.validateImage)(image);
        expect(error === null || error === void 0 ? void 0 : error.code).toEqual(400);
        expect(error === null || error === void 0 ? void 0 : error.message).toEqual('height is missing!!!');
    }));
    it('should return 404 error when filename is not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const image = {
            filename: 'test',
            height: '100',
            width: '100',
        };
        const error = yield (0, validations_1.validateImage)(image);
        expect(error === null || error === void 0 ? void 0 : error.code).toEqual(404);
        expect(error === null || error === void 0 ? void 0 : error.message).toEqual('filename is not exist!!!');
    }));
    it('should return error when height is not a number', () => __awaiter(void 0, void 0, void 0, function* () {
        const image = {
            filename: 'santamonica',
            height: 'test',
            width: '100',
        };
        const error = yield (0, validations_1.validateImage)(image);
        expect(error === null || error === void 0 ? void 0 : error.code).toEqual(400);
        expect(error === null || error === void 0 ? void 0 : error.message).toEqual('height is invalid!!!');
    }));
    it('should return error when width is not a number', () => __awaiter(void 0, void 0, void 0, function* () {
        const image = {
            filename: 'santamonica',
            height: '100',
            width: 'test',
        };
        const error = yield (0, validations_1.validateImage)(image);
        expect(error === null || error === void 0 ? void 0 : error.code).toEqual(400);
        expect(error === null || error === void 0 ? void 0 : error.message).toEqual('width is invalid!!!');
    }));
});
