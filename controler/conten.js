const db=require("../models")
const fs = require('fs');


const controler={};

controler.index=async (req,res,nex)=>{
    res.render('layout/index');
}

module.exports=controler;