const router = require('express').Router();
const {notification} = require('../helpers');
const { capitalize } = require('../utils/util');
const {dashboard, sua , updateProduct,addNewProduct,searchProduct, deleteProduct,xoa} = require('../controllers/productController');

const availableResources = [
  'them',
  'sua',
  'xoa',
  'xem'
];

router.get('/', notification, dashboard);

router.get('/:resource', notification,  (req, res, next) => {
  const resource = (req.params.resource || '').toLowerCase();

  if (!availableResources.includes(resource)) {
    next();
    return;
  }
  const capitalizedResource = capitalize(resource);
  res.render(`admin-${resource}`, {
    page: capitalizedResource,
    action: resource,
    data: undefined,
    description: `${capitalizedResource} | Nguyễn Tuấn Kiệt | Lập Trình Web Phía Máy Chủ `,
  });
});

router.get('/:action/:id',  notification, (req, res, next) => {
  const action = (req.params.action || '').toLowerCase();
  if (!availableResources.includes(action)) {
    next();
    return;
  }
  switch (action) {
    case 'sua':
    sua(req, res, next);
      break;
    case 'xoa':
      xoa(req, res, next);
      break;
    default:
      next();
      return;
  }
});
router.post('/sua/:id', updateProduct);
router.post('/xoa/:id', deleteProduct);
router.post('/them', addNewProduct);
router.post('/tim', searchProduct);
module.exports = router;
