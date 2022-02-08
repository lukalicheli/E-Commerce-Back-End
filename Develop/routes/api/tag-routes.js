const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// find all tags
router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag}]
    })
    res.status(200).json(allTags);
    } 
    catch (err) {
      res.status(500).json(err);
    } 
});

 // find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagFind = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag}]
    })
    if (!tagId) {
      res.status(400).json({message: 'Tag could not be found!'})
      return;
    }
    res.status(200).json(tagFind);
    } 
    catch (err) {
      res.status(500).json(err)
    }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const createTag= await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(createTag)
    } 
    catch (err) {
      res.status(500).json(err)
    }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(
      {tag_name: req.body.tag_name},
      {where: {id: req.params.id}}
    );
    if (!req.params.id) {
      res.status(400).json({ message: 'Tag could not be found with this Id!' });
      return;
    } 
    res.status(200).json(updateTag)
    } 
    catch (err) {
      res.status(500).json(err)
    }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });
    res.status(200).json(tagData);
    } 
    catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
