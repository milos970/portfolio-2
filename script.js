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


const pageContent = document.getElementById("page-content");

async function loadPage() {
    let page = window.location.hash.substring(1);

    // Defaultná stránka
    if (!page) {
        alert(5);
        page = "home";
    }

    // Kontakt zostáva priamo v sidebare
    if (page === "contact") {
        document.getElementById("contact").scrollIntoView({
            behavior: "smooth"
        });
        return;
    }

    try {
        const response = await fetch(`pages/${page}.html`);

        if (!response.ok) {
            throw new Error("Page not found");
        }

        pageContent.innerHTML = await response.text();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {
        pageContent.innerHTML = `
            <section>
                <header class="main">
                    <h1>404</h1>
                </header>

                <p>Stránka neexistuje.</p>
            </section>
        `;
    }
}

window.addEventListener("hashchange", loadPage);

loadPage();