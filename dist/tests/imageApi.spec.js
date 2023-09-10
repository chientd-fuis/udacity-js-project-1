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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const image_size_1 = __importDefault(require("image-size"));
const promises_1 = __importDefault(require("fs/promises"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('GET /api/images', () => {
    it('should return a status of 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images');
        expect(response.status).toBe(400);
    }));
    it('should return 400 when called with a missing FILENAME', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?height=200&width=200');
        expect(response.status).toBe(400);
        expect(response.text).toBe('filename is missing!!!');
    }));
    it('should return 400 when called with a missing WIDTH parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=palmtunnel&height=200');
        expect(response.status).toBe(400);
        expect(response.text).toBe('width is missing!!!');
    }));
    it('should return 400 when called with a missing HEIGHT parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=palmtunnel&width=200');
        expect(response.status).toBe(400);
        expect(response.text).toBe('height is missing!!!');
    }));
    it('should return 404 when called correctly but FILENAME does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=test&height=200&width=200');
        expect(response.status).toBe(404);
        expect(response.text).toBe('filename is not exist!!!');
    }));
    it('should return 400 when called with WIDTH is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=palmtunnel&height=150&width=1a50');
        expect(response.status).toBe(400);
        expect(response.text).toBe('width is invalid!!!');
    }));
    it('should return 400 when called with HEIGHT is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=palmtunnel&height=15a0&width=150');
        expect(response.status).toBe(400);
        expect(response.text).toBe('height is invalid!!!');
    }));
    it('should return 200 if called correctly and image exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=palmtunnel&height=150&width=150');
        expect(response.status).toBe(200);
    }));
    it('should created a thumb version of the image', () => __awaiter(void 0, void 0, void 0, function* () {
        request
            .get('/api/images?filename=palmtunnel&height=100&width=100')
            .then(() => promises_1.default
            .stat(path_1.default.resolve(__dirname, '../../assets/images/thumb/palmtunnel-100x100.jpg'))
            .then((fileStat) => expect(fileStat).not.toBeNull()));
    }));
    it('should created a thumb version of the image', () => __awaiter(void 0, void 0, void 0, function* () {
        request
            .get('/api/images?filename=palmtunnel&height=100&width=150')
            .then(() => {
            const dimensions = (0, image_size_1.default)(path_1.default.resolve(__dirname, '../../assets/images/thumb/palmtunnel-100x150.jpg'));
            expect(dimensions.height).toEqual(100);
            expect(dimensions.width).toEqual(150);
        });
    }));
});
