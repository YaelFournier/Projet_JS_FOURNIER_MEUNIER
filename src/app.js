import { Provider } from "./provider.js";
import { PageCharacters } from './views/PageCharacters.js';
import { PageEquipments } from './views/PageEquipments.js';
import { Home } from './views/Home.js';
import { SERVER } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
    async function renderView(view){
        const body = document.body;
        switch (view){
            case "home":
                const homeView = new Home();
                homeView.afficher();
                break;
            case "characters":
                const charactersJSON = await Provider.loadCharacters(SERVER);
                const characters = Provider.createCharacters(charactersJSON); 
                const pageCharactersView = new PageCharacters(characters);
                pageCharactersView.afficher();
                break;
            case "equipments":
                const equipmentsJSON = await Provider.loadEquipments(SERVER);
                const equipments = Provider.createEquipments(equipmentsJSON);
                const pageEquipmentsView = new PageEquipments(equipments);
                pageEquipmentsView.afficher();
                break;
            default:
                body.innerHTML = '<h1>Page introuvable</h1>';
                break;
        }
    }

    function handleRoute(){
        const path = window.location.hash.substring(1);
        switch (path){
            case "/characters":
                renderView("characters");
                break;
            case "/equipments":
                renderView("equipments");
                break;
            case "/":
                renderView("home");
                break;
            default:
                renderView("404");
                break;
        }
    }

    window.addEventListener("popstate", () => {
        handleRoute();
    });

    handleRoute();

});

export function sendRequest(path){
    window.location.href = `/#/${path}`;
}