let controller = {}
const db = require("../models")
const nodemailer = require('nodemailer');
const {Mail} = require('../module/mail');

controller.registrasi = async(req,res)=>{
    let name = req.body.name
    let email = req.body.email
    let ket = req.body.ket
    let password = req.body.password
    
    try {
        const sendemail = new Mail()
        let send=sendemail.auth('1231',email)
        console.log(send)
        res.redirect('/')
        // const reg = await db.User.create({
        //     name:name,
        //     email:email,
        //     password:password,
        //     // imageprofile:
        //     pekrjaan_jabatan:ket
        // })
        // res.status(200)(
        //     // req.flash('suksesmessage', ' sucess up kategori'),
        //     res.redirect('/user')
        // )
    } catch (error) {
        res.redirect('/')
    }
    
}

module.exports = controller