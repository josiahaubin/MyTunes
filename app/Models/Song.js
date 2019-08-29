export default class Song {
    constructor(data) {
        this.title = data.title
    }

    get Template() {
        return this.title
    }
}