const app = require("express")();
const server = app.listen(3000, () => {});

const res = require("express/lib/response");
const SocketIO = require("socket.io");
// 서버 연결, path는 프론트와 일치시켜준다.
const io = SocketIO(server, {
  path: "/socket.io",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//* 웹소켓 연결 시
io.on("connection", (socket) => {
  console.log("접속", socket.id);
  //* 연결 종료 시
  socket.on("disconnect", () => {
    console.log("클라이언트 접속 해제", socket.id);
    clearInterval(socket.interval);
  });
  socket.on("chat-message", (msg) => {
    io.emit("chat-message", msg);
  });
  //* 에러 시
  socket.on("error", (error) => {
    console.error(error);
  });
  //* 클라이언트로부터 메시지 수신
  socket.on("reply", (data) => {
    // reply라는 이벤트로 송신오면 메세지가 data인수에 담김
    console.log(data);
  });

  //* 클라이언트로 메세지 송신
  socket.emit("news", "Hello Socket.IO"); // news라는 이벤트로 문자열을 포함하여 송신
});
