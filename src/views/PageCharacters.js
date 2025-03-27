import { InterfaceAffichage } from "./InterfaceAffichage.js";
import {addClickListener, setFavorites, updateCSS} from "../app.js";

export class PageCharacters extends InterfaceAffichage {
    constructor(listCharacter) {
        super();
        this.listCharacter = listCharacter;
    }



    async afficher() {
        const container = document.getElementById("view-container");
        container.innerHTML = "";

        const characters_container = document.createElement("div");
        characters_container.classList.add("characters-container");

        container.append(characters_container);

        await updateCSS("characters.css");

        for (const character of this.listCharacter) {
            this._createCharacterCard(characters_container, character);
        }

        addClickListener(".card-character", "data-id-charac");
        console.log("fzdz");

        setTimeout(() => {
            characters_container.classList.add("show");
        }, 100);
    }


    _createCharacterCard(container, character, index) {
        const characterCard = document.createElement("div");
        characterCard.classList.add("card-character");

        // Image du personnage
        const img = document.createElement("img");
        img.src = "/src/static/img/characters/" + character.getImage();
        img.alt = "Character";
        img.loading = "lazy";
        characterCard.appendChild(img);

        // Nom du personnage
        const h3 = document.createElement("div");
        h3.className = "character-name";
        characterCard.setAttribute("data-id-charac", "characters/" + character.getId());
        h3.textContent = character.getName();
        characterCard.appendChild(h3);

        // Bouton Favoris
        const buttonFav = document.createElement("div");
        buttonFav.classList.add("button-fav");
        characterCard.appendChild(buttonFav);

        // Listener pour ajouter aux favoris
        buttonFav.addEventListener("click", async () => {
            await setFavorites(character.getId());
        });

        container.appendChild(characterCard);

        // Ajouter un délai d'animation pour chaque carte
        setTimeout(() => {
            characterCard.style.opacity = "1";
            characterCard.style.transform = "translateY(0) scale(1)";
        }, index * 100); // 100ms entre chaque carte
    }


}
