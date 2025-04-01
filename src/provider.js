import { Character } from "./modules/Characters.js";
import { Equipment } from "./modules/Equipments.js";
import { Rating } from "./modules/Ratings.js";

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

    static loadCharactersById(server, id) {
        return fetch( server + "/characters/" + id )
            .then(character => {
                if (!character.ok){
                    throw new Error("Erreur lors de la récupération du personnage");
                }
                return character.json();
            })
            .then(data => {
                return data;
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

    static loadEquipmentsById(server, id) {
        return fetch( server + "/equipments/" + id )
            .then(equipment => {
                if (!equipment.ok){
                    throw new Error("Erreur lors de la récupération de l'équipement");
                }
                return equipment.json();
            })
            .then(data => {
                return data;
            });
    }

    static async loadRatingById(server, character_id) {
        const response = await fetch(server + "/ratings/" + character_id);

        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération du rating (${response.status} ${response.statusText})`);
        }

        const data = await response.json();     
        return Array.isArray(data) ? data : [data];
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

    static async loadEquipmentsForCharacter(server, characterId) {
        try {
            // Récupérer tous les équipements
            const equipmentsResponse = await fetch(`${server}/equipments`);
            if (!equipmentsResponse.ok) {
                throw new Error("Erreur lors de la récupération des équipements");
            }
            const equipments = await equipmentsResponse.json();
            console.log("Equipments:", equipments);  // Vérifier les équipements récupérés

            // Récupérer les relations entre les équipements et les personnages
            const ownershipResponse = await fetch(`${server}/equipment_ownership`);
            if (!ownershipResponse.ok) {
                throw new Error("Erreur lors de la récupération des relations équipement-personnage");
            }
            const ownerships = await ownershipResponse.json();
            console.log("Ownerships:", ownerships);  // Vérifier les relations récupérées

            // Filtrer les équipements associés au characterId donné
            const characterEquipments = equipments.filter(equipment =>
                ownerships.some(ownership =>
                    // Vérifier si l'équipement est générique ou s'il appartient au personnage
                    (Number(ownership.equipment_id) === Number(equipment.id) && Number(ownership.character_id) === Number(characterId)) ||
                    (equipment.isGeneric && Number(ownership.equipment_id) === Number(equipment.id))
                )
            );

            console.log("Filtered Equipments:", characterEquipments);  // Vérifier les équipements filtrés

            return characterEquipments;
        } catch (error) {
            console.error("Erreur:", error);
            return [];  // Retourner un tableau vide en cas d'erreur
        }
    }






    static createCharacters(data) {
        const characters = [];
        for (const character of data) {
            characters.push(new Character(
                                    character.id,
                                    character.name, 
                                    character.game, 
                                    character.class, 
                                    character.level, 
                                    character.rating, 
                                    character.image, 
                                    character.equipments
                                )
                            );
        }
        return characters;
    }

    static createCharacterById(data) {
        const character = new Character(data.id,
                                        data.name,
                                        data.game,
                                        data.class,
                                        data.level,
                                        data.rating,
                                        data.image,
                                        data.equipments
                                    );
        return character;
    }

    static createEquipments(data) {
        const equipments = [];
        for (const equipment of data){
            equipments.push(new Equipment(
                                        equipment.id,
                                        equipment.name,
                                        equipment.type,
                                        equipment.image,
                                        equipment.owner,
                                        equipment.isGeneric
                                    )
                                );
        }
        return equipments;
    }

    static createEquipmentById(data) {
        const equipment = new Equipment(data.id,
                                        data.name,
                                        data.type,
                                        data.image,
                                        data.owner,
                                        data.isGeneric
                                    );
        return equipment;
    }

    static createRatings(data) {
        const ratings = [];
        for (const rating of data){
            ratings.push(new Rating(
                                    rating.id,
                                    rating.characterId,
                                    rating.score,
                                    rating.comment,
                                    rating.user
                                )
                            );
        }
        return ratings;
    }

    static async setFavoritesTrueById(server, characterId) {
        const rep =  await fetch(`${server}/characters/${characterId}`, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ favorites: true })
        });
    }

    static async setFavoritesFalseById(server, characterId) {
        const rep = await fetch(`${server}/characters/${characterId}`, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ favorites: false })
        });
    }

    static async setRating(server, ratingId, score, comment) {
        const characId = await fetch(`${server}/ratings/${ratingId}`)
            .then(response => response.json())
            .then(data => data.characterId);
        const rep = await fetch(`${server}/ratings/${ratingId}`, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({score: score, comment: comment})
        });
        const charac = await fetch(`${server}/characters/${characId}`, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ rating: score })
        });
    }

}