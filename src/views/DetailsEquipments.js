import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener, updateCSS } from "../utils.js";
import { LocalStorage } from "../modules/LocalStorage.js";

export class DetailsEquipments extends InterfaceAffichage {

    constructor(equipment, owner, listeUsers) {
        super();
        this.equipment = equipment;
        this.owner = owner;
        this.listeUsers = listeUsers;
    }

    // Page de détail d'un équipement
    async afficher() {
        console.log(this.listeUsers);
        // Refresh de la page pour SPA
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

        // Màj du css
        await updateCSS("detail-equipment.css");

        // Conteneurs des détails
        const detail_info = document.createElement("div");
        detail_info.classList.add("detail-info");
        const detail_owner = document.createElement("div");
        detail_owner.classList.add("detail-owner");
        const detail_users = document.createElement("div");
        detail_users.classList.add("detail-users");
        details_container.append(detail_info, detail_owner, detail_users);

        // Ajout des détails de l'équipement
        this._addCategorie(detail_info, "Informations");
        this._addEquipmentDetail(detail_info, "h4", "Nom : " + this.equipment.getName());
        this._addEquipmentDetail(detail_info, "h4", "Type : " + this.equipment.getType());

        // Ajout du propriétaire de l'équipement
        this._addCategorie(detail_owner, "Propriétaire");
        this._displayOwner(detail_owner);

        // Ajout de la catégorie Utilisateurs
        this._addCategorie(detail_users, "Utilisateurs");
        this._displayUsers(detail_users); // Affiche tous les utilisateurs

        // Ajout du bouton favoris
        this._addFavoriteButton(details_container);
    }

    // Fonctions pour l'affichage

    // Créer une catégorie
    _addCategorie(container, titre) {
        const titleElement = document.createElement("h2");
        titleElement.classList.add("titre-category");
        titleElement.textContent = titre;

        const delimiter = document.createElement("div");
        delimiter.classList.add("delimiter");

        container.appendChild(titleElement);
        container.appendChild(delimiter);
    }

    // Ajout d'une information
    _addEquipmentDetail(container, tag, content) {
        const element = document.createElement(tag);
        element.textContent = content;
        container.appendChild(element);
    }

    // Character qui possède l'objet
    _displayOwner(container) {
        const ownerElement = document.createElement("div");
        ownerElement.className = 'owner';
        ownerElement.setAttribute("id-owner", "characters/" + this.owner.getId());
        ownerElement.textContent = this.owner.getName();
        container.appendChild(ownerElement);

        // Ajout du listener pour le propriétaire
        addClickListener(".owner", "id-owner");
    }

    // Affichage des utilisateurs (plusieurs utilisateurs peuvent avoir l'équipement)
    // Affichage des utilisateurs (plusieurs utilisateurs peuvent avoir l'équipement)
    _displayUsers(container) {
        if (Array.isArray(this.listeUsers) && this.listeUsers.length > 0) {
            this.listeUsers.forEach(user => {
                const userElement = document.createElement("div");
                userElement.className = 'owner'; // Utilisation de 'owner' pour la classe CSS, tu peux la changer si nécessaire
                userElement.setAttribute("id-owner", "characters/" + user.id);  // Utilise `user.id` directement
                userElement.textContent = user.name;  // Utilisation de `user.name` pour afficher le nom du personnage
                container.appendChild(userElement);

                // Ajout du listener pour chaque utilisateur
                addClickListener(".owner", "id-owner");  // Utilise la même logique de listener pour chaque élément
            });
        } else {
            const noUserElement = document.createElement("div");
            noUserElement.className = 'no-user';
            noUserElement.textContent = "Aucun utilisateur";
            container.appendChild(noUserElement);
        }
    }



    // Bouton des favoris
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
