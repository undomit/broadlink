import {Router} from 'express';
import { getDiscover } from '../controllers/broadlink/getDiscover.js';
import { getLearn } from '../controllers/broadlink/getLearn.js';
import { postIr } from '../controllers/broadlink/postIr.js';
import { cacheDiscoverDataMiddleware } from '../middleware/cacheDiscoverDataMiddleware.js';

const router = Router();

router.get('/discover', getDiscover);
router.get('/learn', getLearn);
router.post('/ir', cacheDiscoverDataMiddleware, postIr);

export default router;
