const Book = require("../models/Book.model");

exports.createBook = async(req,res)=>{
   
    const { title, author, genre, coverImage } = req.body;

    if(!title || !author){
        return res.status(400).json({message:"Title and author are required fileds"});
    }

    try{
        const newBook = new Book({
            title,author,genre,coverImage,creator:req.userId
        });

        await newBook.save();
        res.send(201).json(newBook);
    }catch(error){
        console.error('Create Book Error',error.message);
        return res.send(500).json({message:"Failed to create a new entry"});
    }
};

exports.getAllBooks = async (req,res)=>{
    try{
        const books = await Book.find().populate('creator','email');
        return res.status(200).json(books);
    }catch(error){
        console.error('Failed to read all books',error.message);
        res.status(500).json({message:"Failed to readall from Book Model"});
    }

};

exports.getBookById = async(req,res)=>{
    try{
        const book = await Books.findById(req.params.id).populate('creator','email');

        if(!book){
            return res.status(404).json({message:"Book not found"});
        }
        res.status(200).json(book);
    }catch(error){
        res.status(400).json({message:"Invalid Book ID Format"});
    }
};

exports.updateBook = async (req,res)=>{
    const { userId } = req;
    const{ id } = req.params;

    try{
        const book = await Book.findOne({_id:id, creator: req.userId });
        if(!book){
            return res.status(403).json({message:"Not authorized to edit"})
        }

        const updateBook = await Book.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
        res.status(200).json(updateBook);
    }catch(error){
        console.error('Update Book Failed',error.message);
        res.status(500).json({message:"Failed to update book"});
    }
};

exports.deleteBook = async(req,res)=>{
    const { userId } = req;
    const { id }  = req.params;

    try{
        const book = await Book.findOneAndDelete({_id:id, creator: req.userId});
        if(!book){
            return res.status(403).json({message:"Not authorised or Book unavailable"})
        }
        res.status(204).send();
    }catch(error){
        console.error("Delete Book Error", error.message);
        res.status(500).json({message:"Failed to delete book"});
    }
 };