import { InterfaceAffichage } from "./InterfaceAffichage.js";

export class PageCharacters extends InterfaceAffichage {

    constructor(listCharacter) {
        super();
        this.listCharacter = listCharacter;
    }

    afficher() {
        const body = document.querySelector('body');

        const container = document.createElement('div');
        container.classList.add('container-character');
        body.appendChild(container);
        container.id = "container-character";
        for (const character of this.listCharacter) {
            const h6 = document.createElement("h6");
            h6.textContent = character.getName();
            container.appendChild(h6);
        }
    }
}