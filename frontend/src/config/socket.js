import socket from 'socket.io-client';

let socketInstance = null;

export const socketConnectionInit = ( projectId ) => {
    socketInstance = socket(import.meta.env.VITE_SOCKET_URL, {
        auth: {
            token: localStorage.getItem('token')
        },
        query: {
            projectId
        }
    });

    return socketInstance;
}

export const sendMessage = (eventName, message) => {
    socketInstance.emit(eventName, message);
}

export const receiveMessage = (eventName, callback) => {
    socketInstance.on(eventName, callback);
}