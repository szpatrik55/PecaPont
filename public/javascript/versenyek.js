const eventsData = {
    tavi: [
        { title: "PecaPont Kupa – Tavi forduló", date: "2026-03-14", location: "Szeged – Fehér-tó" },
        { title: "Tavaszi Ponty Kihívás", date: "2026-04-05", location: "Algyői holtág" }
    ],
    folyami: [
        { title: "Tisza Parti Pergető Nap", date: "2026-02-22", location: "Tisza – Szeged" },
        { title: "Harcsa Éjszaka Challenge", date: "2026-06-01", location: "Tisza – Mindszent" }
    ],
    talalkozo: [
        { title: "Közös Pecázás & Tippek", date: "2026-02-08", location: "Szeged környéke" }
    ],
    ures: []
};

const select = document.getElementById("eventSelect");
const result = document.getElementById("result");

function renderEmpty(message) {
    result.innerHTML = `<div class="badge-empty">${message}</div>`;
}

function renderError(message) {
    result.innerHTML = `<div class="badge-error">${message}</div>`;
}

function renderSuccess(items) {
    const cards = items.map(e => `
        <div class="event-card">
            <div class="event-title">${e.title}</div>
            <div class="event-meta">
                <span>📅 ${e.date}</span>
                <span>📍 ${e.location}</span>
            </div>
        </div>
    `).join("");

    result.innerHTML = `
        <div class="badge-success">Események (${items.length} db):</div>
        ${cards}
    `;
}

select.addEventListener("change", () => {
    const value = select.value;

    // Üres állapot: nincs választás
    if (!value) {
        renderEmpty("Válassz egy kategóriát a folytatáshoz.");
        return;
    }

    // Hiba állapot: demo
    if (value === "hiba") {
        renderError("Hiba történt az események betöltésekor. Próbáld meg később!");
        return;
    }

    // Ismeretlen kulcs (hiba)
    if (!Object.prototype.hasOwnProperty.call(eventsData, value)) {
        renderError("Ismeretlen kategória. (Adatkonzisztencia hiba)");
        return;
    }

    // Üres lista állapot
    if (eventsData[value].length === 0) {
        renderEmpty("Ebben a kategóriában jelenleg nincs meghirdetett esemény.");
        return;
    }

    // Sikeres állapot
    renderSuccess(eventsData[value]);
});

// inicializálás
renderEmpty("Válassz egy kategóriát a folytatáshoz.");
