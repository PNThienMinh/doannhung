var socket = io.connect("http://localhost:3000");
var BTNSEND = $("#shot");
BTNSEND.click(function() {
    console.log("user click " + this.id);
    TEXTDATA = $('#textnhanduoc').val();
    socket.emit("SendTextToSerVer", {
        DATA: TEXTDATA,
        P: 1
    });
});
var BTNSEND2 = $("#shot2");
BTNSEND2.click(function() {
    console.log("user click " + this.id);
    TEXTDATA = $('#textnhanduoc').val();
    socket.emit('SendTextToSerVer', {
        DATA: TEXTDATA,
        P: 2
    });
});