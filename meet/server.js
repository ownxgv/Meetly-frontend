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

let event = []; 

// Створення нового заходу
app.post("/create", (req, res) => {
    const { eventName, shortDescription, fullDescription, city, address, ageLimit } = req.body;
    
    const newEvent = { eventName, shortDescription, fullDescription, city, address, ageLimit };
    event.push(newEvent); 
    const eventId = event.length - 1; // Отримуємо індекс нового заходу
    
    console.log("Збережений івент:", newEvent, "ID:", eventId);
    res.json({ message: "створення успішне!", eventId, event: newEvent });
});

// Отримання заходу за індексом
app.get("/event/:id", (req, res) => {
    const eventId = parseInt(req.params.id);
    console.log(event[eventId])
    if (eventId >= 0 && eventId < event.length) {
        res.json({ event: event[eventId] });
    } else {
        res.status(404).json({ message: "Захід не знайдено" });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});
