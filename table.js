function makeArr() {
    var url = decodeURIComponent(location.search.slice(1));
    var tmp = url.split("&");
    region_select = [];
    product_select = [];
    for (var i in tmp) {
        if (productCheckbox.indexOf(tmp[i]) != -1) {
            product_select.push(tmp[i]);
        } else if (regionCheckbox.indexOf(tmp[i]) != -1) {
            region_select.push(tmp[i]);
        }
    }


}

function changeTable() {

    var arr = getData(dataRender);
    if (region_select.length == 1) {
        sortArrByRegion(arr);
        table.rows[0].cells[0].innerHTML = '地区';
        table.rows[0].cells[1].innerHTML = '商品';
        table1(arr);
    } else {
        sortArrByProduct(arr);
        table.rows[0].cells[0].innerHTML = '商品';
        table.rows[0].cells[1].innerHTML = '地区';
        table2(arr);
    }


    marge();

}

function getData(sourceData) {
    var data = [];
    for (let i in sourceData) {
        if (product_select.indexOf(sourceData[i].product) != -1 && region_select.indexOf(sourceData[i].region) != -1) {
            data.push({
                index: i,
                value: sourceData[i]
            });
        }
    }
    if (data.length == 0) {
        for (let i in sourceData) {
            if (product_select.indexOf(sourceData[i].product) != -1) {
                data.push({
                    index: i,
                    value: sourceData[i]
                });
            } else if (region_select.indexOf(sourceData[i].region) != -1) {
                data.push({
                    index: i,
                    value: sourceData[i]
                });
            }
        }
    }
    return data;
}

function initTable(sourceData) {

    let data = [];
    for (let i in sourceData) {
        data.push(sourceData[i]);
    }
    var arr = data;
    for (let i in arr) {
        var tr = document.createElement('tr');
        tr.index = i;
        table.appendChild(tr);
        for (let j in arr[i]) {
            if (j != 'sale') {
                var td = document.createElement('td');
                td.innerHTML = arr[i][j];
                tr.appendChild(td);
            } else {
                for (let k in arr[i][j]) {
                    var td = document.createElement('td');
                    td.y = k;
                    td.x = i;
                    td.innerHTML = arr[i][j][k];
                    tr.appendChild(td);
                }
            }
        }

    }
}

function clearTable() {
    for (let i = table.children.length - 1; i > 0; i--) { //要倒着遍历，否则会修改table的下标
        table.removeChild(table.children[i])
    }
}


function sortArrByProduct(arr) {
    arr.sort((a, b) => a.value.product.localeCompare(b.value.product, 'zh-CN'));
}

function sortArrByRegion(arr) {
    arr.sort((a, b) => a.value.region.localeCompare(b.value.region, 'zh-CN'));
}

function clearRowSpan(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].rowspan = 1;
    }
}

function table1(arr) {

    for (var i = 0; i < arr.length; i++) {

        var tr = document.createElement('tr');
        tr.index = i;
        table.appendChild(tr);
        var ele = arr[i].value;
        for (let j in ele) {
            if (j == 'product') {
                var td = document.createElement('td');
                td.innerHTML = ele['region'];
                tr.appendChild(td);
            } else if (j == 'region') {
                var td = document.createElement('td');
                td.innerHTML = ele['product'];
                tr.appendChild(td);

            } else {
                for (let k in ele[j]) {
                    var td = document.createElement('td');
                    td.y = k;
                    td.x = arr[i].index;
                    td.innerHTML = ele[j][k];
                    tr.appendChild(td);
                }
            }
        }

    }
}

function table2(arr) {
    for (var i = 0; i < arr.length; i++) {
        var ele = arr[i].value;
        var tr = document.createElement('tr');
        tr.index = i;
        table.appendChild(tr);
        for (let j in ele) {
            if (j != 'sale') {
                var td = document.createElement('td');
                td.innerHTML = ele[j];
                tr.appendChild(td);
            } else {
                for (let k in ele[j]) {
                    var td = document.createElement('td');
                    td.y = k;
                    td.x = arr[i].index;
                    td.innerHTML = ele[j][k];
                    tr.appendChild(td);
                }
            }
        }
    }
}

function marge() {
    for (var i = 1; i < table.rows.length;) {
        var j = i + 1;
        while (j < table.rows.length && table.rows[i].cells[0].innerHTML == table.rows[j].cells[0].innerHTML) {
            table.rows[i].cells[0].rowSpan++;
            table.rows[j].removeChild(table.rows[j].cells[0]);
            j++;
        }
        i = j;
    }
}