import { InterfaceAffichage } from "./InterfaceAffichage.js";

export class DetailsCharacters extends InterfaceAffichage {

    constructor(character, equipments){
        super();
        this.character = character;
        this.equipments = equipments;
    }

    afficher(){
        const container = document.getElementById("view-container");
        container.innerHTML = "";
        //Affichage des détails du personnage
        //Son nom
        const h2 = document.createElement("h2");
        h2.textContent = this.character.getName();
        container.appendChild(h2);
        //Son jeu de provenance
        const game = document.createElement("h3");
        game.textContent = this.character.getGame();
        container.appendChild(game);
        //Sa classe
        const characterClass = document.createElement("h3");
        characterClass.textContent = this.character.getCharacterClass();
        container.appendChild(characterClass);
        //Son niveau
        const level = document.createElement("h3");
        level.textContent = this.character.getLevel();
        container.appendChild(level);
        //Affichage des équipements du personnage
        for (const equipment of this.equipments){
            const h3 = document.createElement("div");
            h3.className = 'equip';
            h3.setAttribute("id-equip", "equipments/"+equipment.getId());
            h3.textContent = equipment.getName();
            container.appendChild(h3);
        }

        addClickListener(".equip", "id-equip");

        //TODO : Creer un button pour ajouter le personnage aux favoris
    }
}