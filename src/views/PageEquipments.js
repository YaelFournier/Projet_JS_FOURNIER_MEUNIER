import { InterfaceAffichage } from "./InterfaceAffichage.js";
import {addClickListener, setFavorites, updateCSS} from "../app.js";
import { LocalStorage } from "../modules/LocalStorage.js";

export class PageEquipments extends InterfaceAffichage {
    constructor(listEquipment) {
        super();
        this.listEquipment = listEquipment;
    }

    async afficher() {
        const container = document.getElementById("view-container");
        container.innerHTML = "";

        const equipmentsContainer = document.createElement("div");
        equipmentsContainer.classList.add("equipments-container");

        container.appendChild(equipmentsContainer);

        await updateCSS("equipments.css");

        for (const equipment of this.listEquipment) {
            this._createEquipmentCard(equipmentsContainer, equipment);
        }

        addClickListener(".card-equipment", "data-id-equip");

        setTimeout(() => {
            equipmentsContainer.classList.add("show");
        }, 100);
    }

    _createEquipmentCard(container, equipment, index) {
        const equipmentCard = document.createElement("div");
        equipmentCard.classList.add("card-equipment");

        // Image de l'équipement
        const img = document.createElement("img");
        img.src = "/src/static/img/equipments/" + equipment.getImage();
        img.alt = "Equipment";
        img.loading = "lazy";
        equipmentCard.appendChild(img);

        // Nom de l'équipement
        const name = document.createElement("div");
        name.className = "equipment-name";
        name.textContent = equipment.getName();
        equipmentCard.appendChild(name);
        equipmentCard.setAttribute("data-id-equip", "equipments/" + equipment.getId());

        // Bouton Favoris
        const buttonFav = document.createElement("div");
        buttonFav.classList.add("button-fav");
        if (LocalStorage.getFavorites("equipments").find(id => id == equipment.getId())) {
            buttonFav.classList.add("active");
        }
        equipmentCard.appendChild(buttonFav);

        // Listener pour ajouter aux favoris
        buttonFav.addEventListener("click", (event) => {
            event.stopPropagation();
            if (buttonFav.classList.contains("active")) {
                buttonFav.classList.remove("active")
                LocalStorage.removeFavorites(equipment.getId(), "equipments");
            }
            else {
                buttonFav.classList.add("active");
                LocalStorage.addFavorites(equipment.getId(), "equipments");
            }
        });

        container.appendChild(equipmentCard);

        // Animation d'apparition progressive
        setTimeout(() => {
            equipmentCard.style.opacity = "1";
            equipmentCard.style.transform = "translateY(0) scale(1)";
        }, index * 100);
    }
}
