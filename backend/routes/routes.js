import express from "express";
import {
  allJobs,
  newJob,
  updateJob,
  deleteJob,
  applyJob,
} from "../controllers/jobs.js";

import { newUser, loginUser, logoutUser } from "../controllers/users.js";

import { authMiddleware, roleMiddleware } from "../middlewares/auth.js";

// instantiate express router
const router = express.Router();

// Route to get all available jobs
router
  .route("/jobs")
  .get(allJobs)
  .post(authMiddleware, roleMiddleware("employer"), newJob);

//Route to apply/update/delete a specific job by its id
router
  .route("/job/:id")
  .get(authMiddleware, roleMiddleware("employee"), applyJob)
  .put(authMiddleware, roleMiddleware("employer"), updateJob)
  .delete(authMiddleware, roleMiddleware("employer"), deleteJob);

// Route to register a user
router.route("/user/register").post(newUser);

// Route to login a user
router.route("/user/login").post(loginUser);

// Route to logout a user
router.route("/user/logout").get(authMiddleware, logoutUser);

export default router;
