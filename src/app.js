import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

import * as userController from "./controllers/userController.js";
import * as financesController from "./controllers/financesController.js";

app.post("/signup", userController.signUp);
app.post("/signin", userController.signIn);
app.post("/finances", financesController.addFinance)

export default app;