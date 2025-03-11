export class PageCharacters extends InterfaceAffichage {

    constructor(listCharacter) {
        super();
        this.listCharacter = listCharacter;
    }

    afficher() {
        const container = document.createElement("div");
        container.classList.add("container-character");
        container.id = "container-character";
        document.body.appendChild(container);
        for (const character of this.listCharacter) {
            const h6 = document.createElement("h6");
            h6.textContent = character.getName();
            container.appendChild(h6);
        }

    }
}