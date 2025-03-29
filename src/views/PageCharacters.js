import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener, updateCSS } from "../app.js";
import { Pagination } from "../modules/pagination.js";
import { LocalStorage } from "../modules/LocalStorage.js";

export class PageCharacters extends InterfaceAffichage {
    constructor(listCharacter) {
        super();
        this.listCharacter = listCharacter;
        this.paginationObject = new Pagination(this.listCharacter, ".pagination", "/#/characters");
    }

    async afficher() {
        const container = document.getElementById("view-container");

        container.innerHTML = "";

        const characters_container = document.createElement("div");
        characters_container.classList.add("characters-container");

        container.append(characters_container);

        await updateCSS("characters.css");

        const paginationContainer = document.createElement("div");
        paginationContainer.classList.add("pagination-container");
        container.append(paginationContainer);
        this._addPagination(paginationContainer);

        const charac = await this.paginationObject.afficherCharacters()
        for (const character of charac) {
            this._createCharacterCard(characters_container, character);
        }

        addClickListener(".card-character", "data-id-charac");

        setTimeout(() => {
            characters_container.classList.add("show");
        }, 100);
    }

    _addPagination(container) {
        container.innerHTML = `
            <nav aria-label="Pagination characters">
              <ul class="pagination">
              </ul>
            </nav>
        `;

        this.paginationObject.updatePage();
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
        if (LocalStorage.getFavorites("characters").find(id => id == character.getId())) {
            buttonFav.classList.add("active");
        }
        characterCard.appendChild(buttonFav);

        // Listener pour ajouter aux favoris
        buttonFav.addEventListener("click", (event) => {
            event.stopPropagation();
            if (buttonFav.classList.contains("active")) {
                buttonFav.classList.remove("active");
                LocalStorage.removeFavorites(character.getId(), "characters");

            } else {
                buttonFav.classList.add("active");
                LocalStorage.addFavorites(character.getId(), "characters");
            }
        });

        container.appendChild(characterCard);

        // Ajouter un délai d'animation pour chaque carte
        setTimeout(() => {
            characterCard.style.opacity = "1";
            characterCard.style.transform = "translateY(0) scale(1)";
        }, index * 100);
    }
}
