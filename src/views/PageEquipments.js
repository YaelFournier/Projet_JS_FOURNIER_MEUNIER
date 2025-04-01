import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener, updateCSS} from "../utils.js";
import { LocalStorage } from "../modules/LocalStorage.js";
import { Pagination } from "../modules/sort/Pagination.js";

export class PageEquipments extends InterfaceAffichage {
    constructor(listEquipment) {
        super();
        this.listEquipment = listEquipment;
        this.paginationObject = new Pagination(this.listEquipment, ".pagination", "/#/equipments");
    }

    // Page de listing d'equipments
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

        // Container des equipments
        const equipmentsContainer = document.createElement("div");
        equipmentsContainer.classList.add("equipments-container");
        container.appendChild(equipmentsContainer);

        // Màj du CSS
        await updateCSS("equipments.css");
        
        // Gestion de la pagination
        const paginationContainer = document.createElement("div");
        paginationContainer.classList.add("pagination-container");
        container.append(paginationContainer);
        this._addPagination(paginationContainer);

        // Initialiser les équipements paginés
        const paginatedEquipments = this.paginationObject.getSlices();
        this.listEquipment = paginatedEquipments;

        // Afficher les équipements
        for (const equipment of this.listEquipment) {
            this._createEquipmentCard(equipmentsContainer, equipment);
        }

        // Ajout du listener pour le lien de la page détail de l'equipment
        addClickListener(".card-equipment", "data-id-equip");

        setTimeout(() => {
            equipmentsContainer.classList.add("show");
        }, 100);
    }

    // Met a jour les données de la page pour la pagination
    async setData(data) {
        this.paginationObject.updateData(data);
        const paginatedData = this.paginationObject.getSlices();

        const equipmentsContainer = document.querySelector(".equipments-container");
        if (!equipmentsContainer) return;

        // Supprimer les anciens équipements
        equipmentsContainer.innerHTML = "";

        // Ajouter les nouveaux équipements
        paginatedData.forEach((equipment, index) => {
            this._createEquipmentCard(equipmentsContainer, equipment, index);
        });

        addClickListener(".card-equipment", "data-id-equip");
        this.paginationObject.updatePage();
    }

    // Ajoute la liste correspondante a la pagination
    _addPagination(container) {
        container.innerHTML = `
        <nav aria-label="Pagination equipments">
          <ul class="pagination"></ul>
        </nav>
        `;
        this.paginationObject.updatePage(); // Met à jour la pagination en fonction des données actuelles
    }

    // Créer une carte pour un equipment
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
