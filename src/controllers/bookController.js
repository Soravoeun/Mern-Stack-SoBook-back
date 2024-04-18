import Book from "../models/bookModel";
import { response } from "../models/response";

// creation of book from Admin ( private)
export const createABook = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.image ||
      !req.body.image ||
      !req.body.stock
    ) {
      return res.json(
        response().error({
          message:
            "resend all requied fied : title, author, publishYear, image, stock",
        })
      );
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      image: req.body.image,
      description: req.body.description,
      stock: req.body.stock,
    };
    const book = await Book.create(newBook);
    return res.json(
      response().success({
        id: book.id,
      })
    );
  } catch (err) {
    console.log(err.message);
    res.json(response().error({ message: err.message }));
  }
};

//get all books
export const getAllBooks = async (req, res) => {
  const { order, limit } = req.query;
  console.log(req.params);
  let books = [];
  try {
    if (order && limit) {
      books = await Book.find({})
        .sort({
          publishYear: order,
        })
        .limit(limit);
    } else {
      books = await Book.find({});
    }
    return res.json(
      response().success({
        count: books.length,
        data: books,
      })
    );
  } catch (err) {
    console.log(err.message);
    res.json(response().error({ message: err.message }));
  }
};

// get one book by id
export const getOneBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.json(response().error({ message: "Book not found" }));
    return res.json(response().success(book));
  } catch (err) {
    console.log(err.message);
    res.json(response().error({ message: err.message }));
  }
};

// update one book by id (private)
export const updateOneBook = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.image ||
      !req.body.stock
    ) {
      return res.json(
        response().error({
          message:
            "send all requied fied : title, author, publishYear, image, stock",
        })
      );
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.json(response().error({ message: "Book not found" }));
    }
    return res.json(
      response().success({ message: "Book updated successfully" })
    );
  } catch (err) {
    console.log(err.message);
    res.json(response().error({ message: err.message }));
  }
};

// delete one book by id (private)
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.json(response().error({ message: "Book not found" }));
    }
    return res.json(
      response().success({ message: "Book deleted successfully" })
    );
  } catch (err) {
    console.log(err.message);
    res.json(response().error({ message: err.message }));
  }
};

export const searchBooks = async (req, res) => {
  try {
    const { searchText } = req.body;

    const searchBooks = await Book.find({
      // recherche title par la fonction searchText du front avec .(nimporte quel caractère) *(repetition de 0 à N fois)
      // title: new RegExp(searchText + ".*"),

      $or: [
        { title: { $regex: new RegExp(searchText + ".*", "i") } },
        { author: { $regex: new RegExp(searchText + ".*", "i") } },
        // { author: { $regex: searchText, $options: "i" } },
      ],

      // title: { $regex: searchText, $options: "i" },
    });
    return res.json(response().success(searchBooks));
  } catch (error) {
    console.log(error.message);
    res.json(response().error({ message: error.message }));
  }
};
