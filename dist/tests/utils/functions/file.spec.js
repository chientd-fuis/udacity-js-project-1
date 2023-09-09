'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const path_1 = __importDefault(require('path'));
const file_1 = require('../../../utils/functions/file');
const image_size_1 = __importDefault(require('image-size'));
describe('utils/funtions - file.ts', () => {
  it('getImagePath - should return exactly path when input file name', () => {
    const image = { filename: 'test', height: 0, width: 0 };
    expect((0, file_1.getImagePath)(image)).toEqual(
      path_1.default.resolve(
        __dirname,
        '../../../../assets/images/full/test.jpg',
      ),
    );
  });
  it('resize - should return exactly path when input file name', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const imageInfo = { filename: 'icelandwaterfall', height: 50, width: 50 };
      const image = yield (0, file_1.resize)(imageInfo);
      expect((0, image_size_1.default)(image).height).toEqual(50);
      expect((0, image_size_1.default)(image).width).toEqual(50);
      expect((0, image_size_1.default)(image).type).toEqual('jpg');
    }));
  it('resize - should return error when filename is not found', () => {
    const imageInfo = { filename: 'test', height: 50, width: 50 };
    (0, file_1.resize)(imageInfo).catch((err) => {
      expect(err).toEqual('file not found!!');
    });
  });
  it('resize - should return error when filename is not found', () => {
    const imageInfo = { filename: 'icelandwaterfall', height: NaN, width: 50 };
    (0, file_1.resize)(imageInfo).catch((err) => {
      expect(err).not.toBeNull();
    });
  });
});
