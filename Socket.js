const WebSocket = require('ws');
const http = require("http");
const express = require("express");
const { Server } = require('socket.io')
const app = express();
const server = http.createServer(app);
const io = new Server(server)
const webSocketServer = new WebSocket.Server({ server });

const totalws = new Map();
process.setMaxListeners(0);
console.log("**********************************************\n*         Moomoo.io Peanut Mod Socket        *\n**********************************************")

/*const socket = new WebSocket("wss://Peanut-Mod-Handler")

socket.on('connection', ws => {
    console.log("New Connection")
})*/
function sendall(cmd,msg){
    totalws.forEach(ws => {
        ws.send(cmd+" "+msg)
    })
}
webSocketServer.on('connection', ws => {
    totalws.set(ws,ws)
   // totalws.set(ws,ws)
    ws.send(`Socket Handler : ✅`);
    ws.on('message', msg => {
        const prefix = "!"
        const args = msg.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        if(cmd == "kick"){
            sendall(cmd,args[0])
        }else if(cmd == "say"){
            sendall(cmd,args[0])
        }else if(cmd == "check"){
            sendall(cmd)
        }else if(cmd == "blacklist"){
            sendall(cmd,args[0])
        }
    })
});
server.listen(8088, () => 
console.log("PeanutMod Socket Online ✅"),
)
