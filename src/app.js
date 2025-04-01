import { Provider } from "./provider.js";
import { PageCharacters } from './views/PageCharacters.js';
import { PageEquipments } from './views/PageEquipments.js';
import { Home } from './views/Home.js';
import {SERVER, STYLES_PATH} from "./config.js";
import { DetailsCharacters } from "./views/DetailsCharacters.js";
import { DetailsEquipments } from "./views/DetailsEquipments.js";
import { PageFavorites } from "./views/PageFavorites.js";
import { PageRatings } from "./views/PageRatings.js";
import {SortController} from "./modules/sort/SortController.js";

document.addEventListener("DOMContentLoaded", () => {

    let controller = new SortController(null, null);

    async function renderView(view, id=null){
        const body = document.body;
        const head = document.head
        let allData = new Map();
        switch (view){
            case "home":
                const homeView = new Home();
                await controller.refreshAll(homeView, null);
                break;
            case "characters":
                if (id) {
                    let allData = new Map();

                    // Charger les données du personnage par ID
                    const characterJSON = await Provider.loadCharactersById(SERVER, id);
                    const character = Provider.createCharacterById(characterJSON);

                    const equipmentsMap = new Map();

                    // Charger les équipements spécifiques du personnage
                    for (const ids of character.equipments) {
                        const equipmentJSON = await Provider.loadEquipmentsById(SERVER, ids);
                        const equipment = Provider.createEquipmentById(equipmentJSON);
                        equipmentsMap.set(equipment.id, equipment); // Utiliser l'ID comme clé pour éviter les doublons
                    }

                    // Charger les équipements génériques pour le personnage
                    const genericalEquipmentsJSON = await Provider.loadEquipmentsForCharacter(SERVER, id);

                    // Créer et ajouter les équipements génériques à la Map (en évitant les doublons)
                    for (const genericEquipmentJSON of genericalEquipmentsJSON) {
                        const genericEquipment = Provider.createEquipmentById(genericEquipmentJSON);
                        equipmentsMap.set(genericEquipment.id, genericEquipment); // L'ID garantit qu'il n'y a pas de doublon
                    }

                    // Convertir la Map en tableau d'équipements uniques
                    const equipments = Array.from(equipmentsMap.values());

                    // Ajouter les équipements à la Map
                    allData.set('equipments', equipments);

                    // Charger les évaluations pour le personnage
                    const listRatingsJSON = await Provider.loadRatingById(SERVER, id);
                    const listRatings = Provider.createRatings(listRatingsJSON);
                    allData.set('ratings', listRatings);

                    // Créer la vue de détail du personnage et rafraîchir l'affichage
                    const detailsCharactersView = new DetailsCharacters(character, allData.get('equipments'), allData.get('ratings'));
                    controller.refreshAll(detailsCharactersView, allData);
                    return;
                }
                else {
                    let allData = new Map();
                    const charactersJSON = await Provider.loadCharacters(SERVER);
                    const characters = Provider.createCharacters(charactersJSON);
                    allData.set('characters', characters);
                    const pageCharactersView = new PageCharacters(characters);
                    controller.refreshAll(pageCharactersView, allData);
                    break;
                }
            case "equipments":
                if (id){
                    let allData = new Map();
                    const equipmentJSON = await Provider.loadEquipmentsById(SERVER, id);
                    const equipment = Provider.createEquipmentById(equipmentJSON);
                    allData.set('equipments', equipment);
                    const ownerJSON = await Provider.loadCharactersById(SERVER, equipment.getOwner());
                    const owner = Provider.createCharacterById(ownerJSON);
                    allData.set('owners', owner);
                    const detailsEquipmentsView = new DetailsEquipments(equipment, owner);
                    controller.refreshAll(detailsEquipmentsView, allData); //
                    return;
                }
                else{
                    let allData = new Map();
                    const equipmentsJSON = await Provider.loadEquipments(SERVER);
                    const equipments = Provider.createEquipments(equipmentsJSON);
                    allData.set('equipments', equipments);
                    const pageEquipmentsView = new PageEquipments(equipments);
                    controller.refreshAll(pageEquipmentsView, allData);
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
                allData.set('ratings', ratings);
                const linkJSON = await Provider.loadCharacters(SERVER);
                const link = Provider.createCharacters(linkJSON);
                allData.set('characters', link);
                const pageRatings = new PageRatings(ratings, link);
                controller.refreshAll(pageRatings, allData);
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

    document.addEventListener("DOMContentLoaded", function () {
        const navbar = document.querySelector(".bg-navbar");
        window.addEventListener("scroll", function () {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    });

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

