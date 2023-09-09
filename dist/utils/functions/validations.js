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
exports.validateImage = void 0;
const fs_1 = __importDefault(require('fs'));
const file_1 = require('./file');
const validateImage = (image) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!image.filename) {
      return { code: 400, message: 'filename is missing!!!' };
    }
    if (!image.width) {
      return { code: 400, message: 'width is missing!!!' };
    }
    if (!image.height) {
      return { code: 400, message: 'height is missing!!!' };
    }
    const img = {
      filename: image.filename,
      width: 0,
      height: 0,
    };
    const isExist = yield fs_1.default.existsSync(
      (0, file_1.getImagePath)(img),
    );
    if (!isExist) {
      return { code: 404, message: 'filename is not exist!!!' };
    }
    if (Number.isNaN(Number(image.width))) {
      return { code: 400, message: 'width is invalid!!!' };
    } else if (Number.parseInt(image.width) < 0) {
      return { code: 400, message: 'width must be positive number!!!' };
    }
    if (Number.isNaN(Number(image.height))) {
      return { code: 400, message: 'height is invalid!!!' };
    } else if (Number.parseInt(image.height) < 0) {
      return { code: 400, message: 'height must be positive number!!!' };
    }
    return null;
  });
exports.validateImage = validateImage;
