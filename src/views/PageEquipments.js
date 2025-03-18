import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener } from "../app.js";

export class PageEquipments extends InterfaceAffichage {
    constructor(listEquipment) {
        super();
        this.listEquipment = listEquipment;
    }

    afficher() {
        const container = document.getElementById("container");
        container.innerHTML = "";
        for (const equipment of this.listEquipment) {
            const h3 = document.createElement("div");
            h3.className = 'equip';
            h3.id = equipment.id;
            h3.textContent = equipment.getName();
            container.appendChild(h3);
        }
        addClickListener(".equip", "equipments/" + this.getAttribute("id"));
    }
}