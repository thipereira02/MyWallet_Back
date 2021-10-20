import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

import * as controller from "./controllers/controller.js";

app.post("/signup", controller.signup);

export default app;