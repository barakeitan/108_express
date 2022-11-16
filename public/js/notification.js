const port = 6835;
var connection = new WebSocket(`ws://localhost:${port}`);

connection.onopen = function() {
    console.log(`client connected to server...`);
};
connection.onmessage = function(e) {
    console.log(`message from server: ${e.data}`);
    window.$.notify(e.data, "success");
} ;
connection.onerror = function(error) {
    console.log(`connection error: ${error}`);
};
connection.onclose = function() {
    console.log(`connection closed`);
};
