import {Services} from './Service.js';
const service = new Services();

const renderList = (data) => {
    const tableContainer = document.getElementById("table-container"); // Replace with your container ID

    const table = document.createElement("table");
    table.classList.add("table", "table-bordered", "table-striped", "table-responsive");

    const tableBody = document.createElement("tbody");

    data.forEach(item => {
        const row = document.createElement("tr");
        row.classList.add("live-price", item.status); // Add dynamic status class

        const nameCell = document.createElement("td");
        nameCell.classList.add("wtb25");
        nameCell.innerHTML = `
        <a href="#"> 
            <p class="item_name">${item.name}</p>
            <p><small>${item.shortName}</small></p> 
        </a>
    `;
        row.appendChild(nameCell);

        const priceCell = document.createElement("td");
        priceCell.innerHTML = `
        <a href="#">
            <p><span class="price">${item.priceVND}</span></p>
            <p class="font-arial"><small>${item.priceUSD}</small></p>
        </a>
    `;
        row.appendChild(priceCell);

        const changeCell = document.createElement("td");
        changeCell.innerHTML = `
        <a href="#">
            <p><span class="price"><i class="fa fa-arrow-${item.status === 'equal' ? 'down' : item.status}"></i>${item.changePercent}</span></p> 
            <p class="price"><small>${item.changeValue}</small></p>
        </a>
    `;
        row.appendChild(changeCell);

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    tableContainer.appendChild(table);
};

document.addEventListener('DOMContentLoaded', async () => {
    await service.getBangGia().then((data) => renderList(data));
});







