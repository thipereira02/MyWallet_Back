import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

import * as userController from "./controllers/userController.js";

app.post("/signup", userController.signUp);
app.post("/signin", userController.signIn);

export default app;