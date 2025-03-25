import { InterfaceAffichage } from "./InterfaceAffichage.js";
import {addClickListener, background_video, setFavorites, updateCSS} from "../app.js";

export class PageCharacters extends InterfaceAffichage {
    constructor(listCharacter) {
        super();
        this.listCharacter = listCharacter;
    }

    _init() {
        background_video();

        addClickListener(".card-character", "data-id-charac");
    }

    afficher() {
        const container = document.getElementById("view-container");
        container.innerHTML = "";
        const characters_container = document.createElement("div");
        characters_container.classList.add("characters-container");
        container.append(characters_container);
        for (const character of this.listCharacter) {
            this._createCharacterCard(characters_container, character);
        }
        updateCSS("characters.css")
        this._init();
    }

    _createCharacterCard(container, character) {
        const characterCard = document.createElement("div");
        characterCard.classList.add("card-character");
        // Image du personnage
        const img = document.createElement("img");
        console.log(character.getImage());
        img.src = "/src/static/img/characters/" + character.getImage();
        img.alt = "Character";
        characterCard.appendChild(img);
        // Nom du personnage
        const h3 = document.createElement("div");
        h3.className = "character-name";
        characterCard.setAttribute("data-id-charac", "characters/" + character.getId());
        h3.textContent = character.getName();
        characterCard.appendChild(h3);

        // Bouton ajout favoris
        const buttonFav = document.createElement("div");
        buttonFav.classList.add("button-fav");
        characterCard.appendChild(buttonFav);

        // Listener pour ajouter aux favoris
        buttonFav.addEventListener("click", async () => {
            await setFavorites(character.getId());
        });

        container.appendChild(characterCard);
    }

}
