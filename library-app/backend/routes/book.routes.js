const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const authMiddleware = require("../middleware/auth.middleware");


router.get('/',bookController.getAllBooks); // Public or Unsecured
router.get('/:id',bookController.getBookById); // Public or Unsecured
router.post('/',authMiddleware,bookController.createBook);
router.put('/:id',authMiddleware, bookController.updateBook);
router.delete('/:id',authMiddleware,bookController.deleteBook);

module.exports = router;