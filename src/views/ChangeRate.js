import { InterfaceAffichage } from "./InterfaceAffichage.js";
import { Provider } from "../provider.js";
import { SERVER } from "../config.js";

export class ChangeRate extends InterfaceAffichage {
    constructor(ratings, ratingId){
        super();
        this.ratings = ratings;
        this.rating = this.ratings.find(rating => rating.getId() == ratingId);
    }

    afficher() {
        const form = document.createElement("form");
        form.classList.add("form-rate");
    
        const label = document.createElement("label");
        label.setAttribute("for", "rate");
        label.textContent = "Note";
        form.appendChild(label);
    
        const input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("name", "rate");
        input.setAttribute("min", "0");
        input.setAttribute("max", "10");
        input.setAttribute("step", "0.1");
        input.setAttribute("value", this.rating.getScore())
        form.appendChild(input);

        const inputComment = document.createElement("textarea");
        inputComment.setAttribute("id", "new-comment");
        inputComment.setAttribute("name", "comment");
        inputComment.setAttribute("placeholder", this.rating.getComment());
        inputComment.value = this.rating.getComment();
        inputComment.setAttribute("rows", "4");
        inputComment.setAttribute("cols", "50");
        form.appendChild(inputComment);
    
        const button = document.createElement("button");
        button.setAttribute("type", "submit");
        button.textContent = "Valider";
        form.appendChild(button);
    
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            console.log(this.rating)
            
            this.rating.setScore(form.rate.value);
            this.rating.setComment(form.comment.value);
            
            const ratingDiv = event.currentTarget.closest('.rating-container'); 
            const ratingElement = ratingDiv.querySelector('.rating');
            const commentElement = ratingDiv.querySelector('.comment');
            ratingElement.textContent = form.rate.value;
            commentElement.textContent = form.comment.value;
            
            Provider.setRating(SERVER, this.rating.getId(), form.rate.value, form.comment.value)
                .then(response => {
                    form.remove();
                })
        });
        
        return form; 
    }
    
}