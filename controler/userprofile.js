let controller = {}
const db = require("../models")

controller.index = (eq,res)=>{
    try {
        res.render('layout/userprofile/index');
    } catch (error) {
        
    }
}

module.exports = controller