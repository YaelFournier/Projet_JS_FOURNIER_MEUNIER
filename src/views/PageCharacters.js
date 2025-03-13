import { InterfaceAffichage } from "./InterfaceAffichage.js";

export class PageCharacters extends InterfaceAffichage {

    constructor(listCharacter) {
        super();
        this.listCharacter = listCharacter;
    }

    afficher() {
        const body = document.body;
        const container = document.createElement('div');
        container.classList.add('container-character');
        body.appendChild(container);
        container.id = "container-character";
        for (const character of this.listCharacter) {
            const h3 = document.createElement("h3");
            h3.textContent = character.getName();
            container.appendChild(h3);
        }
    }
}