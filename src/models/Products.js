const {Schema, model} = require('mongoose');
const {handleSaveError, addUpdateSettings} = require('./hooks');

const productSchema = new Schema({
    price: { type: Number },
    image: {type: String},
    name: {type: String, required: true, unique: true},
    // xoá mềm
  //  isDeleted: {type: Boolean, default: false},
  //  deletedAt: {type: Date},
}, {
    timestamps: true,
    versionKey: false
});

productSchema.post("save", handleSaveError);

productSchema.pre("findOneAndUpdate", addUpdateSettings);

productSchema.post("findOneAndUpdate", handleSaveError);

const Product = model('products', productSchema);

module.exports = Product;
