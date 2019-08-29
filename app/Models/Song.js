export default class Song {
    constructor(data) {
        this._id = data.trackId || data._id
        this.title = data.trackName || data.title
        this.albumArt = data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300")
        this.artist = data.artistName || data.artist
        this.album = data.collectionName || data.album
        this.price = data.trackPrice || data.price
        this.preview = data.previewUrl || data.preview
    }


    get Template() {
        return `
            <div class="card">
                <img class="card-img-top " src="${this.albumArt}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${this.title}</h5>
                    <p class="card-text">${this.album} price: ${this.price}</p>
                    <audio controls src="${this.preview}"></audio>
                </div>
            
        `
    }

    get addButtonTemplate() {
        return `<button class="btn btn-success w-25 mx-auto" onclick="app.controllers.songController.addSong('${this._id}')"><i class="fas fa-plus"></i> Add Song</button></div>`
    }
}