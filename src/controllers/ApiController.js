class ApiController {
    constructor() {}

    async index(req, res) {
        res.status(404).json({ message: 'Not found' });
    }
}
module.exports = new ApiController();
