import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { addClickListener } from "../app.js";
import { setFavorites } from "../app.js";

export class PageFavorites extends InterfaceAffichage {

    constructor(characters){
        super();
        this.characters = characters;
    }

    afficher(){
        const container = document.getElementById("view-container");
        container.innerHTML = "";
        //Affichage des personnages favoris
        for (const character of this.characters){
            console.log(character);
            if (character.getFavorites()){
                const h2 = document.createElement("div");
                h2.className = 'char';
                h2.setAttribute("id-char", "characters/"+character.getId());
                h2.textContent = character.getName();
                container.appendChild(h2);
                const buttonFav = document.createElement("div");
                buttonFav.className = 'button-fav'+character.getId();
                buttonFav.textContent = "Retirer des favoris";
                container.appendChild(buttonFav);
                //Listener pour retirer des favoris 
                document.querySelector(".button-fav"+character.getId()).addEventListener("click", async () => {
                    await setFavorites(character.getId());
                    this.afficher();
                });
            }
        }
        //Listener pour acceder aux details des personnages
        addClickListener(".char", "id-char");
    }

}