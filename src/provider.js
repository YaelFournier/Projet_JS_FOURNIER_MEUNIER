import { Character } from "./modules/Characters.js";
import { Equipment } from "./modules/Equipments.js";
import { Rating } from "./modules/Ratings.js";
import { Favorite } from "./modules/Favorites.js";

export class Provider {
    static loadCharacters(server) {
        fetch( server + "/characters.json" )
            .then(characters => characters.json())
            .then(data => console.log(data));
    }

    static loadEquipments(server) {
        fetch( server + "/equipments.json" )
            .then(equipments => equipments.json())
            .then(data => console.log(data));
    }

    static loadRatings(server) {
        fetch( server + "/ratings.json" )
           .then(ratings => ratings.json())
           .then(data => console.log(data));
    }

    static loadFavorites(server) {
        fetch( server + "/favorites.json" )
           .then(favorites => favorites.json())
           .then(data => console.log(data));
    }

    static createCharacters(data) {
        const characters = [];
        for (const character of data) {
            characters.push(new Character(
                                    character.id,
                                    character.name, 
                                    character.game, 
                                    character.characterClass, 
                                    character.level, 
                                    character.rating, 
                                    character.image, 
                                    character.equipments, 
                                    character.favorites
                                )
                            );
        }
        return characters;
    }

    static createEquipments(data) {
        const equipments = [];
        for (const equipment of data){
            equipments.push(new Equipment(
                                        equipment.id,
                                        equipment.name,
                                        equipment.type,
                                        equipment.description,
                                        equipment.price,
                                        equipment.image
                                    )
                                );
        }
        return equipments;
    }

    static createRatings(data) {
        const ratings = [];
        for (const rating of data){
            ratings.push(new Rating(
                                    rating.id,
                                    rating.characterId,
                                    rating.value
                                )
                            );
        }
        return ratings;
    }

    static createFavorites(data) {
        const favorites = [];
        for (const favorite of data){
            favorites.push(new Favorite(
                                        favorite.id,
                                        favorite.characterId
                                    )
                                );
        }
        return favorites;
    }

}