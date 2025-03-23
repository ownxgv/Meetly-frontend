// async function fetchEventData() {
//     try {
//         const response = await fetch("http://localhost:7000/event/1"); // Змінено URL на правильний
//         if (!response.ok) {
//             throw new Error(`HTTP помилка! Статус: ${response.status}`);
//         }

//         const event = await response.json();

//         document.getElementById("title").textContent = event.eventName;
//         document.getElementById("event-short-description").textContent = event.shortDescription;
//         document.getElementById("meeting_time").textContent = event.ageLimit;
//         document.getElementById("location").textContent = event.city;
//         document.getElementById("description").textContent = event.fullDescription;

//         event.images.forEach((src, index) => {
//             const imgElement = document.getElementById(`event-image${index + 1}`);
//             if (imgElement) {
//                 imgElement.src = src;
//                 imgElement.style.display = "block"; 
//             }
//         });
//     } catch (error) {
//         console.error("Помилка отримання даних:", error);
//     }
// }

// fetchEventData();

async function fetchEventData() {
    try {
        const eventId = 0; // Замініть на необхідний ID заходу
        const response = await fetch(`http://localhost:7000/event/${eventId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP помилка! Статус: ${response.status}`);
        }

        const event = await response.json();
        console.log(event.event)

        document.getElementById("event-title").textContent = event.event.eventName;
        document.getElementById("event-short-description").textContent = event.event.shortDescription;
        document.getElementById("event-time").textContent = event.event.ageLimit;
        document.getElementById("event-location").textContent = event.event.city;
        document.getElementById("event-description").textContent = event.event.fullDescription;

        if (event.images && event.images.length > 0) {
            event.images.forEach((src, index) => {
                const imgElement = document.getElementById(`event-image${index + 1}`);
                if (imgElement) {
                    imgElement.src = src;
                    imgElement.style.display = "block";
                }
            });
        }
    } catch (error) {
        console.error("Помилка отримання даних:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchEventData);
