import express from "express";
import whiteboardRoutes from "./whiteboard/whiteboard";
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));

// define api routes
router.use("/whiteboard", whiteboardRoutes);

export default router;
