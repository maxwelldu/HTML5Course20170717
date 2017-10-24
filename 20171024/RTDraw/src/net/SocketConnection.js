/**
 * Created by Administrator on 2016/11/11.
 */

class SocketConnection {

    constructor(socket) {
        this._socket = socket;

        this._id = SocketConnection.__id;
        SocketConnection.__id++;

        SocketConnection.addConnection(this);

        this.addListeners();
    }

    addListeners() {
        this.socket.on("drawCommand", data=> {
            SocketConnection.sendToAll("drawCommand", data);
        });
    }

    get id() {
        return this._id;
    }

    get socket() {
        return this._socket;
    }
}

SocketConnection.__allConnection = new Map();
SocketConnection.__id = 1;
SocketConnection.addConnection = function (conn) {
    SocketConnection.__allConnection.set(conn.id, conn);
};
SocketConnection.removeConnection = function (conn) {
    SocketConnection.__allConnection.delete(conn.id);
};
SocketConnection.sendToAll = function (type, data) {
    SocketConnection.__allConnection.forEach(conn=> {
        conn.socket.emit(type, data);
    });
};

module.exports = SocketConnection;