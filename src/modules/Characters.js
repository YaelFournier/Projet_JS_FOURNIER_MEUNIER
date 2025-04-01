export class Character {
    constructor(id, name, game, characterClass, level, rating, image, equipments) {
        this.id = id;
        this.name = name;
        this.game = game;
        this.characterClass = characterClass;
        this.level = level;
        this.rating = rating;
        this.image = image;
        this.equipments = equipments;
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

    getImage() {
        return this.image;
    }

    getEquipments() {
        return this.equipments;
    }

    getRating() {
        return this.rating;
    }

}