import WhiteBoard from "../models/whiteboard.model";
import APIError from "../helpers/APIError";
import httpStatus from "http-status";

/**
 * Get WhiteBoard data by sessionID or timestamp or nothing
 * @returns {} JS Object containing information about the whiteboard
 */
async function getData(req, res) {
  let query = {};
  if(req.params.sessionID) query.sessionID = req.body.sessionID;
  if(req.params.timestamp) query.timestamp = new Date(parseInt(req.body.timestamp));
  try{
    const result = await WhiteBoard.find(query).lean().exec();
    if(result == null){ 
      const error = new APIError(
        "doesn't exist",
        httpStatus.NOT_FOUND
      );
      return res.json(error);
    }else{
      return res.json(result.map((obj) => {
        return {
          "data": obj.data,
          "timestamp": obj.timestamp,
          "sessionID": obj.sessionID
        }
      }));
    }
  }catch(e){
    const error = new APIError(
      e.message,
      httpStatus.INTERNAL_SERVER_ERROR
    );
    return res.json(error);
  }         
}

/**
 * Set WhiteBoard data by sessionID and/or timestamp
 * @returns {} JS Object containing the database entry
 */
async function setData(req, res){
  const entry = new WhiteBoard({
    'data': req.body.data, 
    'sessionID': req.body.sessionID,
    'timestamp': req.body.timestamp,
  });
  try{
    const newEntry = await entry.save((err) => {
      if(err) {
        const error = new APIError(
          "couldn't save to database",
          httpStatus.INTERNAL_SERVER_ERROR
        );
        return res.json(error);
      }
    });
    res.status(200).json( {'entry': entry} );
  }catch(err){
    res.status(500).json( {'err': err.message} )
  }
}

export default { getData, setData };
