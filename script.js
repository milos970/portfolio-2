const toggle = document.getElementById("language-toggle");
async function loadLanguage(lang) {
    const response = await fetch(`lang/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        console.log(key);
        element.textContent = translations[key];
    });

    // uloženie jazyka
    localStorage.setItem("language", lang);
}

// načítanie pri štarte
const savedLang = localStorage.getItem("language") || "sk";
toggle.checked = savedLang === "en";
loadLanguage(savedLang);

// prepnutie jazyka
toggle.addEventListener("change", () => {
    const lang = toggle.checked ? "en" : "sk";
    loadLanguage(lang);
});