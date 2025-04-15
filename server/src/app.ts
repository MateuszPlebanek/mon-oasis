// src/app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static("public/images"));
app.use("/api", router); 

export default app;
