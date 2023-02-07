import slugify from "slugify";
import Product from "../../Models/product.mongo.js";
import fs from "fs";

export const createProduct = async (req, res) => {
  try {
    // console.log(req.fields);
    // console.log("-----------");
    // console.log(req.files);
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation

    switch (true) {
      case !name.trim():
        res.json({ error: "name is required" });

      case !description.trim():
        res.json({ error: "description is required" });
      case !price.trim():
        res.json({ error: "price is required" });
      case !category.trim():
        res.json({ error: "category is required" });
      case !quantity.trim():
        res.json({ error: "quantity is required" });

      case !shipping.trim():
        res.json({ error: "shipping is required" });
      case photo && photo.size > 1000000:
        res.json({ error: "photo must be less then 1mb" });
    }

    //create new product
    const product = new Product({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);

      product.photo.contentType = photo.type;
      await product.save();
      res.json(product);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const allProducts = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(15)
      .sort({ createdAt: -1 });
    res.json(allProducts);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getRequestedProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category")
      .select("-photo");
    res.json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const getPhotoById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "photo"
    );
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);

      return res.send(product.photo.data);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const removed = await Product.findByIdAndDelete(
      req.params.productId
    ).select("-photo");
    res.json(removed);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation

    switch (true) {
      case !name.trim():
        res.json({ error: "name is required" });

      case !description.trim():
        res.json({ error: "description is required" });
      case !price.trim():
        res.json({ error: "price is required" });
      case !category.trim():
        res.json({ error: "category is required" });
      case !quantity.trim():
        res.json({ error: "quantity is required" });

      case !shipping.trim():
        res.json({ error: "shipping is required" });
      case photo && photo.size > 1000000:
        res.json({ error: "photo must be less then 1mb" });
    }

    //update product
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
