const express=require("express");
const router=express.Router();
const controller=require('../controler/index');

const multer = require('multer');



const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './assets/');
    },
    filename:function(req, file, cb){
        const crypto=require('crypto');
        const random=crypto.randomBytes(10).toString('hex');
        cb(null,random+"_"+file.originalname);
    }
});
const upload = multer({storage:storage});

router.get('/',controller.content.index);

// user
router.get('/user',controller.userprofile.index)
router.post('/userregister',controller.userregister.registrasi)
// end user

// rute admin
router.get('/admin',controller.admin.index);
router.get('/contenindex',controller.admin.contentindex);
router.post('/media',upload.single(),controller.media.index);
router.get('/contencreate',controller.admin.contentcreate);
router.post('/contentcreatepost',upload.single("thumbnail"),controller.admin.contentcreatepost);
router.get('/contentcreatekategori',controller.admin.contentcreatekategori);
router.post('/contentcreatekategoripost',controller.admin.contentcreatekategoripost);
router.post('/contentcreatekategoriupdate',controller.admin.contentcreatekategoriupdate);
router.get('/contentcreatekategoridelete/:id',controller.admin.contentcreatekategoridelete);
router.get('/filemedia',controller.admin.mediafileindex);
router.post('/filemediapost',upload.single("mediafile"),controller.admin.mediafilepost);
// end rute admin

module.exports=router;