var table = document.querySelector('tbody');
var tableWrapper = document.querySelector('#table-wrapper');
var checkbox = document.querySelector('.checkbox');
table.addEventListener('mouseleave', function() {
    generateLine(123);
    bar.innerHTML = drawColum(123);
})

table.addEventListener('mouseover', function(e) {
    var qwe = getData(dataRender);
    var arr = [];
    for (var i in qwe) {
        arr.push(qwe[i].value);
    }
    if (/^[0-9]+$/.test(e.target.innerHTML)) {
        e.target.classList.add('pencil');
        generateLine(arr[e.target.parentNode.index].sale);
        bar.innerHTML = drawColum(arr[e.target.parentNode.index].sale);

    }
})
table.addEventListener('mouseout', function(e) {
    e.target.classList.remove('pencil')


})
document.addEventListener('keyup', function(e) {
    if (e.keyCode == 13) {
        queren.onclick();
    } else if (e.keyCode == 27) {
        cancel.onclick();
    }
})
document.onclick = function(e) {
    if (e.target === submit) {
        // var tableDate = saveData();
        // initTable(tableDate);
    } else if (typeof(cancel) != "undefined") {
        cancel.onclick();
    }
}

function upDateData(target) {



    dataRender[target.x].sale[target.y] = parseInt(target.innerHTML);
    localStorage.setItem("data", JSON.stringify(dataRender))


}
tableWrapper.addEventListener('click', function(e) {
    e.stopPropagation();


    if (/^[0-9]+$/.test(e.target.innerHTML)) {
        if (typeof(cancel) != "undefined") {
            cancel.onclick();
        }
        tmp = e.target.innerHTML;
        var input = document.createElement('input');
        input.value = tmp;

        var i = document.createElement('i');
        cancel = document.createElement('button');
        cancel.innerHTML = '取消';
        queren = document.createElement('button');
        queren.onclick = function() {
            if (/^[0-9]+$/.test(input.value)) {
                if (input.value != tmp) {
                    tmp = input.value;
                    e.target.innerHTML = input.value;

                    // CheckHash2(e.target);
                    upDateData(e.target);
                }
            } else {
                cancel.onclick();
                alert('请输入一个数字');
            }
        }
        cancel.onclick = function() {
            e.target.innerHTML = tmp;

        }
        queren.innerHTML = '确定';
        i.appendChild(cancel);
        i.appendChild(queren);
        e.target.innerHTML = '';
        e.target.appendChild(input);
        e.target.appendChild(i);
        input.focus();

    } else if (typeof(cancel) != "undefined" && e.target.innerHTML != '') {
        cancel.onclick();

    }

})

function saveData() {

    var data = [];
    var tr = document.querySelectorAll('tr');
    for (var i = 1; i < tr.length; i++) {
        var td = tr[i].querySelectorAll('td');
        var single = {};
        var tmp = [];
        for (var j = 0; j < td.length; j++) {
            if (j == 0) {
                single.product = td[j].innerHTML;
            } else if (j == 1) {
                single.region = td[j].innerHTML;
            } else {
                tmp.push(td[j].innerHTML);
            }
        }
        single.sale = tmp;
        data.push(single);
    }
    localStorage.setItem("data", JSON.stringify(data));
}
checkbox.onchange = function() {
    makeArr();
    clearTable();
    changeTable();
}