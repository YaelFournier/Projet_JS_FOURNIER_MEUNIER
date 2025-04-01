import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener, updateCSS } from "../app.js";
import { LocalStorage } from "../modules/LocalStorage.js";

export class PageFavorites extends InterfaceAffichage {

    constructor(characters, equipments) {
        super();
        this.characters = characters;
        this.equipments = equipments;
        this.favorites_charac = LocalStorage.getFavorites("characters");
        this.favorites_equip = LocalStorage.getFavorites("equipments");
    }

    async afficher(){
        const container = document.getElementById("view-container");
        container.innerHTML = "";
        await updateCSS("favoris.css");
        console.log(this.favorites_charac);
        console.log(this.favorites_equip);
        //Affichage des favoris
        // Perssonages
        if (this.favorites_charac.length > 0){
            for (const character of this.characters) {
                if (this.favorites_charac.includes(character.getId())) {
                    this._createCharacterCard(container, character);
                }          
            }
        }
        else{
            const errc = document.createElement("div");
            errc.classList.add("Erreur");
            errc.textContent = "Aucun Personnage en Favoris";
            container.appendChild(errc);
        }

        // delimiter
        const delimiter = document.createElement("div");
        delimiter.classList.add("delimiter");
        container.appendChild(delimiter);

        if (this.favorites_equip.length > 0){
            // Equipements
            for (const equipment of this.equipments) {
                if (this.favorites_equip.includes(equipment.getId())) {
                    this._createEquipmentCard(container, equipment);
                }            
            }
        }
        else{
            const erre = document.createElement("div");
            erre.classList.add("Erreur");
            erre.textContent = "Aucun Equipement en Favoris";
            container.appendChild(erre);
        }
        // Ajout des listeners sur les cartes
        addClickListener(".card-equipment", "data-id-equip");
        addClickListener(".card-character", "data-id-charac");
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
                if (confirm("Retirer des favoris ?")) {
                    buttonFav.classList.remove("active");
                    LocalStorage.removeFavorites(character.getId(), "characters");
        
                    // Supprimer le personnage de la liste de characters
                    this.characters = this.characters.filter(c => c.getId() !== character.getId());
                    
                    // Refresh de l'affichage
                    this.afficher();
                }
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
        buttonFav.addEventListener("click", async (event) => {
            event.stopPropagation();
            if (buttonFav.classList.contains("active")) {
                if (confirm("Retirer des favoris ?")){
                    buttonFav.classList.remove("active")
                    LocalStorage.removeFavorites(equipment.getId(), "equipments");

                    // Supprimer l'equipment la liste d'equipments
                    this.equipments = this.equipments.filter(c => c.getId() !== equipment.getId());
                    
                    // Refresh de l'affichage
                    this.afficher();
                }
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