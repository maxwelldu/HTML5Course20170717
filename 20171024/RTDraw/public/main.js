/**
 * Created by Administrator on 2016/11/11.
 */

(function () {

    let canvas = document.querySelector("#canvas");
    let context2d = canvas.getContext("2d");
    let socket = io("http://localhost:3000");

    function mouseDownHandler(e) {
        context2d.moveTo(e.offsetX, e.offsetY);
        socket.emit("drawCommand", {command: "moveTo", x: e.offsetX, y: e.offsetY});

        canvas.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
    }

    function mouseMoveHandler(e) {
        context2d.lineTo(e.offsetX, e.offsetY);
        socket.emit("drawCommand", {command: "lineTo", x: e.offsetX, y: e.offsetY});
        context2d.stroke();
    }

    function mouseUpHandler(e) {
        canvas.removeEventListener("mousemove", mouseMoveHandler);
        canvas.removeEventListener("mouseup", mouseUpHandler);
    }

    function init() {
        canvas.addEventListener("mousedown", mouseDownHandler);

        socket.on("drawCommand", function (data) {
            context2d[data.command](data.x, data.y);
            context2d.stroke();
        });

    }

    init();

})();