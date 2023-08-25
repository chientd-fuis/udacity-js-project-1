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
const express_1 = __importDefault(require('express'));
const validations_1 = require('../../utils/functions/validations');
const file_1 = require('../../utils/functions/file');
const imageApi = express_1.default.Router();
imageApi.get('/', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const imageReq = req.query;
    const error = yield (0, validations_1.validateImage)(imageReq);
    if (error != null) {
      res.status(error.code).send(error.message);
      return;
    }
    const img = {
      filename: imageReq.filename,
      width: Number.parseInt(imageReq.width || '0'),
      height: Number.parseInt(imageReq.height || '0'),
    };
    yield (0, file_1.resize)(img)
      .then((resizedImage) => {
        res.status(200).contentType('jpg').send(resizedImage);
      })
      .catch((e) => {
        console.log('ERROR: ' + e);
        res.status(500).send('Error occured when processing the image');
      });
  }),
);
exports.default = imageApi;
