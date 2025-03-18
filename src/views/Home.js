import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener } from "../app.js";
export class Home extends InterfaceAffichage {

    constructor(listCharacter) {
        super();
        this.listCharacter = listCharacter;
    }

    afficher() {
        const body = document.body;
        body.innerHTML = `<div id="container">
                            <div class="card" data-category="characters">Characters</div>
                            <div class="card" data-category="equipments">Equipments</div>
                            <div class="card" data-category="ratings">Ratings</div>
                            <div class="card" data-category="favorites">Favorites</div>
                          </div>`;
      addClickListener(".card", this.getAttribute("data-category")); 
    }
}