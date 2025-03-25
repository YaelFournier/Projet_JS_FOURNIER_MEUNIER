import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener } from "../app.js";

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
            //Affichage du nom du personnage
            const character = this.characters[parseInt(rating.getCharacterId())-1];
            const h2 = document.createElement("div");
            h2.className = 'char';
            h2.setAttribute("id-char", "characters/"+character.getId());
            h2.textContent = character.getName();
            container.appendChild(h2);
            //Affichage de la note
            const h3 = document.createElement("div");
            console.log(rating);
            h3.className = 'rating';
            h3.textContent = rating.getScore();
            container.appendChild(h3);
            // Affichage du commentaire
            const p = document.createElement("div");
            p.className = 'comment';
            p.textContent = rating.getComment();
            container.appendChild(p);
        }
        addClickListener(".char", "id-char");
    }

}