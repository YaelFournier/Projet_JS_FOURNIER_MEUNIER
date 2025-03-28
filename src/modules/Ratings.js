export class Rating {
    constructor(id, characterId, score, comment, user) {
        this.id = id;
        this.characterId = characterId;
        this.score = score;
        this.user = user;
        this.comment = comment;
    }

    getId() {
        return this.id;
    }

    getAuthor() {
        return this.user;
    }

    getCharacterId() {
        return this.characterId;
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

    setScore(score) {
        this.score = score;
    }

    setComment(comment) {
        this.comment = comment;
    }
}