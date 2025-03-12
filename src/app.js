import { Provider } from "./provider.js";
import { PageCharacters } from './views/PageCharacters.js';
import { Home } from './views/Home.js';
import { SERVER } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
    function renderView(view){
        const viewcontainer = document.querySelector(".view-container");
        if (!viewcontainer) {
            console.error("Élément .view-container introuvable");
            return; 
        }
        switch (view){
            case "home":
                const homeView = new Home();
                homeView.afficher();
                break;
            case "characters":
                console.log('renderview')
                let characters = Provider.loadCharacters(SERVER);
                const pageCharactersView = new PageCharacters(characters);
                pageCharactersView.afficher();
                break;
            default:
                viewcontainer.innerHTML = '<h1>Page introuvable</h1>';
                break;
        }
    }

    function handleRoute(){
        const path = window.location.hash.substring(1);
        switch (path){
            case "/characters":
                console.log('handleroute');
                renderView("characters");
                break;
            case "/":
                console.log('handleroute home');
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


