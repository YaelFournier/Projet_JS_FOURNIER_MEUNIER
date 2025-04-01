import { STYLES_PATH } from "./config.js";

export function sendRequest(path){
    window.location.href = `/#/${path}`;
}

export function addClickListener(selector, requestKey){
    document.querySelectorAll(selector).forEach(element => {
        element.addEventListener("click", function(event){
            const request = event.currentTarget.getAttribute(requestKey);
            sendRequest(request);
        });
    });
}

export async function setFavorites(characterId){
    let charac = await Provider.loadCharactersById(SERVER, characterId);
    const fav = charac.favorites;
    if (fav){
        await Provider.setFavoritesFalseById(SERVER, characterId);
    }
    else{
        await Provider.setFavoritesTrueById(SERVER, characterId);
    }
}

export async function updateCSS(href) {
    return new Promise((resolve) => {
        let link = document.querySelector('#page-styles');

        if (!link) {
            console.error("Aucun élément <link> trouvé !");
            resolve();
            return;
        }

        if (link.href.includes(href)) {
            console.log(`CSS ${href} déjà chargé.`);
            resolve();
            return;
        }

        console.log(`Chargement du CSS : ${href}`);
        link.href = STYLES_PATH + href;

        link.onload = () => {
            console.log(`CSS ${href} chargé !`);
            resolve();
        };
        setTimeout(() => {
            console.warn(`Timeout : CSS ${href} peut ne pas être complètement chargé.`);
            resolve();
        }, 100);
    });
}