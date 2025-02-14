
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const cityInput = document.getElementById("cityInput");
    const dropdown = document.getElementById("dropdown");
    const fileInput = document.getElementById("file-input");
    const imageBoxes = document.querySelectorAll(".image-box");
    let selectedImageBox = null;

    const cities = ["Київ", "Львів", "Одеса", "Харків", "Дніпро", "Запоріжжя", "Вінниця", "Івано-Франківськ", "Полтава", "Чернігів"];

    // Функція для фільтрації міст
    cityInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        dropdown.innerHTML = "";
        dropdown.style.display = "none";
        
        if (query) {
            const filteredCities = cities.filter(city => city.toLowerCase().includes(query));
            if (filteredCities.length) {
                dropdown.style.display = "block";
                filteredCities.forEach(city => {
                    const div = document.createElement("div");
                    div.textContent = city;
                    div.classList.add("dropdown-item");
                    div.addEventListener("click", function () {
                        cityInput.value = city;
                        dropdown.style.display = "none";
                    });
                    dropdown.appendChild(div);
                });
            }
        }
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".search-container")) {
            dropdown.style.display = "none";
        }
    });

    // Функція вибору блоку для завантаження зображення
    window.selectImage = function (index) {
        selectedImageBox = imageBoxes[index];
        fileInput.click();
    };

    // Функція завантаження зображення
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

    // Обробка надсилання форми
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            eventName: document.querySelector(".inp1").value,
            shortDescription: document.querySelector(".inp2").value,
            fullDescription: document.querySelector(".inp3").value,
            city: cityInput.value,
            address: document.querySelector(".PIB1").value,
            ageRestriction: document.querySelector(".age1").value,
            images: [...imageBoxes].map(box => box.style.backgroundImage.replace('url("', '').replace('")', '')).filter(img => img)
        };

        console.log("Зібрані дані форми:", formData);
    });
});
