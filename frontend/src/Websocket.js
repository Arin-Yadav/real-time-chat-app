import { io } from 'socket.io-client'

function connectWS() {
    return io('http://localhost:3000')
}

export default connectWS
