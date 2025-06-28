import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { login } from './routes/auth/login';
import { signup } from './routes/auth/signup';
import { logout } from './routes/auth/logout';
import { profileRouter } from './routes/userDetails/profile';
import { getExpenses } from './routes/userDetails/getExpenses';
import { AddExpenses } from './routes/userDetails/addExpenses';


const app = express();
const PORT = 5000;


app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', "http://localhost:5174", "https://bolt-analytic-dashboard.vercel.app"], // Adjust this to your client URL
    credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Auth Routes
app.use("/auth", signup)
app.use("/auth", login)
app.use("/auth", logout)

// User Details Routes
app.use("/api", profileRouter)

// Expenses Routes
app.use("/api", getExpenses)
app.use("/api", AddExpenses)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})