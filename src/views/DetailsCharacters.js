import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener, background_video, updateCSS } from "../app.js";
import { setFavorites } from "../app.js";
import { Rating } from "../modules/Ratings.js";
import { ChangeRate } from "./ChangeRate.js";
import { Character } from "../modules/Characters.js";

export class DetailsCharacters extends InterfaceAffichage {

    constructor(character, equipments, listRatings) {
        super();
        this.character = character;
        this.equipments = equipments;
        this.listRatings = listRatings;
    }

    _init() {
        background_video();
        updateCSS("detail-character.css");
    }

    afficher() {
        const container = document.getElementById("view-container");
        container.innerHTML = "";

        // Création du conteneur principal pour les détails
        const characters_container = document.createElement("div");
        characters_container.classList.add("characters-container");
        container.appendChild(characters_container);

        // Ajout du nom du personnage
        this._addCharacterDetail(characters_container, "h2", this.character.getName());

        // Ajout du jeu d'origine du personnage
        this._addCharacterDetail(characters_container, "h3", this.character.getGame());

        // Ajout de la classe du personnage
        this._addCharacterDetail(characters_container, "h3", this.character.getCharacterClass());

        // Ajout du niveau du personnage
        this._addCharacterDetail(characters_container, "h3", this.character.getLevel());

        // Affichage des équipements du personnage
        this._displayEquipments(characters_container);

        // Ajout du bouton favoris
        this._addFavoriteButton(characters_container);

        this._init();

        console.log('Character ID:', this.character.getId());
        this.listRatings.forEach(rating => {
            console.log('Checking rating for characterId:', rating.characterId);
        });


        console.log(this.listRatings);
        console.log(this.character.getId());
        const rating = this.listRatings.find(rating => rating.getCharacterId() == this.character.getId());
        console.log(rating);

        // ajout du button de modification de note
        const button = document.createElement("div");
        button.className = 'modif-rate';
        const liste = JSON.stringify(this.listRatings);
        button.setAttribute("rates", liste);
        button.setAttribute("change-rate", rating.getId());
        button.textContent = "Modifier";
        container.appendChild(button);

        // Ajout d'un écouteur d'événement sur les boutons de modification de note
        document.querySelectorAll(".modif-rate").forEach(element => {
            element.addEventListener("click", function(event){
                const ratingsString = event.currentTarget.getAttribute("rates");
                const data = JSON.parse(ratingsString);
                const ratings = new Array();
                for (const rating of data) {
                    ratings.push(new Rating(rating.id, rating.characterId, rating.score, rating.comment));
                }

                const ratingId = event.currentTarget.getAttribute("change-rate");
                const ratingDiv = event.currentTarget.parentElement;

                let existingForm = ratingDiv.querySelector(".form-rate");
                if (existingForm) {
                    existingForm.remove(); 
                } else {
                    const changeRate = new ChangeRate(ratings, ratingId);
                    const form = changeRate.afficher();
                    ratingDiv.appendChild(form); 
                }
            });
        });
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
        buttonFav.className = 'button-fav';
        buttonFav.textContent = "Ajouter aux favoris";
        container.appendChild(buttonFav);

        // Listener pour ajouter aux favoris
        buttonFav.addEventListener("click", async () => {
            await setFavorites();
        });
    }
}
