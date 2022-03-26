/*
Copyright (c) 2021, ANDRI WAHYU ANUGRAH , MIT License
*/
const db = require("../models")
const fs = require('fs');
const sharp = require('sharp');
let controller = {}
const path = require('path');
// const { options } = require("../app");
var sizeOf = require('image-size');


controller.index = async (req, res, nex) => {
    let host = req.protocol + '://' + req.header('host')
    res.render('layout/admin/index', { host: host});
}

// admin control
controller.adminindex = async (req, res) => {
    res.render('layout/admin/index')
}
controller.contentindex = async (req, res) => {
    let conten = await db.Content.findAll({
        include: 'kategori'
    })
    
    res.render('layout/admin/content/index',{data:conten})
}
controller.contentcreatekategori = async (req, res) => {
    let data = await db.Contentkategori.findAll({
        order: [['id', 'desc']]
    })
    let suksesmessage = req.flash("suksesmessage")
    let erormesage = req.flash("erormessage")
    let suksesmessageup = req.flash("suksesmessageup")
    let erormessageup = req.flash("erormessageup")
    let erormessageupkategoriname = req.flash("erormessageupkategoriname")
    let suksesmessagedelete = req.flash("suksesmessagedelete")
    res.render('layout/admin/content/createkategori', {
        data: data,
        erormesage: erormesage,
        suksesmessage: suksesmessage,
        suksesmessageup: suksesmessageup,
        erormessageup: erormessageup,
        erormessageupkategoriname: erormessageupkategoriname,
        suksesmessagedelete: suksesmessagedelete
    })
}
controller.contentcreatekategoripost = async (req, res) => {
    console.log(req.body.kategoriname)
    try {
        let data = req.body.kategoriname
        let create = await db.Contentkategori.create({
            kategoriname: data
        })
        console.log(res.statusCode)
        res.status(200)(
            req.flash('suksesmessage', ' sucess up kategori'),
            res.redirect('/contentcreatekategori')
        )
    } catch (error) {
        req.flash('erormessage', `${error.message}, maybe ${req.body.kategoriname} already exists`),
            res.redirect('/contentcreatekategori')
        // console.log("tray eror proses")
        // console.log(res.statusCode)
        // res.json({
        //     error:{
        //         message:error.message,
        //         status:error.status
        //     }
        // })
    }
}
controller.contentcreatekategoriupdate = async (req, res) => {
    console.log(req.body.kategoriname)
    console.log(req.body.idvalue)
    try {
        let kategoriupdate = await db.Contentkategori.update({
            kategoriname: req.body.kategoriname
        }, {
            where: {
                id: req.body.idvalue
            }
        })
        res.status(200)(
            req.flash('suksesmessageup', req.body.idvalue),
            res.redirect('/contentcreatekategori')
        )
    } catch (error) {
        req.flash('erormessageup', req.body.idvalue),
            req.flash('erormessageupkategoriname', req.body.kategoriname),
            res.redirect('/contentcreatekategori')
        //  res.json({
        //     error:{
        //         message:error.message,
        //         status:error.status
        //     }
        // })
    }

}

controller.contentcreatekategoridelete = async (req, res) => {
    console.log(req.params.id)
    let getdata = await db.Contentkategori.findOne({
        where: {
            id: req.params.id
        }
    })
    console.log(getdata)
    let del = await db.Contentkategori.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200)(
        req.flash('suksesmessagedelete', `${getdata.kategoriname} removed succcess`),
        res.redirect('/contentcreatekategori')
    )
}

