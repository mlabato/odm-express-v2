const express = require('express');
const router = express.Router();
const multer = require("multer");
const { body } = require("express-validator");
const cors = require("cors");

const {getAllProducts} = require("../controllers/products/getAllProducts")
const {getProductById} = require("../controllers/products/getProductById")
const {getProductsOnSale} = require("../controllers/products/getProductsOnSale")
const {getProductsByCategory} = require("../controllers/products/getProductsByCategory")
const {getSearchedProducts} = require ("../controllers/products/getSearchedProducts")
const {getLowertoHigherPriceProducts} = require("../controllers/products/getLowertoHigherPriceProducts")
const {getHigherToLowerPriceProducts} = require("../controllers/products/getHigherToLowerPriceProducts")

const {getAllUsers} = require("../controllers/users/getAllUsers")
const {getUserById} = require("../controllers/users/getUserById")
const {checkout} = require("../controllers/mercado-pago/checkout")
const {notifications} = require("../controllers/mercado-pago/notifications")

const {productCreate} = require("../controllers/dashboard/productCreate")
const {productEdit} = require("../controllers/dashboard/productEdit")
const {productDelete} = require("../controllers/dashboard/productDelete")

const {userLogin} = require("../controllers/dashboard/userLogin")
const {userRegister} = require("../controllers/dashboard/userRegister")
const {userEdit} = require("../controllers/dashboard/userEdit")
const {userDelete} = require("../controllers/dashboard/userDelete")

router.use(cors());

//MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
           cb(null, "./public/images/productImages");
           },
       
    filename: (req, file, cb) => {
          cb (null, Date.now() + file.originalname ); 
           }
    }
)
const upload = multer({ storage: storage });

//VALIDACIONES       
const productValidation = [      
       body("price")
       .notEmpty()
       .withMessage("Debe insertar un precio"),
       body("model")
       .isLength({ min: 4 })
       .withMessage("El modelo debe tener 4 caracteres"),
       body("stock")
       .notEmpty()
       .withMessage("Debe insertar un stock"),
       body("image")
       .notEmpty()
       .withMessage("Debe insertar una imagen"),
       body("category_id")
       .isIn([1,2,3,4])
       .withMessage("Seleccione una categoría"),
       body("material_id")
       .isIn([1,2,3,4,5])
       .withMessage("Seleccione un material"),
       body("color_id")
       .isIn([1,2,3,4,5,6,7,8,9,10])
       .withMessage("Seleccione un color"),
];

const userValidation = [
       body("email")
       .notEmpty()
       .isEmail()
       .withMessage("Debe insertar un email válido"),
       body("password")
       .isLength({ min: 6 })
       .withMessage("El password debe tener 4 caracteres"),
];


//WEBSITE
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.get("/onsale", getProductsOnSale);
router.get("/category/:category", getProductsByCategory);
router.post("/search/:query", getSearchedProducts);
router.get("/low-to-high-price-products", getLowertoHigherPriceProducts)
router.get("/high-to-low-price-products", getHigherToLowerPriceProducts)

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/checkout", checkout)
router.post("/notifications", notifications)

//CRUD
router.post("/create", upload.single("file"), productValidation, productCreate);
router.post("/edit",upload.single("file"), productValidation, productEdit);
router.post('/delete', productDelete);

router.post("/login", userValidation, userLogin);
router.post("/register", userRegister);
router.post("/useredit", userValidation, userEdit);
router.post('/userdelete', userDelete);

module.exports = router;