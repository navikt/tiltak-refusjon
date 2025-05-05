import { Request, Response, NextFunction } from 'express';

import { server } from './config';

export default () => (request: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', server().host);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With');
    return next();
};
