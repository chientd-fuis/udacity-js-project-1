"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(routes_1.default);
app.get('/', (_, res) => {
    res.status(200).send('Server is running...');
});
app.listen(port, () => {
    console.log('listening on port ' + port);
});
exports.default = app;