controller.contentcreate = async (req, res) => {
    let kategori = await db.Contentkategori.findAll(
       { include:['content']}
    )

    let conten = await db.Content.findAll({
        // include: 'kategori'
    })
    // res.status(200).json({
    //     message:"get method mahasiswa",
    //     data:kategori
    // });
    res.render('layout/admin/content/create',{kategori:kategori})
}
controller.contentcreatepost = async (req, res) => {
    try {

        let title = req.body.title
        let deskripsi = req.body.deskripsi
        let thumbnail = req.file.path
        let kategori = req.body.kategori

        console.log(title)
        console.log(deskripsi)
        console.log(thumbnail)
        console.log(kategori)
        console.log(typeof(kategori))

        let direcimagefilter = path.join('compres', 'artikelthumbnail', new Date().getTime() + ".jpeg");
        let dimensi = await sizeOf(req.file.path);
        console.log("dimensi gambar=" + dimensi)
        let fixtwidth = 100
        let tinggi = dimensi.height
        let lebar = dimensi.width

        const valuenewhight = () => {
            if (lebar > fixtwidth) {
                let min = lebar - fixtwidth
                let persen = min / lebar * 100
                let persenditinggi = tinggi * persen / 100
                let tinggi_baru = tinggi - persenditinggi
                return tinggi_baru
            } else if (lebar < fixtwidth) {
                let min = fixtwidth - lebar
                let persen = min / lebar * 100
                let persenditinggi = tinggi * persen / 100
                let tinggi_baru = tinggi + persenditinggi
                return tinggi_baru
            } else {
                return fixtwidth
            }
        }
        let valuenewhight_new = parseInt(valuenewhight())
        let copresimage = sharp(
            req.file.path).resize(fixtwidth, valuenewhight_new).jpeg({ quality: 90 }).png({ quality: 90 }
            ).toFile(direcimagefilter, async (err, info) => {
                if (err) {
                    console.log("eror")
                    console.log(err)
                    fs.unlinkSync(req.file.path)
                    req.flash('erormessage', 'gagal memuat gambar file terlalu besar')
                    res.redirect("/contencreate")
                } else {
                    console.log("berhasilll")
                    try {
                        fs.unlinkSync(req.file.path)
                    console.log(info)
                    let create = await db.Content.create({
                        title: title,
                        deskripsi: deskripsi,
                        thumbnail: req.protocol + '://' + req.header('host') + "/" + direcimagefilter,
                        ContentkategoriId: parseInt(kategori),
                    })
                    res.status(200)(
                        req.flash('suksesmessage', 'berhasil upload image'),
                        res.redirect("/contencreate")
                    )
                    } catch (error) {
                        fs.unlink(direcimagefilter)
                        res.json({
                            error: {
                                message: error.message,
                                status: error.status
                            }
                        })
                    }
                   
                }
            })
        // res.redirect("/contencreate")
    } catch (error) {
        if (error.message == "Corrupt JPG, exceeded buffer limits") {
            fs.unlinkSync(req.file.path)
            req.flash('erormessage', `gagal memuat gambar ${error.message}`)
            res.redirect('/filemedia');
        } else {
            res.json({
                error: {
                    message: error.message,
                    status: error.status
                }
            })
        }
    }
}

