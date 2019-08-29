import SongService from "../Services/SongService.js";

//Private
let _songService = new SongService()

function _drawItunesSongs() {
    let songElem = document.getElementById('songs')
    let songs = _songService.Songs
    let template = '<ul>'
    songs.forEach(s => {
        template += s.Template + s.addButtonTemplate
    })
    songElem.innerHTML = template + '</ul>'
}

//Public
export default class SongController {
    constructor() {
        //NOTE Register all subscribers
        _songService.addSubscriber("songs", _drawItunesSongs)

        //NOTE Retrieve data
        //_songService.getMusicByQuery()
        _songService.getPlaylistSongs()
    }

    search(e) {
        e.preventDefault();
        _songService.getMusicByQuery(e.target.query.value)
    }

    addSong(id) {
        _songService.addSong(id)
    }
}