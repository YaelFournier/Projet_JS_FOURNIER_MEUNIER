export class Rating {
    constructor(id, characterId, score, comment) {
        this.id = id;
        this.characterId = characterId;
        this.score = score;
        this.comment = comment;
    }

    getId() {
        return this.id;
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