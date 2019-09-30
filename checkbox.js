function upDateSelect() {
    var url = decodeURIComponent(location.search.slice(1));
    var tmp = url.split("&");
    var cb = document.querySelector('.checkbox').querySelectorAll('input');
    for (var i = 1; i < cb.length; i++) {
        cb[i].checked = false;
    }

    for (var i = 1; i < cb.length; i++) {
        if (i != 4) {
            for (var j = 1; j < tmp.length; j++) {
                if (tmp[j] == cb[i].value) {

                    cb[i].checked = true;

                }
            }
        }
    }
    singleSelect(region_radio_wrapper);
    singleSelect(product_radio_wrapper);

}

function generateCheckbox(div, arr) {
    for (let i in arr) {
        var checkbox = document.createElement('input');
        var container = document.createElement('label');
        var text = document.createTextNode(arr[i]);
        checkbox.type = 'checkbox';
        checkbox.value = arr[i];
        if (arr[i] == '全选') {
            checkbox.checkboxType = 'all';
        } else {
            checkbox.checkboxType = 'ds';
        }
        container.appendChild(checkbox);
        container.appendChild(text);
        div.appendChild(container);
    }
    div.onclick = function(e) {
        if (e.target.type == "checkbox") {
            if (e.target.checkboxType == 'all') {
                allSelect(div);
            } else {
                singleSelect(div);
                if (e.target.checked)
                    CheckHash(e.target);
                else
                    CancelCheckHash(e.target);
            }
        }
    }
}

function CancelCheckHash(cb) {
    let str = decodeURIComponent(location.search.slice(1));

    let arr = str.split('&');
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == cb.value) {
            arr.splice(i, 1);
        }
    }
    console.log(arr);

    history.pushState(null, null, '?' + arr.join('&'));
}


function CheckHash(cb) {

    let str = decodeURIComponent(location.search.slice(1));
    if (str.indexOf(cb.value) == -1) {
        str += "&" + cb.value;


        history.pushState(null, null, '?' + str);
    }

}

function allSelect(div) {
    var checkboxs = div.querySelectorAll('input');
    for (var i = 1; i < checkboxs.length; i++) {
        checkboxs[i].checked = checkboxs[0].checked;
        if (checkboxs[i].checked)
            CheckHash(checkboxs[i]);
        else
            CancelCheckHash(checkboxs[i])
    }

}

function singleSelect(obj) {

    var flag = true;
    var checkboxs = obj.querySelectorAll('input');
    for (var i = 1; i < checkboxs.length; i++) {
        if (!checkboxs[i].checked) {
            flag = false;

        }
        checkboxs[0].checked = flag;
    }
}