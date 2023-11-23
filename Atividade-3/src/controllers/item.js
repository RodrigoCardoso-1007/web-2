const itemModel = require('../models/item')

function listItems() {
  return itemModel.findAll();
}

function getItemsById(id) {
  return itemModel.findAll({ where: { id } });
}

function createItem(item) {
  return itemModel.create(item);
}

function updateItem(id, item) {
  return itemModel.update(item, { where: { id } })
}

function deleteItem(id) {
  return itemModel.destroy({ where: { id } })
}

module.exports = {
  listItems,
  createItem,
  getItemsById,
  updateItem,
  deleteItem
}