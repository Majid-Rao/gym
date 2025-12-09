import express from 'express';
import {generateUserPlan} from '../controllers/detailsController.js';
const router = express.Router();

router.route("/sharing_detail").post(generateUserPlan);

export default router;