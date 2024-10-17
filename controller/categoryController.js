const CategoryModel = require("../models/categoryModel");

// Create a new category
exports.createCategory = (req, res) => {
    const name = req.body.name;
    const newCategory = new CategoryModel({ name });

    newCategory.save()
        .then((doc) => {
            res.status(201).json(doc);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

// Get all categories
exports.getCategories = (req, res) => {
    CategoryModel.find()
        .then((categories) => {
            res.status(200).json(categories);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

// Get a category by ID
exports.getCategoryById = (req, res) => {
    const categoryId = req.params.id;

    CategoryModel.findById(categoryId)
        .then((category) => {
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

// Update a category by ID
exports.updateCategory = (req, res) => {
    const categoryId = req.params.id;
    const updatedData = req.body;

    CategoryModel.findByIdAndUpdate(categoryId, updatedData, { new: true, runValidators: true })
        .then((category) => {
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

// Delete a category by ID
exports.deleteCategory = (req, res) => {
    const categoryId = req.params.id;

    CategoryModel.findByIdAndDelete(categoryId)
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json({ message: "Category deleted successfully" });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};
