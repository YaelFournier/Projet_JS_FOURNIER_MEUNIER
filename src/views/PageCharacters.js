import { InterfaceAffichage } from "./InterfaceAffichage.js";
import {addClickListener, setFavorites, updateCSS} from "../app.js";

export class PageCharacters extends InterfaceAffichage {
    constructor(listCharacter) {
        super();
        this.listCharacter = listCharacter;
    }

    afficher() {
        const container = document.getElementById("view-container");
        container.innerHTML = "";
        for (const character of this.listCharacter) {
            this._createCharacterCard(container, character);
        }
        updateCSS("characters.css")
        addClickListener(".charac", "data-id-charac");

    }

    _createCharacterCard(container, character) {
        const characterCard = document.createElement("div");
        characterCard.classList.add("card-character");
        // Nom du personnage
        const h3 = document.createElement("div");
        h3.className = "charac";
        h3.setAttribute("data-id-charac", "characters/" + character.getId());
        h3.textContent = character.getName();
        characterCard.appendChild(h3);

        // Bouton ajout favoris
        const buttonFav = document.createElement("div");
        buttonFav.className = "button-fav";
        buttonFav.textContent = "Ajouter en favoris";
        characterCard.appendChild(buttonFav);

        // Listener pour ajouter aux favoris
        buttonFav.addEventListener("click", async () => {
            await setFavorites(character.getId());
        });

        container.appendChild(characterCard);
    }
}
