import express from 'express';
import { GetInfo } from '../controllers';

const router = express.Router();

router.route('').get(GetInfo.getHTML);

module.exports = router;
