const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');


router.get('/banggia', (req, res, next) => {
    const url = 'https://www.thitruonghanghoa.com/gia-nong-san';

// Gửi yêu cầu HTTP để lấy dữ liệu HTML
    axios.get(url)
        .then(response => {
            const html = response.data;
            // Sử dụng cheerio để tải HTML
            const $ = cheerio.load(html);

            // Tạo một mảng để chứa kết quả
            const results = [];

            $('tbody tr').each((index, element) => {
                const status = $(element).attr('class').split(' ').pop();
                const name = $(element).find('.item_name').text().trim();
                const shortName = $(element).find('td.wtb25 small').text().trim();
                const priceVND = $(element).find('td:nth-child(2) .price').first().text().trim();
                const priceUSD = $(element).find('td:nth-child(2) .font-arial small').text().trim();
                const changePercent = $(element).find('td:nth-child(3) .price').first().text().trim();
                const changeValue = $(element).find('td:nth-child(3) .price small').text().trim();

                // Thêm vào mảng kết quả
                results.push({
                    status,
                    name,
                    shortName,
                    priceVND,
                    priceUSD,
                    changePercent,
                    changeValue
                });
            });

            res.send(JSON.stringify(results, null, 2));
        })
        .catch(error => {
            console.error(`Không thể lấy dữ liệu từ ${url}:`, error);
        });
    //res.send('Bangia');
});
module.exports = router;
