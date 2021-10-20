import dotenv from "dotenv";

const envFile = process.env.NODE_ENV

dotenv.config({
	path: envFile
});