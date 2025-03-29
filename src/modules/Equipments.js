

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

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setType(type) {
        this.type = type;
    }

    setOwner(owner) {
        this.owner = owner;
    }


}
