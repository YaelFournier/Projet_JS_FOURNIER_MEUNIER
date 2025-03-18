import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener } from "../app.js";

export class PageCharacters extends InterfaceAffichage {

    constructor(listCharacter) {
        super();
        this.listCharacter = listCharacter;
    }

    afficher() {
        const container = document.getElementById("view-container");
        container.innerHTML = "";
        for (const character of this.listCharacter) {
            const h3 = document.createElement("div");
            h3.className = 'charac';
            h3.setAttribute("id-charac", character.getId());
            h3.textContent = character.getName();
            container.appendChild(h3);
        }
        addClickListener(".charac", "characters/" + document.getAttribute("id-charac"));
    }
}