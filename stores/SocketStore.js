import io from "socket.io-client";
import { makeAutoObservable } from "mobx";
import { instance } from "./instance";
import { baseURL } from './baseURL';

class SocketStore {

    constructor() { 
        makeAutoObservable(this);
    }
    

    socket = null;

    setConnection = () => {
        try {
            this.socket = io.connect(baseURL);
        } catch (error) {
            console.log(error);
        }
    };

    disconnect = () => {
        try {
            this.socket.disconnect();
        } catch (error) {
            console.log(error);
        }
    };
    

}

const socketStore = new SocketStore();
export default socketStore;
















// socket.on('connect', (data) => {
//     socket.emit('validated-user', { customId: this.user._id });
// });