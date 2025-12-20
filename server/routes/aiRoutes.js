import express from 'express';
import {generateUserPlan,fetchAllPlans,fetchOnePlan,deleteUserPlan} from '../controllers/detailsController.js';
const router = express.Router();

router.route("/sharing_detail").post(generateUserPlan);
router.route("/fetchAllPlans").get(fetchAllPlans);
router.route("/fetchOnePlan/:userId").get(fetchOnePlan);
router.route("/deleteUserPlan/:id").delete(deleteUserPlan);


export default router;