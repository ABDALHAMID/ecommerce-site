const express = require('express');
const router = express.Router();
const controler = require('../controlers/productControler')

router.get('/products',controler.getProducts)
router.get('/products/:id',controler.getProduct)
router.get('/getCategories',controler.getCategories)
router.get('/getSlider',controler.getSlider)
router.get('/getAttributes',controler.getAttributes)
router.post('/createProduct',controler.createProduct)
router.post('/addImg',controler.addProductImg)
router.post('/ceateSubProduct',controler.createSubProduct)
router.post('/createAttrib',controler.createAttrib)
router.get('/getProductByAttrib/:id',controler.getProductByAttrib)
module.exports = router;