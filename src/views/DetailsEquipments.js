import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener } from "../app.js";

export class DetailsEquipments extends InterfaceAffichage {

    constructor(equipment, owner){
        super();
        this.equipment = equipment;
        this.owner = owner;
    }

    afficher(){
        const container = document.getElementById("view-container");
        container.innerHTML = "";
        //Affichage des détails de l'équipement
        //Son nom
        const h2 = document.createElement("h2");
        h2.textContent = this.equipment.getName();
        container.appendChild(h2);
        //Son type
        const type = document.createElement("h3");
        type.textContent = this.equipment.getType();
        container.appendChild(type);
        //Affichage du nom du propriétaire de l'équipement
        const owner = document.createElement("div");
        owner.className = 'owner';
        owner.setAttribute("id-owner", "characters/"+this.owner.getId());
        owner.textContent = this.owner.getName();
        container.appendChild(owner);

        addClickListener(".owner", "id-owner");

        //TODO : Creer un button pour ajouter l'équipement aux favoris
    }

}