


export class PageCharacters extends InterfaceAffichage {

    constructor(listCharacter) {
        super();
        this.listCharacter = listCharacter;
    }

    afficher() {
        const container = document.querySelector('.container-character');
        for (const character of this.listCharacter) {
            const h6 = document.createElement("h6");
            h6.textContent = character.getName();
            container.appendChild(h6);
        }

    }
}