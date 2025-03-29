import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener, setFavorites, updateCSS } from "../app.js";

export class PageCharacters extends InterfaceAffichage {
    constructor(listCharacter) {
        super();
        this.listCharacter = listCharacter;
    }

    async afficher() {

        const container = document.getElementById("view-container");
        container.innerHTML = "";

        const searchContainer = document.createElement("div");
        searchContainer.classList.add("search-container");
        container.append(searchContainer);

        let searchBox = document.querySelector('.search-box');
        if (!searchBox) {
            searchBox = document.createElement("div");
            searchBox.classList.add("search-box");
            searchBox.innerHTML = `<input type="text" id="searchInput" placeholder="Rechercher..." />`;
            container.append(searchBox);
        }

        // Écouteur d'événements ajouté après l'affichage


        const characters_container = document.createElement("div");
        characters_container.classList.add("characters-container");

        container.append(characters_container);

        await updateCSS("characters.css");

        const paginationContainer = document.createElement("div");
        paginationContainer.classList.add("pagination-container");
        container.append(paginationContainer);
        this._addPagination(paginationContainer);

        for (const character of this.listCharacter) {
            this._createCharacterCard(characters_container, character);
        }

        addClickListener(".card-character", "data-id-charac");

        setTimeout(() => {
            characters_container.classList.add("show");
        }, 100);
    }

    async setData(data) {
        this.listCharacter = data; // Mettre à jour les données

        const characters_container = document.querySelector(".characters-container");
        if (!characters_container) return; // Sécurité si le conteneur n'est pas encore chargé

        // Supprimer les anciens personnages
        characters_container.innerHTML = "";

        // Ajouter les nouveaux personnages
        data.forEach((character, index) => {
            this._createCharacterCard(characters_container, character, index);
        });

        addClickListener(".card-character", "data-id-charac"); // Réactiver les événements
    }



    _addPagination(container) {
        container.innerHTML = `
            <nav aria-label="Pagination characters">
              <ul class="pagination">
              </ul>
            </nav>
        `;

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
        if (character.favorites) {
            buttonFav.classList.add("active");
        }
        characterCard.appendChild(buttonFav);

        // Listener pour ajouter aux favoris
        buttonFav.addEventListener("click", async () => {
            if (buttonFav.classList.contains("active")) {
                buttonFav.classList.remove("active");
            } else {
                buttonFav.classList.add("active");
            }
            await setFavorites(character.getId());
        });

        container.appendChild(characterCard);

        // Ajouter un délai d'animation pour chaque carte
        setTimeout(() => {
            characterCard.style.opacity = "1";
            characterCard.style.transform = "translateY(0) scale(1)";
        }, index * 100);
    }
}
