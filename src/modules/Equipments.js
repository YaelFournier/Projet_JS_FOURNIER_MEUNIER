export class Equipment {
    constructor(id, name, type, image, owner) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.image = image;
        this.owner = owner;
    }

    getId() {
        return this.id;
    }

    getImage() {
        return this.image;
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }

    getOwner() {
        return this.owner;
    }

}