// mediafileindex controler
let pagingperpage = 5
let startpaging = 0
controller.mediafileindex = async (req, res) => {
    let pageke = req.query.pageke
    let ofset = 0
    const limit = 10
    let page //pariabel yg akan berisi jumlah pagination

    // menentukan offset sesuai paginaion
    if (pageke != undefined) {
        ofset = pageke * limit
    }

    // ambil data dari db
    const data = await db.Media.findAndCountAll({
        limit: limit, //jumlah data
        offset: ofset //data di ambil dari 
    })

    // menghitung jumlah page pagination
    let count = data.count //jumlah keseluruhan data
    let p = count / limit    //akan menghasilkan jumlah page bil bulat / pecahan ex= 2 atau 2,1
    let tostr = p.toString() //conper p ke string  
    let sp = tostr.split(".") // pisah kan bilangan menghasilkan aray ex= jika tostr=2.2 split menjadi [2,2] jika tostr=2 split menghasilkan [2]
    if (sp.length > 1) {   //periksa panjang sp jika > 1 maka bilangan pecahan 
        let toint = parseInt(sp[0]) //compert sp index ke 0 menjadi int 
        page = toint + 1              // tambahkan bilangan degan satu 
    } else {   //jika sp !> dari 1 maka sp bil bulat
        let toint = parseInt(sp[0]) //cmpert ke int
        page = toint            // jangan tambahkan 1
    }

    // membatasi  pagnastion yang di tapilkan 
    // paginationperpage=2,4
    //starpage=0,1
    let pageketoint = parseInt(pageke)
    let newpake = pageketoint + 1
    if (newpake > pagingperpage) {
        if (pageketoint >= page) {

        } else {
            pagingperpage = pagingperpage + 5
            startpaging = startpaging + 5
        }
    } else if (pageketoint === startpaging) {
        if (startpaging <= 0) {
            startpaging = 0
        } else {
            pagingperpage = pagingperpage - 5
            startpaging = startpaging - 5
        }
    }
    console.log(page)
    let erormesage = req.flash("erormessage")
    let suksesmessage = req.flash("suksesmessage")
    res.render('layout/admin/mediafile/index', {
        suksesmessage: suksesmessage,
        erormesage: erormesage,
        data: data,
        datapage: pagingperpage,
        startpaging: startpaging,
        pageposition: pageketoint,
        jumlahpage: page,
        jumlahdata: data.count
    })
}
// mediafile controler
controller.mediafilepost = async (req, res, next) => {
    try {
        let direcimagefilter = path.join('compres', 'image', new Date().getTime() + ".jpeg");
        let dimensi = await sizeOf(req.file.path);
        console.log("dimensi gambar=" + dimensi)
        let fixtwidth = 70
        let tinggi = dimensi.height
        let lebar = dimensi.width
        // let tinggibaru = dimensi.height - dimensi.width + fixtwidth
        const valuenewhight = () => {
            if (lebar > fixtwidth) {
                let min = lebar - fixtwidth
                let persen = min / lebar * 100
                let persenditinggi = tinggi * persen / 100
                let tinggi_baru = tinggi - persenditinggi
                return tinggi_baru
            } else if (lebar < fixtwidth) {
                let min = fixtwidth - lebar
                let persen = min / lebar * 100
                let persenditinggi = tinggi * persen / 100
                let tinggi_baru = tinggi + persenditinggi
                return tinggi_baru
            } else {
                return fixtwidth
            }
        }
        let valuenewhight_new = parseInt(valuenewhight())
        let copresimage = sharp(
            req.file.path).resize(fixtwidth, valuenewhight_new).jpeg({ quality: 90 }).png({ quality: 90 }
            ).toFile(direcimagefilter, async (err, info) => {
                if (err) {
                    console.log("eror")
                    console.log(err)
                    fs.unlinkSync(req.file.path)
                    req.flash('erormessage', 'gagal memuat gambar file terlalu besar')
                    res.redirect('/filemedia');
                } else {
                    console.log("berhasilll")
                    fs.unlinkSync(req.file.path)
                    console.log(info)
                    let create = await db.Media.create({
                        url: req.protocol + '://' + req.header('host') + "/" + direcimagefilter,
                    })
                    req.flash('suksesmessage', 'berhasil upload image')
                    res.redirect('/filemedia');
                }
            })
    } catch (error) {
        console.log("error try")
        console.log(error)
        if (error.message == "Corrupt JPG, exceeded buffer limits") {
            fs.unlinkSync(req.file.path)
            req.flash('erormessage', `gagal memuat gambar ${error.message}`)
            res.redirect('/filemedia');
        } else {
            res.json({
                error: {
                    message: error.message,
                    status: error.status
                }
            })
        }
    }

    // res.redirect('/filemedia');
}
// admin control

module.exports = controller

// toFile(
//     path.resolve(req.file.destination,'resized',image)
// )