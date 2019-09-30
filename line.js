function generateLine(data) {
    if (data == 123) {
        var canvas = document.querySelector("canvas");
        canvas.setAttribute("height", h);
        canvas.setAttribute("width", w);

        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX, startY + axisY);
        ctx.lineTo(startX + axisX, startY + axisY);
        ctx.strokeStyle = pColor;
        ctx.stroke();

    }
    //定义好折线图绘制区域的高度，宽度，轴的高度，宽度
    var w = 550,
        h = 350,
        axisX = 500,
        axisY = 300,
        startX = 10,
        startY = 10;
    //定义好每一个数据点的直径，颜色，线的颜色，宽度
    var pDiameter = 5,
        pColor = "#000000",
        lColor = "#37A2DA",
        lWidth = 2;
    //定义好每两个数据点之间的横向间隔距离
    var interval = 40;
    //拿到折线图中的最大值Max
    var max = data[0];
    for (var i in data) {
        if (data[i] > max) {
            max = data[i];
        }
    }
    //根据Max和你用来绘制折线图图像区域的高度， 进行一个数据和像素的折算比例
    var dataProcessed = [];
    for (var i in data) {
        dataProcessed.push((data[i] / max) * axisY);
    }
    //绘制横轴及纵轴
    var canvas = document.querySelector("canvas");
    canvas.setAttribute("height", h);
    canvas.setAttribute("width", w);

    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, startY + axisY);
    ctx.lineTo(startX + axisX, startY + axisY);
    ctx.strokeStyle = pColor;
    ctx.stroke();
    //遍历数据，计算将要绘制数据点的坐标，绘制数据点
    ctx.beginPath();
    ctx.moveTo(startX + interval, startY + axisY - dataProcessed[0]);
    ctx.arc(startX + interval, startY + axisY - dataProcessed[0], pDiameter / 2, 0, Math.PI * 2);
    ctx.strokeStyle = lColor;
    for (let i = 1; i < dataProcessed.length; i++) {
        var x = startX + interval * (i + 1);
        var y = startY + axisY - dataProcessed[i];
        ctx.lineTo(x, y);
        ctx.arc(x, y, pDiameter / 2, 0, Math.PI * 2);
        ctx.strokeStyle = lColor;

    }
    ctx.stroke();
}