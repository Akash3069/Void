const express = require('express')
const app = express()
const port = 3001
const http = require("http")
const { Server } = require("socket.io");
const cors = require("cors")
app.use(cors());
const server = http.createServer(app)

const io = new Server(server,{
    cors :{
        origin :"http://localhost:3000",
        method : ["GET","POST"],
    }
})
const users ={};
const socketRoomMap = {};
 io.on("connection",(socket)=>{
    console.log("yo");
    socket.on("join_room",(data)=>
    {
        // console.log(data)
        socket.join(data)
        console.log(data)
        socket.emit("room_name",data)
       
        // socketRoomMap[socket.id] = data;
        // const usersIntheRoom = users[data].filter((id)=>id!==socket.id);
        // console.log(users)
        // socket.emit('all-users',usersIntheRoom);
        // console.log(users[data]) 
    })
    socket.on("send_data",(data)=>
    {
        // console.log(data.text,data.room)
        // socket.broadcast.emit("receive_data",data)
        
        socket.to(data.room).emit("receive_data",data.text)
        
        // return () => socket.emit('end');
        
    })
    // socket.on("signal",(data)=>
    // {
    //     // console.log(data); 
    // })
    // socket.on("user_name",(data)=>
    // {
    //     socket
    // })
    socket.on("leave_room",(data)=>
    {
        socket.leave(data);
    })
    socket.on('disconnect', () => {
        console.log('User disconnected');
        console.log('User disconnected');
        // users[roomId]="";
      });
    
 })
app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})