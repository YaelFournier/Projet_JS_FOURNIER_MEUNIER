import { Provider } from "./provider.js";
import { PageCharacters } from './views/PageCharacters.js';
import { PageEquipments } from './views/PageEquipments.js';
import { Home } from './views/Home.js';
import {SERVER, STYLES_PATH} from "./config.js";
import { DetailsCharacters } from "./views/DetailsCharacters.js";
import { DetailsEquipments } from "./views/DetailsEquipments.js";
import { PageFavorites } from "./views/PageFavorites.js";
import { PageRatings } from "./views/PageRatings.js";

document.addEventListener("DOMContentLoaded", () => {

    
    async function renderView(view, id=null){
        const body = document.body;
        const head = document.head
        switch (view){
            case "home":
                const homeView = new Home();
                homeView.afficher();
                break;
            case "characters":
                if (id){
                    const characterJSON = await Provider.loadCharactersById(SERVER, id);
                    const character = Provider.createCharacterById(characterJSON);

                    const equipments = [];

                    for (const ids of character.equipments){
                        const equipmentJSON = await Provider.loadEquipmentsById(SERVER, ids);
                        const equipment = Provider.createEquipmentById(equipmentJSON);
                        equipments.push(equipment);
                    }
                    const listRatingsJSON = await Provider.loadRatingById(SERVER, id);
                    console.log(listRatingsJSON);
                    const listRatings = Provider.createRatings(listRatingsJSON);
                    const detailsCharactersView = new DetailsCharacters(character, equipments, listRatings);
                    detailsCharactersView.afficher();
                    return;
                }
                else {
                    const charactersJSON = await Provider.loadCharacters(SERVER);
                    const characters = Provider.createCharacters(charactersJSON);
                    const pageCharactersView = new PageCharacters(characters);
                    pageCharactersView.afficher();
                    break;
                }
            case "equipments":
                if (id){
                    const equipmentJSON = await Provider.loadEquipmentsById(SERVER, id);
                    const equipment = Provider.createEquipmentById(equipmentJSON);
                    console.log(equipment);

                    const ownerJSON = await Provider.loadCharactersById(SERVER, equipment.getOwner());
                    const owner = Provider.createCharacterById(ownerJSON);
                    const detailsEquipmentsView = new DetailsEquipments(equipment, owner);
                    detailsEquipmentsView.afficher();
                    return;
                }
                else{
                    const equipmentsJSON = await Provider.loadEquipments(SERVER);
                    const equipments = Provider.createEquipments(equipmentsJSON);
                    const pageEquipmentsView = new PageEquipments(equipments);
                    pageEquipmentsView.afficher();
                    break;
                }
            case "favorites":
                const charactersJSON = await Provider.loadCharacters(SERVER);
                const characters = Provider.createCharacters(charactersJSON);
                const equipmentsJSON = await Provider.loadEquipments(SERVER);
                const equipments = Provider.createEquipments(equipmentsJSON);
                const pageFavoritesView = new PageFavorites(characters, equipments);
                pageFavoritesView.afficher();
                break;
            case "ratings":
                const ratingsJSON = await Provider.loadRatings(SERVER);
                const ratings = Provider.createRatings(ratingsJSON);
                const linkJSON = await Provider.loadCharacters(SERVER);
                const link = Provider.createCharacters(linkJSON);
                const pageRatings = new PageRatings(ratings, link);
                pageRatings.afficher();
                break;
            default:
                body.innerHTML = '<h1>Page introuvable</h1>';
                break;
        }
    }

    function handleRoute() {
        // Récupérer le hash de l'URL sans les paramètres après "?".
        const path = window.location.hash.substring(1).split('?')[0];

        // Définir les routes possibles
        const routes = [
            { pattern: /^\/characters\/(\d+)$/, view: "characters" },
            { pattern: /^\/characters$/, view: "characters" },
            { pattern: /^\/equipments\/(\d+)$/, view: "equipments" },
            { pattern: /^\/equipments$/, view: "equipments" },
            { pattern: /^\/ratings$/, view: "ratings" },
            { pattern: /^\/ratings\/(\d+)$/, view: "ratings" },
            { pattern: /^\/favorites$/, view: "favorites" },
            { pattern: /^\/$/, view: "home" }
        ];

        // Chercher une route qui correspond au chemin
        for (const route of routes) {
            const match = path.match(route.pattern);
            if (match) {
                const id = match[1] || null;
                renderView(route.view, id);
                return;
            }
        }

        renderView("404");
    }


    window.addEventListener("popstate", handleRoute);

    handleRoute();

});

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

