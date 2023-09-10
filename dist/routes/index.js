"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageApi_1 = __importDefault(require("./api/imageApi"));
const routes = express_1.default.Router();
routes.use('/api/images', imageApi_1.default);
exports.default = routes;
