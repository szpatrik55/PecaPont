const data = {
    balaton: ["Északi part", "Déli part", "Tihany"],
    tisza: ["Poroszló", "Sarud", "Abádszalók"]
};

const select = document.getElementById("lakeSelect");
const result = document.getElementById("result");

select.addEventListener("change", () => {
    const value = select.value;
    result.innerHTML = "";

    // Üres állapot
    if (!value) {
        result.innerHTML = "<p>Válassz egy tavat a folytatáshoz.</p>";
        return;
    }

    // Hiba állapot
    if (value === "hiba") {
        result.innerHTML = "<p style='color:red;'>Hiba történt az adatok betöltésekor.</p>";
        return;
    }

    // Nincs adat
    if (!data[value] || data[value].length === 0) {
        result.innerHTML = "<p>Nincs horgászhely ezen a tavon.</p>";
        return;
    }

    // Sikeres állapot
    const ul = document.createElement("ul");

    data[value].forEach(place => {
        const li = document.createElement("li");
        li.textContent = place;
        ul.appendChild(li);
    });

    result.appendChild(ul);
});
