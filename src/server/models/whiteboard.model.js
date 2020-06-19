import mongoose from "mongoose";

/**
 * Zila Schema
 */
const WhiteBoardScheme = new mongoose.Schema(
  {
    sessionID: {
      type: Number,
      required:true,
    },
    timestamp: {
      type: Date,
      required: true,
      // default: new Date(),
    },
    data: {
      type: String,
      required: true,
    }
  }
  // {},//Pulls the schema from the collection
  // { collection: "WhiteBoardData" }
);
 
export default mongoose.model("whiteboard_data", WhiteBoardScheme);
