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
        this._displayOwner(detail_owner)
        // Ajout du bouton favoris
        this._addFavoriteButton(details_container);
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
        const ownerElement = document.createElement("div");
        ownerElement.className = 'owner';
        ownerElement.setAttribute("id-owner", "characters/" + this.owner.getId());
        ownerElement.textContent = this.owner.getName();
        container.appendChild(ownerElement);

        // Ajout du listener pour le propriétaire
        addClickListener(".owner", "id-owner");
    }



    _addFavoriteButton(container) {
        const buttonFav = document.createElement("div");
        buttonFav.classList.add("button-fav");

        // Vérifie si l'équipement est déjà dans les favoris
        if (LocalStorage.getFavorites("equipments").find(id => id == this.equipment.getId())) {
            buttonFav.classList.add("active");
        }

        container.appendChild(buttonFav);

        // Ajoute un événement pour gérer l'ajout/retrait des favoris
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
    }




}
