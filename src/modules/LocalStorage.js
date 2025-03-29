export class LocalStorage {
    static addFavorites(itemId, type) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || { characters: [], equipments: [] };
        if (!favorites[type].includes(itemId)) {
            favorites[type].push(itemId);
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
        console.log("added");
    }

    static getFavorites(type) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || { characters: [], equipments: [] };
        return favorites[type];
    }

    static removeFavorites(itemId, type) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || { characters: [], equipments: [] };
        if (favorites[type].includes(itemId)) {
            favorites[type] = favorites[type].filter(id => id != itemId);
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
        console.log("removed");
    }
}