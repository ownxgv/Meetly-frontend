document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const buttonImage = document.getElementById('button-image');
                buttonImage.src = e.target.result; 
            };

            reader.readAsDataURL(file); 
        } else {
            alert('Будь ласка, виберіть файл зображення.');
        }
    }
});

document.getElementById("registrationForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Зупиняє перезавантаження сторінки

    // Отримання даних з форми
    const formData = new FormData(this);

    try {
        const response = await fetch("http://localhost:5000", {
            method: "POST",
            body: formData, // Відправка файлу разом з іншими даними
        });

        const result = await response.json();

        if (response.ok) {
            alert("Реєстрація успішна!");
        } else {
            alert("Помилка: " + result.message);
        }
    } catch (error) {
        console.error("Помилка:", error);
        alert("Щось пішло не так...");
    }
});
