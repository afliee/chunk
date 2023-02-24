import { createHash, createHmac } from 'crypto';

const getHash256 = (str) => {
    return createHash('sha256').update(str).digest('hex');
};

const getHmac512 = (str, key) => {
    const hmac = createHmac('sha512', key);
    return hmac.update(Buffer.from(str, 'utf-8')).digest('hex');
};

export { getHash256, getHmac512 };
