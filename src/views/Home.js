import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { sendRequest } from "../app.js";
export class Home extends InterfaceAffichage {

    constructor(listCharacter) {
        super();
        this.listCharacter = listCharacter;
    }

    afficher() {
        const body = document.body;
        body.innerHTML = `<div class="container">
                            <div class="card" data-category="characters">Characters</div>
                            <div class="card" data-category="equipments">Equipments</div>
                            <div class="card" data-category="ratings">Ratings</div>
                            <div class="card" data-category="favorites">Favorites</div>
                          </div>`;
      document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", function() {
            sendRequest(this.getAttribute("data-category"));
        });
      });
                    
    }
}