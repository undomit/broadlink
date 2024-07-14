'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {fileURLToPath} from 'url';
import broadlinkRoutes from "./routes/broadlinkRoutes.js";
import {cacheDiscoverDataMiddleware} from './middleware/cacheDiscoverDataMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.use(cacheDiscoverDataMiddleware);
app.use(broadlinkRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(3000, () => console.log('Listening on port 3000...'));