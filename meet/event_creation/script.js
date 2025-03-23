// Отримуємо всі елементи з класом "image-box" (блоки для завантаження зображень)
const imageBoxes = document.querySelectorAll('.image-box');
let currentIndex = 0; // Поточний індекс вибраного зображення

// Функція для вибору зображення за індексом
function selectImage(index) {
    currentIndex = index; // Зберігаємо індекс вибраного блоку
    document.getElementById('file-input').click(); // Викликаємо вибір файлу
}

// Функція для завантаження зображення після вибору файлу
function uploadImage(event) {
    const file = event.target.files[0]; // Отримуємо вибраний файл
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Вставляємо зображення у відповідний блок
            imageBoxes[currentIndex].innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
        };
        reader.readAsDataURL(file); // Зчитуємо файл як URL
    }
    event.target.value = ''; // Очищаємо input для можливості повторного вибору
}

// Масив міст для автодоповнення
const cities = ["Київ", "Львів", "Одеса", "Харків", "Дніпро", "Запоріжжя", "Вінниця", "Івано-Франківськ", "Полтава", "Чернігів"];
const input = document.getElementById("cityInput");
const dropdown = document.getElementById("dropdown");

// Обробник події введення в поле міста
input.addEventListener("input", function() {
    const value = this.value.toLowerCase();
    dropdown.innerHTML = ""; // Очищаємо випадаючий список

    if (value) {
        // Фільтруємо список міст за введеним значенням
        const filteredCities = cities.filter(city => city.toLowerCase().includes(value));

        if (filteredCities.length > 0) {
            dropdown.style.display = "block"; // Показуємо випадаючий список
            filteredCities.forEach(city => {
                const div = document.createElement("div");
                div.textContent = city;
                div.addEventListener("click", function() {
                    input.value = city; // Вставляємо вибране місто в поле вводу
                    dropdown.style.display = "none"; // Ховаємо випадаючий список
                });
                dropdown.appendChild(div);
            });
        } else {
            dropdown.style.display = "none"; // Якщо немає збігів, ховаємо список
        }
    } else {
        dropdown.style.display = "none"; // Якщо поле порожнє, ховаємо список
    }
});

// Закриваємо випадаючий список при кліку поза ним
document.addEventListener("click", function(event) {
    if (!event.target.closest(".search-container")) {
        dropdown.style.display = "none";
    }
});

// Код виконується після завантаження DOM
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"); // Отримуємо форму
    const cityInput = document.getElementById("cityInput"); // Поле вводу міста
    const dropdown = document.getElementById("dropdown"); // Випадаючий список
    const fileInput = document.getElementById("file-input"); // Поле вибору файлу
    const imageBoxes = document.querySelectorAll(".image-box"); // Блоки для зображень
    let selectedImageBox = null; // Обраний блок для завантаження зображення

    // Автодоповнення для міст (ще одна реалізація, що дублює попередній код)
    cityInput.addEventListener("input", function () {
        const cities = ["Київ", "Львів", "Одеса", "Харків", "Дніпро"];
        const query = cityInput.value.toLowerCase();
        dropdown.innerHTML = "";

        if (query) {
            const filteredCities = cities.filter(city => city.toLowerCase().includes(query));
            filteredCities.forEach(city => {
                const div = document.createElement("div");
                div.textContent = city;
                div.classList.add("dropdown-item");
                div.addEventListener("click", function () {
                    cityInput.value = city;
                    dropdown.innerHTML = "";
                });
                dropdown.appendChild(div);
            });
        }
    });


    // Функція вибору блоку для завантаження зображення
    window.selectImage = function (index) {
        selectedImageBox = imageBoxes[index]; // Запам'ятовуємо вибраний блок
        fileInput.click(); // Викликаємо вибір файлу
    };

    // Функція завантаження зображення
    window.uploadImage = function (event) {
        const file = event.target.files[0];
        if (file && selectedImageBox) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Вставляємо зображення у вибраний блок через CSS background-image
                selectedImageBox.style.backgroundImage = `url(${e.target.result})`;
            };
            reader.readAsDataURL(file);
        }
    };

    // Обробка надсилання форми
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Запобігаємо перезавантаженню сторінки

        // Збираємо дані з форми
        const formData = {
            eventName: document.querySelector(".inp1").value,
            shortDescription: document.querySelector(".inp2").value,
            fullDescription: document.querySelector(".inp3").value,
            city: cityInput.value,
            address: document.querySelector(".PIB1").value,
            ageRestriction: document.querySelector(".age1").value,
            images: []
        };

        // Збираємо посилання на завантажені зображення
        imageBoxes.forEach(box => {
            const bgImage = box.style.backgroundImage;
            if (bgImage) {
                formData.images.push(bgImage.replace('url("', '').replace('")', ''));
            }
        });

        console.log("Зібрані дані форми:", formData); // Виводимо дані у консоль (можна відправити на сервер)
    });
});

// Дублювання попереднього коду завантаження зображень та автодоповнення міст
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const cityInput = document.getElementById("cityInput");
    const dropdown = document.getElementById("dropdown");
    const fileInput = document.getElementById("file-input");
    const imageBoxes = document.querySelectorAll(".image-box");
    let selectedImageBox = null;

    cityInput.addEventListener("input", function () {
        const cities = ["Київ", "Львів", "Одеса", "Харків", "Дніпро"];
        const query = cityInput.value.toLowerCase();
        dropdown.innerHTML = "";

        if (query) {
            const filteredCities = cities.filter(city => city.toLowerCase().includes(query));
            filteredCities.forEach(city => {
                const div = document.createElement("div");
                div.textContent = city;
                div.classList.add("dropdown-item");
                div.addEventListener("click", function () {
                    cityInput.value = city;
                    dropdown.innerHTML = "";
                });
                dropdown.appendChild(div);
            });
        }
    });

    window.selectImage = function (index) {
        selectedImageBox = imageBoxes[index];
        fileInput.click();
    };

    window.uploadImage = function (event) {
        const file = event.target.files[0];
        if (file && selectedImageBox) {
            const reader = new FileReader();
            reader.onload = function (e) {
                selectedImageBox.style.backgroundImage = `url(${e.target.result})`;
            };
            reader.readAsDataURL(file);
        }
    };
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", async function (event) {
        event.preventDefault(); // Забороняємо стандартне перезавантаження сторінки

        const formData = new FormData();

        const eventName = document.querySelector(".inp1").value;
        const shortDescription = document.querySelector(".inp2").value;
        const fullDescription = document.querySelector(".inp3").value;
        const city = document.querySelector("#cityInput").value;
        const address = document.querySelector(".PIB1").value;
        const ageLimit = document.querySelector(".age1").value;
       
        const fileInput = document.getElementById("file-input");
        if (fileInput.files.length > 0) {
            for (let i = 0; i < fileInput.files.length; i++) {
                formData.append("eventImages", fileInput.files[i]);
            }
        }

        try {
            const response = await fetch("http://localhost:7000/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, // Вказуємо JSON-формат
                body: JSON.stringify({ eventName, shortDescription, fullDescription, city, address, ageLimit})
            });

            const result = await response.json();
            console.log("✅ Відповідь сервера:", result);
            
        } catch (error) {
            console.error("❌ Помилка відправки:", error);
            alert("Помилка з'єднання з сервером.");
        }
    });
});
