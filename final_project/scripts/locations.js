document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("myModal");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.querySelector(".close-btn");

    async function fetchLocations() {
        try {
            const response = await fetch("json/locations.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const locations = await response.json();
            displayLocations(locations);
        } catch (error) {
            console.error("Could not fetch locations:", error);
        }
    }

    function displayLocations(locations) {
        const locationsContainer = document.getElementById("locations-list");
        locationsContainer.innerHTML = "";

        locations.forEach((location) => {
            const card = document.createElement("div");
            card.classList.add("location-card");

            card.innerHTML = `
                <div class="location-info">
                    <h3>${location.name}</h3>
                    <p>${location.address}</p>
                    <p>Hours: ${location.hours}</p>
                    <p>Phone: ${location.phone}</p>
                    <p>Rating: ${location.rating} / 5</p>
                    <button class="details-btn" data-id="${location.id}">Check Availability</button>
                </div>
            `;
            locationsContainer.appendChild(card);
        });

        addEventListenersToButtons(locations);
    }

    function addEventListenersToButtons(locations) {
        const detailButtons = document.querySelectorAll(".details-btn");

        detailButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const locationId = parseInt(button.dataset.id);

                const location = locations.find((loc) => loc.id === locationId);

                if (location) {
                    const availableSpots =
                        location.capacity - location.currentCapacity;

                    modalBody.innerHTML = `
                        <h2>${location.name}</h2>
                        <p><strong>Total Capacity:</strong> ${location.capacity}</p>
                        <p><strong>Current Capacity:</strong> ${location.currentCapacity}</p>
                        <p><strong>Available spots:</strong> ${availableSpots}</p>
                    `;

                    modal.style.display = "block";
                }
            });
        });
    }

    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    fetchLocations();
});
