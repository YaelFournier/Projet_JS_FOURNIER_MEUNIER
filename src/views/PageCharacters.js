import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener, updateCSS } from "../utils.js";
import { Pagination } from "../modules/sort/Pagination.js";
import { LocalStorage } from "../modules/LocalStorage.js";

export class PageCharacters extends InterfaceAffichage {
    constructor(listCharacter) {
        super();
        this.listCharacter = listCharacter;
        this.paginationObject = new Pagination(this.listCharacter, ".pagination", "/#/characters");
    }

    // Page de listing de characters
    async afficher() {
        
        // Refresh de la page pour SPA 
        const container = document.getElementById("view-container");
        container.innerHTML = "";

        // Barre de recherche
        // Container de la search bar
        const searchContainer = document.createElement("div");
        searchContainer.classList.add("search-container");
        container.append(searchContainer);

        // Box de recherche
        let searchBox = document.querySelector('.search-box');
        if (!searchBox) {
            searchBox = document.createElement("div");
            searchBox.classList.add("search-box");
            searchBox.innerHTML = `<input type="text" id="searchInput" placeholder="Rechercher..." />`;
            container.append(searchBox);
        }

        // Container des characters
        const characters_container = document.createElement("div");
        characters_container.classList.add("characters-container");

        container.append(characters_container);

        // Màj du CSS
        await updateCSS("characters.css");

        // Gestion de la Pagination
        const paginationContainer = document.createElement("div");
        paginationContainer.classList.add("pagination-container");
        container.append(paginationContainer);
        this._addPagination(paginationContainer);

        // Récupère les éléments paginés avant de les afficher
        const paginatedCharacters = this.paginationObject.getSlices();
        this.listCharacter = paginatedCharacters;

        // Affichage des characters 
        for (const character of this.listCharacter) {
            this._createCharacterCard(characters_container, character);
        }

        // Ajout du listener pour le lien de la page détail du character
        addClickListener(".card-character", "data-id-charac");

        setTimeout(() => {
            characters_container.classList.add("show");
        }, 100);
    }

    // Nom de la page
    getName() {
        return "characters";
    }

    // Met a jour les données de la page pour la pagination
    async setData(data) {
        this.paginationObject.updateData(data);
        const paginatedData = this.paginationObject.getSlices();
        console.log(paginatedData);

        const characters_container = document.querySelector(".characters-container");
        if (!characters_container) return;

        // Supprimer les anciens personnages
        characters_container.innerHTML = "";

        // Ajouter les nouveaux personnages
        paginatedData.forEach((character, index) => {
            this._createCharacterCard(characters_container, character, index);
        });

        addClickListener(".card-character", "data-id-charac");
        this.paginationObject.updatePage();
    }

    // Ajoute la liste correspondante a la pagination
    _addPagination(container) {
        container.innerHTML = `
        <nav aria-label="Pagination characters">
          <ul class="pagination"></ul>
        </nav>
        `;
        // Pas besoin d'appeler `setData` ici, la pagination sera gérée directement par `setData`
        this.paginationObject.updatePage(); // Met à jour la pagination en fonction des données actuelles
    }

    // Créer une carte pour un character
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
