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
exports.getImagePath = exports.resize = void 0;
const promises_1 = __importDefault(require('fs/promises'));
const path_1 = __importDefault(require('path'));
const sharp_1 = __importDefault(require('sharp'));
const constants_1 = require('../constants/constants');
const resize = (image) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const fullPath = `${path_1.default.resolve(
      __dirname,
      `${constants_1.FULL_IMAGES_PATH}/${image.filename}.jpg`,
    )}`;
    const thumbPath = `${path_1.default.resolve(
      __dirname,
      `${constants_1.THUMB_IMAGES_PATH}/${image.filename}-${image.height}x${image.width}.jpg`,
    )}`;
    const file = yield promises_1.default.readFile(fullPath).catch(() => null);
    if (!file) {
      return Promise.reject();
    }
    const imageBuffer = yield (0, sharp_1.default)(file)
      .resize(image.width, image.height)
      .toFormat('jpg')
      .toBuffer()
      .catch(() => null);
    if (!imageBuffer) {
      return Promise.reject();
    }
    return promises_1.default
      .writeFile(thumbPath, imageBuffer)
      .then(() => imageBuffer)
      .catch(() => Promise.reject());
  });
exports.resize = resize;
const getImagePath = (image) => {
  return `${path_1.default.resolve(
    __dirname,
    `${constants_1.FULL_IMAGES_PATH}/${image.filename}${constants_1.JPG_EXTENSION}`,
  )}`;
};
exports.getImagePath = getImagePath;
