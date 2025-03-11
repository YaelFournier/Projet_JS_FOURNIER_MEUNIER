import { Provider } from "./provider.js";
import {PageCharacters} from './views/PageCharacters.js';
import { Home } from './views/Home.js';
import { SERVER } from "./config.js";

Provider.loadCharacters(SERVER);
Provider.loadEquipments(SERVER);
Provider.loadRatings(SERVER);
Provider.loadFavorites(SERVER);

const routes = {
    "/" : () => {
        let home = new Home();
        home.afficher();
    },
    
    "/characters" : () => {
        let data = Provider.loadCharacters(SERVER);
        let characters = Provider.createCharacters(data);
        let pcharacters = new PageCharacters(characters);
        pcharacters.afficher(characters);
    }

}

window.addEventListener("hashchange", () => {
    const path = window.location.hash.replace("#", "/");
    if (routes[path]){
        document.getElementById("container-character").innerHTML = "";
        routes[path]();
    }
});

if (!window.location.hash) {
    window.location.hash = "#";
}
