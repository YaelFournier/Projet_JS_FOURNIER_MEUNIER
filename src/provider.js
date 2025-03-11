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

}