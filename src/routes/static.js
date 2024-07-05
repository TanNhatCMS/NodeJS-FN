const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', {
    page: '',
    description: `Lập Trình Web Phía Máy Chủ | Nguyễn Tuấn Kiệt `,
    action: ''
  });
});

module.exports = router;
