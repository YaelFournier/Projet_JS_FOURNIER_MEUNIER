import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener, updateCSS } from "../app.js";
import { setFavorites } from "../app.js";
import { ChangeRate } from "./ChangeRate.js";
import { LocalStorage } from "../modules/LocalStorage.js";

export class DetailsEquipments extends InterfaceAffichage {

    constructor(equipment, owner, listRatings) {
        super();
        this.equipment = equipment;
        this.owner = owner;
        this.listRatings = listRatings;
    }

    async afficher() {
        const container = document.getElementById("view-container");
        container.innerHTML = "";

        // Conteneur principal
        const equipment_container = document.createElement("div");
        equipment_container.classList.add("equipment-container");
        container.appendChild(equipment_container);

        const rating_container = document.createElement("div");
        rating_container.classList.add("rating-container");
        container.appendChild(rating_container);

        const illustration_container = document.createElement("div");
        const details_container = document.createElement("div");
        illustration_container.classList.add("illustration-container");
        details_container.classList.add("details-container");

        const illustration = document.createElement("img");
        illustration.src = "/src/static/img/equipments/" + this.equipment.getImage();
        illustration.alt = "Equipment";
        illustration.loading = "lazy";
        illustration.classList.add("illustration");
        illustration_container.appendChild(illustration);

        equipment_container.append(illustration_container, details_container);

        await updateCSS("detail-equipment.css");

        // Conteneurs des détails
        const detail_info = document.createElement("div");
        detail_info.classList.add("detail-info");
        const detail_owner = document.createElement("div");
        detail_owner.classList.add("detail-owner");
        details_container.append(detail_info, detail_owner);

        // Ajout des détails de l'équipement
        this._addCategorie(detail_info, "Informations");
        this._addEquipmentDetail(detail_info, "h4", this.equipment.getName());
        this._addEquipmentDetail(detail_info, "h4", this.equipment.getType());

        // Ajout du propriétaire de l'équipement
        this._addCategorie(detail_owner, "Propriétaire");
        this._displayOwner(detail_owner);

        // Ajout du bouton favoris
        this._addFavoriteButton(details_container);

        // Ajout des notes
        const title_rating = document.createElement("h2");
        title_rating.classList.add("titre-category");
        title_rating.textContent = "Les notes";
        const delimiter = document.createElement("div");
        delimiter.classList.add("delimiter");
        rating_container.appendChild(title_rating);
        rating_container.appendChild(delimiter);

        for (let i = 0; i < this.listRatings.length; i++) {
            const note = this.listRatings[i];
            let authorName = note.getAuthor() ? note.getAuthor() : "Unknown";
            this._addNote(rating_container, note.getComment(), note.getScore(), authorName, note.getId());
        }
    }

    _addCategorie(container, titre) {
        const titleElement = document.createElement("h2");
        titleElement.classList.add("titre-category");
        titleElement.textContent = titre;

        const delimiter = document.createElement("div");
        delimiter.classList.add("delimiter");

        container.appendChild(titleElement);
        container.appendChild(delimiter);
    }

    _addEquipmentDetail(container, tag, content) {
        const element = document.createElement(tag);
        element.textContent = content;
        container.appendChild(element);
    }

    _displayOwner(container) {
        const ownerName = document.createElement("h4");
        ownerName.classList.add("owner-name");
        ownerName.textContent = this.owner.getName();  // Supposant que `this.owner.getName()` renvoie le nom du propriétaire.
        container.appendChild(ownerName);
    }

    _addFavoriteButton(container) {
        const buttonFav = document.createElement("button");
        buttonFav.classList.add("button-fav");

        // Vérifie si l'équipement est dans les favoris
        if (LocalStorage.getFavorites("equipments").find(id => id == equipment.getId())) {
            buttonFav.classList.add("active");
        }

        // Ajoute un événement pour basculer l'état du bouton de favoris
        buttonFav.addEventListener("click", (event) => {
            event.stopPropagation();
            if (buttonFav.classList.contains("active")) {
                buttonFav.classList.remove("active");
                LocalStorage.removeFavorites(this.equipment.getId(), "equipments");   
            } else {
                buttonFav.classList.add("active");   
                LocalStorage.addFavorites(this.equipment.getId(), "equipments");
            }
        });

        container.appendChild(buttonFav);
    }


    _addNote(container, title, notation, author, ratingId) {
        const note_container = document.createElement("div");
        note_container.classList.add("note-container");

        const authorNameContainer = document.createElement("div");
        authorNameContainer.classList.add("author-name-container");
        note_container.append(authorNameContainer);

        const authorName = document.createElement("h2");
        authorName.classList.add("author-name", "titre-category");
        authorName.textContent = author;
        authorNameContainer.appendChild(authorName);

        const secondaryContainer = document.createElement("div");
        secondaryContainer.classList.add("container-fluid", "d-flex", "justify-content-between", "align-items-center");

        const titre = document.createElement("p");
        titre.classList.add("note-title", "mx-auto");
        titre.textContent = title;
        secondaryContainer.appendChild(titre);

        const rate = document.createElement("h5");
        rate.classList.add("rate");
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
}
