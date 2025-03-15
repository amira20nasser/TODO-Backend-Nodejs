const jwt = require("jsonwebtoken");
require("dotenv").config()

const authentication = (req,res,next) => {
  try{
    const token = req.cookies.token;    
    console.log("authenticating....");
    console.log(token);
    
    if (token) {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decodedToken);
        req.userId  = decodedToken.userId 
        console.log("DONE AUTHENTICATED");
        console.log(req.userId);            
      } else {
        return res.status(401).send({
          status: 401,
          msg: "UnAuthorized access",
        });
      }
      next()
    }catch(err){
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}
module.exports = {authentication};
