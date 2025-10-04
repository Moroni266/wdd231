const messageDiv = document.getElementById("visitor-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    messageDiv.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
        messageDiv.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
        messageDiv.textContent = "You last visited 1 day ago.";
    } else {
        messageDiv.textContent = `You last visited ${diffDays} days ago.`;
    }
}
localStorage.setItem("lastVisit", now);

const cardsContainer = document.getElementById("cards-container");

fetch("json/members.json")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.gridArea = `card${index + 1}`;
            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure>
                    <img src="${item.image}" alt="${item.name}">
                </figure>
                <address>${item.address}</address>
                <p>Phone: ${item.phone}</p>
                <p>Subscription: ${item.subscription}</p>
                <p><a href="${item.website}" target="_blank">Visit Website</a></p>
                <button>Learn More</button>
            `;
            cardsContainer.appendChild(card);
        });
    })
    .catch((error) => console.error("Error loading JSON:", error));
