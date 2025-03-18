import { Character } from "./modules/Characters.js";
import { Equipment } from "./modules/Equipments.js";
import { Rating } from "./modules/Ratings.js";
import { Favorite } from "./modules/Favorites.js";

export class Provider {
    static loadCharacters(server) {
        return fetch( server + "/characters" )
            .then(reponse => {
                if (!reponse.ok){
                    throw new Error("Erreur lors de la récupération des personnages");
                }
                return reponse.json();
            })
            .then(response => {
                return response;
            });
    }

    static loadEquipments(server) {
        return fetch( server + "/equipments" )
            .then(equipments => {
                if (!equipments.ok){
                    throw new Error("Erreur lors de la récupération des équipements");
                }
                return equipments.json();
            })
            .then(data => {
                return data;
            });
    }

    static loadRatings(server) {
        return fetch( server + "/ratings" )
            .then(ratings => {
               if (!ratings.ok){
                    throw new Error("Erreur lors de la récupération des évaluations");
                }
                return ratings.json();
            })
            .then(data => {
                return data;
            });
    }

    static loadFavorites(server) {
        return fetch( server + "/favorites" )
            .then(favorites => {
                if (!favorites.ok){
                    throw new Error("Erreur lors de la récupération des favoris");
                }
                return favorites.json();
            })
            .then(data => {
                return data;
            });
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