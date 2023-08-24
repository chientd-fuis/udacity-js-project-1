import { Router } from "express";
import express from 'express';
import imageApi from "./api/imageApi";

const routes: Router = express.Router();

routes.use('/api/image',imageApi);

export default routes;