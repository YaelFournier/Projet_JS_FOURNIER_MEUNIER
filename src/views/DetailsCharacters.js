import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener, updateCSS } from "../app.js";
import { setFavorites } from "../app.js";

export class DetailsCharacters extends InterfaceAffichage {

    constructor(character, equipments) {
        super();
        this.character = character;
        this.equipments = equipments;
    }

    async afficher() {
        const container = document.getElementById("view-container");
        container.innerHTML = "";

        // Création du conteneur principal pour les détails
        const characters_container = document.createElement("div");
        characters_container.classList.add("characters-container");
        container.appendChild(characters_container);
        const illustration_container = document.createElement("div");
        const details_container = document.createElement("div");
        illustration_container.classList.add("illustration-container");
        details_container.classList.add("details-container");
        const illustration = document.createElement("img");
        illustration.src = "/src/static/img/characters/" + this.character.getImage();
        illustration.alt = "Character";
        illustration.loading = "lazy";
        illustration.classList.add("illustration");
        illustration_container.appendChild(illustration);
        characters_container.append(illustration_container);
        characters_container.append(details_container);
        await updateCSS("detail-character.css");




        // Ajout du nom du personnage
        this._addCharacterDetail(details_container, "h2", this.character.getName());

        // Ajout du jeu d'origine du personnage
        this._addCharacterDetail(details_container, "h3", this.character.getGame());

        // Ajout de la classe du personnage
        this._addCharacterDetail(details_container, "h3", this.character.getCharacterClass());

        // Ajout du niveau du personnage
        this._addCharacterDetail(details_container, "h3", this.character.getLevel());

        // Affichage des équipements du personnage
        this._displayEquipments(details_container);

        // Ajout du bouton favoris
        this._addFavoriteButton(details_container);

    }

    // Méthode pour ajouter un détail du personnage
    _addCharacterDetail(container, tag, content) {
        const element = document.createElement(tag);
        element.textContent = content;
        container.appendChild(element);
    }

    // Méthode pour afficher les équipements du personnage
    _displayEquipments(container) {
        for (const equipment of this.equipments) {
            const equipmentElement = document.createElement("div");
            equipmentElement.className = 'equip';
            equipmentElement.setAttribute("id-equip", "equipments/" + equipment.getId());
            equipmentElement.textContent = equipment.getName();
            container.appendChild(equipmentElement);
        }

        // Ajout des listeners pour les équipements
        addClickListener(".equip", "id-equip");
    }

    // Méthode pour ajouter le bouton favoris
    _addFavoriteButton(container) {
        const buttonFav = document.createElement("div");
        buttonFav.classList.add("button-fav");
        if (this.character.favorites) {
            buttonFav.classList.add("active");
        }
        container.appendChild(buttonFav);

        // Listener pour ajouter aux favoris
        buttonFav.addEventListener("click", async (event) => {
            event.stopPropagation();
            if (buttonFav.classList.contains("active")) {
                buttonFav.classList.remove("active")
            }
            else {
                buttonFav.classList.add("active");
            }
            await setFavorites(this.character.getId());
        });
    }
}
