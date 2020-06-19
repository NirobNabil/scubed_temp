import express from "express";
import wbctrl from "../../controllers/whiteboard.controller";

const router = express.Router(); // eslint-disable-line new-cap

router
  .route("/")
  /** GET /api/zila - Get information about all Zilas */
  .get(wbctrl.getData);

router
  .route("/:sessionID/:timestamp")
  /** GET /api/zila/:zilaName - Get Zila information */
  .get(wbctrl.getData);

  router
  .route("/:sessionID/")
  /** GET /api/zila/:zilaName - Get Zila information */
  .get(wbctrl.getData);

router
  .route("/set/")
  .post(wbctrl.setData);

export default router;
