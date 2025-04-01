import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener, updateCSS } from "../utils.js";

export class Home extends InterfaceAffichage {

    constructor(listCharacter) {
        super();
    }

    // Initialistation de l'application 
    _init() {

        // Mise en place du CSS
        updateCSS("home.css")

        // Carte de choix de fonctionnalités
        document.querySelectorAll(".card").forEach(card => {
            card.addEventListener("mouseenter", function() {
                const text = card.querySelector("h3");
                if (text) {
                    text.style.transform = "scale(1.12)";
                    text.style.transition = "transform 0.3s ease";
                }
            });

            card.addEventListener("mouseleave", function() {
                const text = card.querySelector("h3");
                if (text) {
                    text.style.transform = "scale(1)";
                    text.style.transition = "transform 0.3s ease";
                }
            });
        });
    }

    // Affichage de la page
    afficher() {
        const main = document.getElementById("view-container");
        main.innerHTML = `<div class="container-fluid d-flex justify-content-center">
                            <div class="card" data-category="characters" id="characters-container">
                                <h3 class="mx-auto my-auto text-light">Characters</h3>
                            </div>
                            <div class="card" data-category="equipments" id="equipments-container">
                                <h3 class="mx-auto my-auto text-light">Equipments</h3>
                            </div>
                            <div class="card" data-category="ratings" id="rating-container">
                                <h3 class="mx-auto my-auto text-light">Rating</h3>
                            </div>
                            <div class="card" data-category="favorites" id="favorites-container">
                                <h3 class="mx-auto my-auto text-light">Favorites</h3>
                            </div>
                          </div>`;
        addClickListener(".card", "data-category");
        this._init(); 
    }
}