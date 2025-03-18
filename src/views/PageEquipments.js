import { InterfaceAffichage } from "./InterfaceAffichage.js";

export class PageEquipments extends InterfaceAffichage {
    constructor(listEquipment) {
        super();
        this.listEquipment = listEquipment;
    }

    afficher() {
        const container = document.getElementById("container");
        container.innerHTML = "";
        for (const equipment of this.listEquipment) {
            const h3 = document.createElement("h3");
            h3.textContent = equipment.getName();
            container.appendChild(h3);
        }
    }
}