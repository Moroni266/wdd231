const year = document.querySelector("#currentyear");
const modified = document.querySelector("#lastModified");
const today = new Date();
const oLastModif = new Date(document.lastModified);

year.innerHTML = `${today.getFullYear()}`;
modified.innerHTML = `Last Modification ${oLastModif.toLocaleDateString(
    "en-US",
    {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
    }
)}`;
