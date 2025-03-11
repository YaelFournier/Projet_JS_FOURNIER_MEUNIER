class Provider {
    static loadCharacters(server) {
        fetch( server + "/characters.json" )
            .then(characters => characters.json())
    }

    static loadEquipments(server) {
        fetch( server + "/equipments.json" )
            .then(equipments => equipments.json())
    }

    static loadRatings(server) {
        fetch( server + "/ratings.json" )
           .then(ratings => ratings.json())
    }

    static loadFavorites(server) {
        fetch( server + "/favorites.json" )
           .then(favorites => favorites.json())
    }

}