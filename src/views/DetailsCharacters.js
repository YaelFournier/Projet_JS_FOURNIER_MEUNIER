import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener, updateCSS } from "../utils.js";
import { ChangeRate } from "./ChangeRate.js";
import { LocalStorage } from "../modules/LocalStorage.js";

export class DetailsCharacters extends InterfaceAffichage {

    constructor(character, equipments, listRatings) {
        super();
        this.character = character;
        this.equipments = equipments;
        this.listRatings = listRatings;
    }

    // Page de détail d'un character
    async afficher() {
        
        // Refresh de la page pour SPA 
        const container = document.getElementById("view-container");
        container.innerHTML = "";

        // Création du conteneur principal pour les détails
        const characters_container = document.createElement("div");
        characters_container.classList.add("characters-container");
        container.appendChild(characters_container);
        const rating_container = document.createElement("div");
        rating_container.classList.add("ratings-container");
        container.appendChild(rating_container);
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

        // Màj du css 
        await updateCSS("detail-character.css");

        // Sous containers des détails du personnage
        const detail_cara = document.createElement("div");
        detail_cara.classList.add("detail-cara");
        const detail_univers = document.createElement("div");
        detail_univers.classList.add("detail-univers");
        const detail_equipment = document.createElement("div");
        detail_equipment.classList.add("detail-equipment");
        details_container.append(detail_cara, detail_univers, detail_equipment);

        // Ajout des caracteristiques du personnage
        this._addCategorie(detail_cara, "Caracteristiques");
        this._addCharacterDetail(detail_cara, "h4", "Nom : "+this.character.getName());
        this._addCharacterDetail(detail_cara, "h5", "Classe : "+this.character.getCharacterClass());
        this._addCharacterDetail(detail_cara, "h5", "Niveau : "+this.character.getLevel());
        this._addCategorie(detail_univers, "Univers");
        this._addCharacterDetail(detail_univers, "h4", this.character.getGame());
        this._addCategorie(detail_equipment, "Equipements");
        this._displayEquipments(detail_equipment);

        // Ajout du bouton favoris
        this._addFavoriteButton(details_container);

        //note dans rating container
        const title_rating = document.createElement("h2");
        title_rating.classList.add("titre-category");
        title_rating.textContent = "Les notes";
        const  delimiter = document.createElement("div");
        delimiter.classList.add("delimiter");
        rating_container.appendChild(title_rating);
        rating_container.appendChild(delimiter);
        for (let i=0; i<this.listRatings.length; i++) { 
            const note = this.listRatings[i];
            // Si pas d'auteur : Unknown
            let authorName = note.getAuthor() ? note.getAuthor() : "Unknown";
            this._addNote(rating_container, note.getComment(), note.getScore(), authorName, note.getId());
        }

    }

    // Fonctions pour l'affichage

    // Affichage de la note
    _addNote(container, title, notation, author, ratingId) {
        const note_container = document.createElement("div");
        note_container.classList.add("rating-container");

        const authorNameContainer = document.createElement('div');
        authorNameContainer.classList.add("author-name-container");
        note_container.append(authorNameContainer);

        const authorName = document.createElement('h2');
        authorName.classList.add("author-name", "titre-category");
        authorName.textContent = author;
        authorNameContainer.appendChild(authorName);

        const secondaryContainer = document.createElement("div");
        secondaryContainer.classList.add("container-fluid", "d-flex", "justify-content-between", "align-items-center");

        const titre = document.createElement("p");
        titre.classList.add("comment", "mx-auto");
        titre.textContent = title;
        secondaryContainer.appendChild(titre);

        const rate = document.createElement("h5");
        rate.classList.add("rating");
        rate.textContent = notation;
        secondaryContainer.appendChild(rate);

        note_container.appendChild(secondaryContainer);
        container.appendChild(note_container);

        // Ajout du bouton de modification
        const button = document.createElement("div");
        button.className = 'modif-rate';
        button.classList.add("btn", "text-light");
        button.textContent = "Modifier";
        note_container.appendChild(button);

        // Ajout de l'événement sur le bouton de modification
        button.addEventListener("click", (event) => {
            event.stopPropagation();

            let existingForm = note_container.querySelector(".form-rate");
            if (existingForm) {
                existingForm.remove();
            } else {
                const changeRate = new ChangeRate(this.listRatings, ratingId);
                const form = changeRate.afficher();
                note_container.appendChild(form);
            }
        });
    }


    // Créer une catégorie
    _addCategorie(container, title) {
        const titre = document.createElement('h2');
        titre.classList.add("titre-category");
        titre.textContent = title;
        container.appendChild(titre);
        const delimiter = document.createElement('div');
        delimiter.classList.add("delimiter");
        container.appendChild(delimiter);
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
        if (LocalStorage.getFavorites("characters").find(id => id == this.character.getId())) {
            buttonFav.classList.add("active");
        }
        container.appendChild(buttonFav);

        // Listener pour ajouter aux favoris
        buttonFav.addEventListener("click", (event) => {
            event.stopPropagation();
            if (buttonFav.classList.contains("active")) {
                buttonFav.classList.remove("active");
                LocalStorage.removeFavorites(this.character.getId(), "characters");
            }
            else {
                buttonFav.classList.add("active");
                LocalStorage.addFavorites(this.character.getId(), "characters");
            }
            
        });
    }
}
