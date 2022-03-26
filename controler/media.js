let controller={}
// const db=require('../models');

controller.index= async (req,res,nex)=>{
    let host=req.protocol+'://'+req.header('host')
    // let create=db.Media.create({
    //     url:host+"/"+req.file.path
    // })
    console.log(host+"/"+req.file.path);
    res.status(201).json({
       "urls":host+"/"+req.file.path
    }) 

}

module.exports=controller;