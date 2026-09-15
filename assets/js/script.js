const toggle = document.getElementById("language-toggle");
const pageContent = document.getElementById("page-content");

let currentLanguage = localStorage.getItem("language") || "sk";

async function loadLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);

        if (!response.ok) {
            throw new Error("Translation file not found");
        }

        const translations = await response.json();

        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.dataset.i18n;

            if (translations[key]) {
                element.textContent = translations[key];
            }
        });

        currentLanguage = lang;
        localStorage.setItem("language", lang);

    } catch (error) {
        console.error("Chyba pri načítaní prekladov:", error);
    }
}


toggle.checked = currentLanguage === "en";
loadLanguage(currentLanguage);


toggle.addEventListener("change", () => {
    const lang = toggle.checked ? "en" : "sk";
    loadLanguage(lang);
});


async function loadPage() {
    let page = window.location.hash.substring(1);


    if (!page) {
        page = "home";
    }


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


        await loadLanguage(currentLanguage);

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