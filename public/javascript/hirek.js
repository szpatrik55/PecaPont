const newsData = {
    felszereles: [
        {
            title: "Új feeder botok 2026-ra",
            date: "2026-01-10",
            tag: "Felszerelés",
            text: "A modern feeder botok könnyebbek és érzékenyebbek, így finom kapásoknál is jobban teljesítenek."
        },
        {
            title: "Zsinórválasztási útmutató kezdőknek",
            date: "2026-01-18",
            tag: "Felszerelés",
            text: "Monofil vagy fonott? A választás függ a célhaltól és a technikától. A fonott pontosabb visszajelzést ad."
        }
    ],
    tippek: [
        {
            title: "Hideg vízi pontyozás: 3 gyors tipp",
            date: "2026-01-05",
            tag: "Tippek",
            text: "Kisebb csali, lassabb etetés, és keresd a mélyebb részeket. A kapások ritkábbak, de értékesebbek."
        },
        {
            title: "Pergetés kezdőknek: mikor és hol?",
            date: "2026-01-22",
            tag: "Tippek",
            text: "Hajnal és alkonyat a legjobb. A ragadozók gyakran akadók közelében és töréseknél vadásznak."
        }
    ],
    vizallas: [
        {
            title: "Vízállás figyelése: mire elég a helyi info?",
            date: "2026-01-12",
            tag: "Vízállás",
            text: "A vízállás és az áramlás erőssége döntő. Magas víznél a halak gyakran a part mentén keresnek táplálékot."
        }
    ],
    ures: []
};

const select = document.getElementById("newsSelect");
const result = document.getElementById("result");

function renderEmpty(message) {
    result.innerHTML = `<div class="badge-empty">${message}</div>`;
}

function renderError(message) {
    result.innerHTML = `<div class="badge-error">${message}</div>`;
}

function renderSuccess(items) {
    const cards = items.map(n => `
        <div class="news-card">
            <div class="news-title">${n.title}</div>
            <div class="news-meta">
                <span>📅 ${n.date}</span>
                <span>🏷️ ${n.tag}</span>
            </div>
            <div class="news-text">${n.text}</div>
        </div>
    `).join("");

    result.innerHTML = `
        <div class="badge-success">Hírek (${items.length} db):</div>
        ${cards}
    `;
}

select.addEventListener("change", () => {
    const value = select.value;

    // Üres állapot: nincs választás
    if (!value) {
        renderEmpty("Válassz egy témát a folytatáshoz.");
        return;
    }

    // Hiba állapot: demo
    if (value === "hiba") {
        renderError("Hiba történt a hírek betöltésekor. Próbáld meg később!");
        return;
    }

    // Ismeretlen kulcs (hiba)
    if (!Object.prototype.hasOwnProperty.call(newsData, value)) {
        renderError("Ismeretlen téma. (Adatkonzisztencia hiba)");
        return;
    }

    // Üres lista állapot
    if (newsData[value].length === 0) {
        renderEmpty("Ebben a témában jelenleg nincs megjeleníthető hír.");
        return;
    }

    // Sikeres állapot
    renderSuccess(newsData[value]);
});

// inicializálás
renderEmpty("Válassz egy témát a folytatáshoz.");
