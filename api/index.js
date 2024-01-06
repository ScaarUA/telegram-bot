import express from "express";
import usersRouter from "./routes/users.js";

const router = express.Router();

router.use('/users', usersRouter);

export default router;