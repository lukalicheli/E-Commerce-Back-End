const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(allCategories);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryFind = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    }) 
    if (!categoryFind) {
      res.status(400).json({ message: 'Category could not be found!' });
      return;
    } 
    res.status(200).json(categoryFind); 
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(createCategory)
  } 
  catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(
      {category_name: req.body.category_name},
      {where: {id: req.params.id}}
    );
  res.status(200).json(updateCategory)
  } 
  catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {id: req.params.id}
    });
    res.status(200).json(deleteCategory);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
