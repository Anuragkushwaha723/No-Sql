const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
class Product {
  constructor(title, price, imageUrl, description, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id;
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      this._id = new mongodb.ObjectId(this._id);
      dbOp = db.collection('products').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      this._id = new mongodb.ObjectId(this._id);
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => console.log(err));
  }
  static findById(prodId) {
    const db = getDb();
    return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => console.log(err))
  }
  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then(products => {
        console.log('Deleted');
      })
      .catch(err => console.log(err))
  }
}

module.exports = Product;
