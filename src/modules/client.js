import axios from 'axios';
import { getHash256, getHmac512 } from './encrypt.js';

const ZING_MP3_API_URL = 'https://zingmp3.vn/';
const VERSION = '1.8.34';
const CTIME = String(Math.floor(Date.now() / 1000));
const SECRET_KEY = 'acOrvUS15XRW2o9JksiK1KgQ6Vbds8ZW';
const API_KEY = 'X5BM3w8N7MKozC0B85o4KMlzLZKhV00y';

const hashParamNoId = (path) => {
    return getHmac512(
        path + getHash256(`ctime=${CTIME}version=${VERSION}`),
        SECRET_KEY
    );
};

const hashParam = (path, id) => {
    return getHmac512(
        path + getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`),
        SECRET_KEY
    );
};

const hashHubHome = (path) => {
    return getHmac512(
        path + getHash256(`ctime=${CTIME}version=${VERSION}`),
        SECRET_KEY
    );
};

const hashHub = (path, id, sig) => {
    return getHmac512(
        path + getHash256(`id=${id}&ctime=${CTIME}&version=${VERSION}`),
        SECRET_KEY
    );
};
const getCookie = () => {
    return new Promise((resolve, rejects) => {
        axios
            .get(`${ZING_MP3_API_URL}`)
            .then((res) => {
                // TODO: Skip Error Object is possibly 'undefined'
                if (res.headers['set-cookie']) {
                    res.headers['set-cookie'].map((element, index) => {
                        if (index == 1) {
                            resolve(element); // return cookie
                        }
                    });
                }
            })
            .catch((err) => {
                rejects(err); // return error value if any
            });
    });
};

const requestZingMp3 = (path, qs) => {
    return new Promise((resolve, rejects) => {
        // Config axios request default URL "https://zingmp3.vn"
        const client = axios.create({
            baseURL: `${ZING_MP3_API_URL}`,
        });

        client.interceptors.response.use((res) => res.data); // setting axios response data

        getCookie()
            .then((cookie) => {
                // request
                client
                    .get(path, {
                        headers: {
                            Cookie: `${cookie}`,
                        },
                        params: {
                            ...qs,
                            ctime: CTIME,
                            version: VERSION,
                            apiKey: API_KEY,
                        },
                    })
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        rejects(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    });
};

const getHubHome = () => {
    return new Promise((resolve, rejects) => {
        const path = '/api/v2/page/get/hub-home';
        const sig = hashHubHome(path);
        requestZingMp3(path, {
            sig: sig,
        })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                rejects(err);
            });
    });
};

export { getHubHome };
