import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/routes.js';

dotenv.config();
const app = express();

const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url} - ${new Date().toTimeString()}`);
    next();
};
app.use(loggingMiddleware);
app.use(express.json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("listening on port 3000");
});



