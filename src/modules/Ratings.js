

export class Rating {
    constructor(id, characterId, user, score, comment) {
        this.id = id;
        this.characterId = characterId;
        this.user = user;
        this.score = score;
        this.comment = comment;
    }

    getId() {
        return this.id;
    }

    getCharacterId() {
        return this.characterId;
    }

    getUser() {
        return this.user;
    }

    getScore() {
        return this.score;
    }

    getComment() {
        return this.comment;
    }

    setId(id) {
        this.id = id;
    }

    setCharacterId(characterId) {
        this.characterId = characterId;
    }

    setUser(user) {
        this.user = user;
    }

    setScore(score) {
        this.score = score;
    }

    setComment(comment) {
        this.comment = comment;
    }
}