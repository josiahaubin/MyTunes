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

function _drawPlaylistSongs() {
    let songElem = document.getElementById('playlist-songs')
    let songs = _songService.PlaylistSongs
    let template = '<ul>'
    songs.forEach(s => {
        template += s.Template + s.deleteButtonTemplate
    })
    songElem.innerHTML = template + '</ul>'
}

//Public
export default class SongController {
    constructor() {
        //NOTE Register all subscribers
        _songService.addSubscriber("songs", _drawItunesSongs)
        _songService.addSubscriber("playlistSongs", _drawPlaylistSongs)

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

    deleteSong(id) {
        _songService.deleteSong(id)
    }
}