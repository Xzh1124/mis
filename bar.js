function drawColum(data) {
    if (data == 123) {
        var svgStart = '<svg width=' + w + ' height=' + h + ' version="1.1" xmlns="http://www.w3.org/2000/svg">';
        var svgEnd = '</svg>';
        var row = "<line x1=" + startX + " y1=" + startY + " x2=" + (startX + axisX) + " y2=" + startY + ' style="stroke:rgb(0,99,99);stroke-width:1"/>';
        var col = "<line x1=" + startX + " y1=" + startY + " x2=" + startX + " y2=" + (startY - axisY) + ' style="stroke:rgb(0,99,99);stroke-width:1"/>';

        var svgT = svgStart + row + col + svgEnd;
    }
    //  定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
    var w = 550,
        h = 350,
        axisX = 500,
        axisY = 300,
        startX = 25,
        startY = 310;
    // 定义好每一个柱子的宽度及柱子的间隔宽度
    var barWidth = 32,
        interval = 9;
    // 定义好柱子颜色， 轴的颜色
    var barColor = "#0DAFF4",
        axisColor = "rgb(0,99,99)";

    // 拿到柱状图中的最大值Max
    var max = data[0];
    for (var i in data) {
        if (data[i] > max) {
            max = data[i];
        }
    }
    // 根据Max和你用来绘制柱状图图像区域的高度， 进行一个数据和像素的折算比例
    var dataProcessed = [];
    for (var i in data) {
        dataProcessed.push((data[i] / max) * axisY);
    }


    //  绘制横轴及纵轴
    var svgStart = '<svg width=' + w + ' height=' + h + ' version="1.1" xmlns="http://www.w3.org/2000/svg">';
    var svgEnd = '</svg>';
    var row = "<line x1=" + startX + " y1=" + startY + " x2=" + (startX + axisX) + " y2=" + startY + ' style="stroke:rgb(0,99,99);stroke-width:1"/>';
    var col = "<line x1=" + startX + " y1=" + startY + " x2=" + startX + " y2=" + (startY - axisY) + ' style="stroke:rgb(0,99,99);stroke-width:1"/>';

    var svgT = svgStart + row + col;
    //  遍历数据 {
    //   计算将要绘制柱子的高度和位置
    // 绘制每一个柱子
    // }
    for (let i = 0; i < data.length; i++) {

        let rectStartX = startX + interval * (i + 1) + barWidth * i;
        let rectStartY = startY - dataProcessed[i];

        var bar = "<rect x=" + rectStartX + " y=" + rectStartY + " width=" + barWidth + " height=" + dataProcessed[i] + ' style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>';
        svgT += bar;
    }

    svgT += svgEnd;

    return svgT;
}