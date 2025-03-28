import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener } from "../app.js";
import { ChangeRate } from "./ChangeRate.js";
import { Rating } from "../modules/Ratings.js";

export class PageRatings extends InterfaceAffichage {

    constructor(listRatings, characters) {
        super();
        this.listRatings = listRatings;
        this.characters = characters;
    }

    afficher() {
        const container = document.getElementById("view-container");
        container.innerHTML = "";
        for (const rating of this.listRatings) {
            //Création de la div qui contiendra les informations
            const div = document.createElement("div");
            div.className = 'rating-container';
            container.appendChild(div);
            //Affichage du nom du personnage
            const character = this.characters[parseInt(rating.getCharacterId())-1];
            const h2 = document.createElement("div");
            h2.className = 'char';
            h2.setAttribute("id-char", "characters/"+character.getId());
            h2.textContent = character.getName();
            div.appendChild(h2);
            //Affichage de la note
            const h3 = document.createElement("div");
            h3.className = 'rating';
            h3.textContent = rating.getScore();
            div.appendChild(h3);
            // Affichage du commentaire
            const p = document.createElement("div");
            p.className = 'comment';
            p.textContent = rating.getComment();
            div.appendChild(p);
            //Bouton pour modifier la note 
            const button = document.createElement("div");
            button.className = 'modif-rate';
            const liste = JSON.stringify(this.listRatings);
            button.setAttribute("rates", liste);
            button.setAttribute("change-rate", rating.getId());
            button.textContent = "Modifier";
            div.appendChild(button);
        }
        addClickListener(".char", "id-char");

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

}