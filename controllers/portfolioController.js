const Portfolio = require("../models/portfolio");


const getrisktolerance = async (req,res)=>{

 const  {risktolerance} = req.params;

 try{

  const data = await Portfolio.findOne({ riskTolerance: risktolerance });
  res.status(200).json({data});
 }
 catch(err){

res.status(500).json(err)
 }
 






}


module.exports = getrisktolerance;
