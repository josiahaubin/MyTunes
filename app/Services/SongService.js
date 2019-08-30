import Song from "../Models/Song.js";

// @ts-ignore
let _sandBoxApi = axios.create({
    baseURL: "http://bcw-sandbox.herokuapp.com/api/Josiah/songs"
})

//Private
let _state = {
    songs: [],
    playlistSongs: []
}

//NOTE methods to run when a given property in state changes
let _subscribers = {
    songs: [],
    playlistSongs: []
}

function _setState(propName, data) {
    //NOTE add the data to the state
    _state[propName] = data
    //NOTE run every subscriber function that is watching that data
    _subscribers[propName].forEach(fn => fn());
}

//Public
export default class SongService {
    //NOTE adds the subscriber function to the array based on the property it is watching
    addSubscriber(propName, fn) {
        _subscribers[propName].push(fn)
    }

    get Songs() {
        return _state.songs
    }
    get PlaylistSongs() {
        return _state.playlistSongs.map(s => new Song(s))
    }

    getMusicByQuery(query) {
        var url = 'https://itunes.apple.com/search?callback=?&term=' + query;
        // @ts-ignore
        $.getJSON(url)
            .then(res => {
                let results = res.results.map(rawData => new Song(rawData))
                _setState('songs', results)
            })
            .catch(err => console.log(err))
    }

    getPlaylistSongs() {
        _sandBoxApi.get()
            .then(res => {
                _setState("playlistSongs", res.data.data)
                console.log(res.data.data);

            })
    }

    addSong(id) {
        let song = _state.songs.find(s => s._id == id)

        _sandBoxApi.post('', song)
            .then(res => {
                _state.playlistSongs.push(res.data.data)
                _setState("playlistSongs", _state.playlistSongs)
            })
            .catch(err => {
                console.error(err);

            })
    }

    deleteSong(_id) {

        _sandBoxApi.delete(_id)
            .then(res => {
                this.getPlaylistSongs()
            })
            .catch(err => {
                console.error(err);

            })
    }
}
