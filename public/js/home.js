const getEle = (id) => document.getElementById(id);
import {Services} from './Service.js';
const service = new Services();
const renderItem = (item) => {
    return ` 
    <div class="col-lg-3 col-md-6">
        <div class="card text-black h-100">
            <div class="text-center">
                <h5 class="card-title pt-3">${item.name}</h5>
            </div>
            <img src=${item.image} class="card-img" alt="${item.name}" />
            <div class="card-body">
                <div class="text-center">
                    <span class="text-muted mb-2">${item.price}₫</span>
                </div>
            </div>
        </div>
    </div>`;
};

const renderList = (data) => {
    getEle('phoneList').innerHTML = data.map((data) => renderItem(data)).join('');
};

window.onload = async () => {
    await service.getProducts().then((data) => renderList(data));
};







