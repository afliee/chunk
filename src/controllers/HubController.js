import { getHubHome } from '../modules/client.js';

class hubController {
    constructor() {
        this.name = 'hub';
    }

    async index(req, res) {
        const hubHome = await getHubHome();
        res.status(200).json(hubHome);
    }
}

module.exports = new hubController();
