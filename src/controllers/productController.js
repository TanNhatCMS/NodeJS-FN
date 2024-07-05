const {apiError, redirect} = require('../helpers');
const {ctrlWrapper} = require('../decorators');
const Product = require('../models/Products');
const {capitalize} = require("../utils/util");

async function getAllProductsAPI(req, res, next) {
    const {page = 1, limit = 0} = req.query;
    const skip = (page - 1) * limit;

    const products = await Product.find({}, "-createdAt -updatedAt -isDeleted -deletedAt", {
        skip,
        limit,
    });
    if (!products.length) {
        throw apiError(
            404,
            "No Product found"
        );
    }
    res.status(200).json(products);
}

async function dashboard(req, res, next) {
    const total =  await Product.countDocuments();

    res.render('admin', {
        page: 'Admin Panel',
        action: 'dashboard',
        total: total,
        description: 'Dashboard | Lập Trình Web Phía Máy Chủ | Nguyễn Tuấn Kiệt'
    });
}
async function xoa(req, res, next) {
    const {id, action} = req.params;
    const capitalizedResource = capitalize(action);
    const data = await Product.findOne({_id: id});
    console.log(id);
    res.render('admin-xoa', {
        page: capitalizedResource,
        action: action,
        data: data,
        description: `${capitalizedResource} | Nguyễn Tuấn Kiệt | Lập Trình Web Phía Máy Chủ`,
    });
}

async function sua(req, res, next) {
    const {id, action} = req.params;
    const capitalizedResource = capitalize(action);
    const data = await Product.findOne({_id: id});
    console.log(id);
    res.render('admin-sua', {
        page: capitalizedResource,
        action: action,
        data: data,
        description: `${capitalizedResource} | Nguyễn Tuấn Kiệt | Lập Trình Web Phía Máy Chủ`,
    });
}

async function updateProduct(req, res, next) {
    const {id, action} = req.params;
    const {name, price, image} = req.body;
    const update = await Product.findOneAndUpdate(
        {_id: id}, {
          name: name,
          price: price,
          image: image
        }
        ,
        {
            new: true,
        }
    );
    if (!update) {
        const jsonData = { title: 'Cập nhật sản phẩm thất bại', message: `Cập nhật sản phẩm ${name} thất bại` , status: false};
        redirect(req, res,'/404', jsonData)
    }else{
        const jsonData = { title: 'Cập nhật sản phẩm thành công', message: `Cập nhật sản phẩm ${name} thành công` , status: true};
        redirect(req, res,`/admin/sua/${id}`, jsonData)
    }
}


async function getProductByIDAPI(req, res, next) {
  const { id: _id } = req.params;
  const product = await Product.findOne({ _id });
  if (product) {
    res.status(200).json(product);
  } else {
    throw apiError(404, "Product not found");
  }
}

async function getProductByID(req, res, next) {
    const { id: _id } = req.params;
    const product = await Product.findOne({ _id });
    if (product) {
        res.status(200).json(product);
    } else {
        throw apiError(404, "Product not found");
    }
}
async function addNewProduct(req, res, next) {
    const {name, price, image} = req.body;
    const create = await Product.create(
        {
            name: name,
            price: price,
            image: image
        }
    );
    if (!create) {
        const jsonData = { title: 'Thêm sản phẩm thất bại', message: `Thêm sản phẩm ${name} thất bại` , status: false};
        redirect(req, res,`/admin/them`, jsonData)
    }else{
        const jsonData = { title: 'Thêm sản phẩm thành công', message: `Thêm sản phẩm ${name} thành công` , status: true};
        redirect(req, res,`/admin/xem`, jsonData)
    }
}

async function searchProduct(req, res, next) {
    const {go, name } = req.body;
    const search = await Product.findOne({ name: name });
    if (!search) {
        const jsonData = { title: 'Tìm kiếm thất bại', message: `Không tìm thấy sản phẩm ${name}` , status: false};
        redirect(req, res,`/admin/${go}`, jsonData)
    }
    res.redirect(`/admin/${go}/${search._id}`)
}
async function deleteProduct(req, res, next) {
  const { id: _id , go } = req.params;
  const deleteproduct = await Product.findOneAndDelete({ _id });
  if (!deleteproduct) {
        const jsonData = { title: 'Xoá phẩm thất bại', message: '' , status: false};
        redirect(req, res,`/admin/xoa`, jsonData)
    }else{
        const jsonData = { title: 'Xoá phẩm thành công', message: '' , status: true};
        redirect(req, res,`/admin/xem`, jsonData)
    }
}

module.exports = {
    dashboard: ctrlWrapper(dashboard),
    getAllProductsAPI: ctrlWrapper(getAllProductsAPI),
    getProductByIDAPI: ctrlWrapper(getProductByIDAPI),
    xoa: ctrlWrapper(xoa),
    sua: ctrlWrapper(sua),
    updateProduct: ctrlWrapper(updateProduct),
    addNewProduct: ctrlWrapper(addNewProduct),
    deleteProduct: ctrlWrapper(deleteProduct),
    searchProduct: ctrlWrapper(searchProduct)
};
