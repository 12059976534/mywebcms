const content=require('./conten');
const admin=require('./admin');
const media=require('./media');
const userprofile=require('./userprofile');
const userregister=require('./userregister');

const controller={};

controller.content=content;
controller.admin=admin;
controller.media=media;
controller.userprofile=userprofile;
controller.userregister=userregister;

module.exports=controller;