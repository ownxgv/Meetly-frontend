const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 7000;

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

let users = []; 

app.post("/register", upload.single("photo"), (req, res) => {
    const { name, email, password, full_name, birth_date } = req.body;
    const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !email || !password || !full_name || !birth_date || !photoPath) {
        return res.status(400).json({ message: "Всі поля обов'язкові!" });
    }

    const newUser = { name, email, password, full_name, birth_date, photoPath };
    users.push(newUser); 
    console.log("Збережений користувач:", newUser);

    res.json({ message: "Реєстрація успішна!", user: newUser });
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});
