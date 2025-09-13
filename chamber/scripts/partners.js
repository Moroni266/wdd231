async function getMembers() {
    const response = await fetch("json/members.json");
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    const container = document.getElementById("partners-busines");
    container.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" class="member-logo">
            <div class="member-info">
                <h3 class="member-name">${member.name}</h3>
                <p class="member-address">${member.address}</p>
                <p class="member-phone">Phone: ${member.phone}</p>
                <a href="${member.website}" target="_blank" class="member-website">Visit Website</a>
            </div>
        `;
        container.appendChild(card);
    });
}

getMembers();
