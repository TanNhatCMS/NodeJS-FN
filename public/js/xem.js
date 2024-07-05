const getEle = (id) => document.getElementById(id);
import {Services} from './Service.js';
const service = new Services();
const renderList = async () => {
    try {
        let data;
        await service.getProducts().then(
            (res) => {
                data = res;
                let content = '';
                data.map((ele, index) => {
                    let img = 'http://localhost:3000/assets/image/404.svg';
                    if(ele.image)  {
                        img = ele.image?.includes('http') ? ele.image : `http://localhost:3000/${ele.image}`;
                    }
                    content += `
        <tr>
            <td style="text-align: center">${index + 1}</td>
            <td style="text-align: center"><strong>${ele.name}</strong></td>
            <td style="text-align: center">${ele.price}</td>
            <td style="text-align: center">
            <img src="${img}" alt="phone-img" width="150" height="150">
            </td>
            <td style="text-align: center">
                <button class="btn btn-warning btn-sm" onclick ="btnEdit('${ele._id}')"  id='btnEdit'>
                    Chỉnh sửa
                    <i class="fa fa-pencil-square ms-2"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick ="btnDelete('${ele._id}')" id='btnDelete'>
                Xóa<i class="fa fa-trash ms-2"></i>
                </button>
            </td>
        </tr>`;
                });
                getEle('tableProducts').innerHTML = content;
            }
        );


    } catch (error) {
        console.error(error);
    }
};
window.onload = async () => {
    try {
        await renderList();
    } catch (error) {
        console.error(error);
    }
};
window.btnDelete = async (id) => {
    window.location.href = '/admin/xoa/' + id;
};
window.btnEdit = async (id) => {
    window.location.href = '/admin/sua/' + id;
};
