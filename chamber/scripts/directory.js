const toggleBtn = document.getElementById("dark-toggle");
const burguer = document.querySelector(".burguer");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

burguer.addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("show");
});
