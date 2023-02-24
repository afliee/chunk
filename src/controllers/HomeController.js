class HomeController {
    constructor() {
        this.name = 'home';
    }

    index(req, res) {
        res.render('home');
    }
}

module.exports = new HomeController();
