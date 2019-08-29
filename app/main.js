import SongController from "./Controllers/SongController.js";


class App {
    constructor() {
        this.controllers = {
            songController: new SongController()
        }
    }
}

window['app'] = new App()