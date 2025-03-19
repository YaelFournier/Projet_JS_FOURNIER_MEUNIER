export class Character {
    constructor(id, name, game, characterClass, level, rating, image, equipments, favorites) {
        this.id = id;
        this.name = name;
        this.game = game;
        this.characterClass = characterClass;
        this.level = level;
        this.rating = rating;
        this.image = image;
        this.equipments = equipments;
        this.favorites = favorites;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getGame() {
        return this.game;
    }

    getCharacterClass() {
        return this.characterClass;
    }

    getLevel() {
        return this.level;
    }

    getEquipments() {
        return this.equipments;
    }

    getFavorites() {
        return this.favorites;
    }

    setFavorites() {
        this.favorites = !this.favorites;
    }


}
