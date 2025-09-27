const params = new URLSearchParams(window.location.search);
const details = document.getElementById("submission-details");

const requiredFields = [
    "first-name",
    "last-name",
    "email",
    "phone",
    "organization",
];

requiredFields.forEach((field) => {
    if (params.has(field)) {
        const li = document.createElement("li");
        li.textContent = `${field.replace("-", " ")}: ${params.get(field)}`;
        details.appendChild(li);
    }
});
