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
                    for (const id of character.equipments){
                        const equipmentJSON = await Provider.loadEquipmentsById(SERVER, id);
                        const equipment = Provider.createEquipmentById(equipmentJSON);
                        equipments.push(equipment);
                    }
                    const listRatingsJSON = await Provider.loadRatings(SERVER);
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
                    const ownerJSON = await Provider.loadCharactersById(SERVER, equipment.owner);
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
                const pageFavoritesView = new PageFavorites(characters);
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

    function handleRoute(){
        const path = window.location.hash.substring(1);
        const routes = [
            { pattern: /^\/characters\/(\d+)$/, view: "characters" },
            { pattern: /^\/characters$/, view: "characters"},
            { pattern: /^\/equipments\/(\d+)$/, view: "equipments" },
            { pattern: /^\/equipments$/, view: "equipments" },
            { pattern: /^\/ratings$/, view: "ratings" },
            { pattern: /^\/favorites$/, view: "favorites" },
            { pattern: /^\/$/, view: "home" }
        ];
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

export async function background_video() {
    // Vérifier si l'élément vidéo existe déjà
    const existingVideo = document.getElementById('background-video');

    // Si l'élément vidéo existe déjà, ne rien faire
    if (existingVideo) {
        return;
    }

    // Créer l'élément vidéo si ce n'est pas déjà fait
    const videoElement = document.createElement('video');
    videoElement.id = 'background-video';
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.loop = true;

    // Ajouter une source vidéo
    const videoSource = document.createElement('source');
    videoSource.src = 'src/static/video/background_home.mp4';
    videoSource.type = 'video/mp4';
    videoElement.appendChild(videoSource);

    // Ajouter l'élément vidéo au body
    document.body.appendChild(videoElement);

    // Appliquer des styles à la vidéo
    videoElement.style.position = 'fixed';
    videoElement.style.top = '0';
    videoElement.style.left = '0';
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.style.objectFit = 'cover';  // Pour que la vidéo couvre toute la zone sans déformation
    videoElement.style.zIndex = '-1';
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
    let link = document.querySelector('#page-styles');
    link.href = STYLES_PATH + href;
}