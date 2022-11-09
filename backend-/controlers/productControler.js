const db = require('../dbconection');
const fs = require('fs');
const { features } = require('process');


module.exports.getProducts = (req,res) =>
{
    qr=`SELECT * FROM product ORDER BY RAND()`
    db.query(qr,(req,result)=>{
        res.send({
            data:result
        });
    })
}
module.exports.getSlider = (req,res) =>
{
    qr=`SELECT * FROM slider`
    db.query(qr,(req,result)=>{
        res.send({
            data:result
        });
    })
}
module.exports.getProductByAttrib = (req,res) => {
    let id = req.params.id
    qr=`select * from product where id_category=${id}`
    db.query(qr,(err,result)=>{
        if(err)console.log(err)
        else{
            res.send({
                status:true,
                products:result
            })
        }
    })
}
module.exports.getProduct = (req,res) =>
{
    let product
    let subProduct
    let productImgs = new Array()
    let catName
    id = req.params.id
    qr=`select * from product where id_product ='${id}'`
    db.query(qr,(err,prod_result)=>{
        product = prod_result
        qr=`SELECT name FROM category WHERE id_category=${prod_result[0].id_category};`
        db.query(qr,(err,cat_res)=>{
            catName = cat_res
            qr=`SELECT sub_product.id_sub_prod,sub_product.sub_prod_name,sub_product.info,sub_product.sub_prod_img,sub_product.actif,attribute.type,attribute.name,attribute.value FROM sub_product INNER JOIN attribute INNER JOIN attrubue_sub ON sub_product.parent_id='${id}' AND sub_product.id_sub_prod = attrubue_sub.id_sub_prod AND attribute.id_att = attrubue_sub.id_attribute`
            db.query(qr,(err,sub_result)=>{
                subProduct = sub_result
                qr=`SELECT product_imgs.img_url FROM product_imgs WHERE product_imgs.product_id = '${id}'`
                db.query(qr,(err,img_result)=>{
                    for(let i=0;i<img_result.length;i++)
                    {
            productImgs.push({'img':'data:image/jpeg;base64, '+base64_encode(img_result[i].img_url)})
        }
            res.send({
                product:product,
                subProduct:subProduct,
                imgs:productImgs,
                categorie:catName
            })
        })
    })
    })
    })
}

module.exports.getCategories = (req,res) => {
    qr = `SELECT * FROM category`
    db.query(qr,(err,result)=>{
        if(err)throw err;
        res.send({
            categories:result,
            statuse:true
        })
    })
}
// function to encode file data to base64 encoded string
function base64_encode(file) {
   // read binary data
   var bitmap = fs.readFileSync(file);
   // convert binary data to base64 encoded string
   return new Buffer.from(bitmap).toString('base64');
}

module.exports.createProduct = (req,res) => {
    const name = req.body.name
    const descreption = req.body.descreption
    const price = req.body.price
    const img = req.body.img
    const categorie = req.body.categories

    qr=`INSERT INTO product(id_product, name, descreption, price, img, id_category, Actif) VALUES ('null','${name.replace(/'/g,"\\'")}','${descreption.replace(/'/g,"\\'")}','${price}','${img}','${categorie}','1')`
    db.query(qr,(err,result)=>{
        if(err)throw err
            res.send({
                status:true,
                product:result
            })
    })

}
module.exports.addProductImg = (req,res) =>{
    
    const img = req.body.img
    const id = req.body.id
    const name = req.body.name
    const imgId = req.body.imgId
    const path = './img/'+ name.replace(/'/g,"_") + imgId +Date().toString().replace(/\s+/g, '').replace(/:/g,'').replace(/\+/g,'')+ '.' +img.slice(img.indexOf('/')+1,img.indexOf(';'))
    fs.writeFile(path,img.slice(img.indexOf(',')+1),'base64',(err)=>{
        if(err)throw err
    })
    qr=`INSERT INTO product_imgs(img_id, product_id, img_url) VALUES ('null','${id}','${path}')`
    db.query(qr,(err,result)=>{
        if(err)throw err
        res.send({
            status:true,
        })
    })
}
module.exports.getAttributes = (req,res) =>
{
    qr=`SELECT * FROM attribute`
    db.query(qr,(err,result)=>{
        if(err)throw err;
        res.send({
            attributes:result   
        })
    })
}
module.exports.createSubProduct = (req,res) =>{
    const id = req.body.id
    const img = req.body.img
    const quantity = req.body.quantity  || 0
    const name = req.body.name || ' '
    const desc = req.body.decreption || ' '
    qr=`INSERT INTO sub_product(id_sub_prod, parent_id, sub_prod_name, info, sub_prod_img, quantity, actif) VALUES ('null','${id}','${name.replace(/'/g,"\\'")}','${desc.replace(/'/g,"\\'")}','${img}','${quantity}','1')`
    db.query(qr,(err,result)=>{
        if(err)throw err;
        res.send({
            statuse:true,
            subProduct:result
        })
    })
}
module.exports.createAttrib = (req,res)=>{
    id = req.body.id
    idAtt = req.body.idAttrib

    qr=`INSERT INTO attrubue_sub(id_sub_attrib, id_sub_prod, id_attribute) VALUES ('null','${id}','${idAtt}')`
    db.query(qr,(err,result)=>{
        if(err)throw err
        res.send({
            status:true,
        })
    })
}