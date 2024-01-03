const http = require('http');
const app = require('./app');
const socketIo = require('socket.io');

const port = process.env.PORT; 

const server = http.createServer(app);

const users = [{}];

const io = socketIo(server);

io.on("connection", (socket)=> {
    console.log("New Connection");

    socket.on('joined', ({user})=> {
        users[socket.id] = user;
        console.log(`${user} has joined`);
        
        socket.broadcast.emit('userJoined', {user: "Admin", message: `${users[socket.id]} has joined`});
        socket.emit('welcome', {user: "Admin", message: `Welcome to the chat ${users[socket.id]}`});
    });

    socket.on('message', ({id, message})=> {
        io.emit('sendMessage', { user: users[id], message, id });
    });

    socket.on('disconnect', ()=> {
        socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left` });
        console.log("user left");
    });

});

// testing api
app.get("/", (req, res)=> {
    res.send("Working fine...");
});

server.listen(port, ()=> {
    console.log(`Server is working on port http://localhost:${port}`);
});
