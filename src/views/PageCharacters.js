import { InterfaceAffichage } from "./InterfaceAffichage.js";

export class PageCharacters extends InterfaceAffichage {

    constructor(listCharacter) {
        super();
        this.listCharacter = listCharacter;
    }

    afficher() {
        console.log(document);
        const container = document.createElement("div");
        container.classList.add("container-character");
        container.id = "container-character";
        document.app.appendChild(container);
        for (const character of this.listCharacter) {
            const h6 = document.createElement("h6");
            h6.textContent = character.getName();
            container.appendChild(h6);
        }

    }
}