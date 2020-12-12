import Peer from "peerjs";
console.log("hello world!");

const friendPeerIdText = document.getElementById(
  "friend-peer-id"
) as HTMLInputElement;
const connectToPeer = document.getElementById(
  "connect-peer"
) as HTMLButtonElement;
const sendTestBtn = document.getElementById("send-test") as HTMLButtonElement;

const myIdText = document.getElementById("my-id") as HTMLHeadingElement;

myIdText.onclick = async function (ev) {
  await navigator.clipboard.writeText(myIdText.innerHTML);
  myIdText.style.color = "blue";
  setTimeout(() => {
    myIdText.style.color = "black";
  }, 100);
};

let peer = new Peer({
  host: "localhost",
  port: 3000,
});

let connn: Peer.DataConnection

peer.on("open", (id) => {
  console.log(`our peer opened`);
  myIdText.innerHTML = id;
  myId = id;
});

peer.on("connection", (conn) => {
  console.log(`connection established !`);
  
  conn.on("data", (data) => {
    console.log(`incoming data`);
    console.log(data);
  });
  console.log(`test from ${myId}`)

});

peer.on("error", (err) => {
  console.log(`report error : ${err}`);
});

let myId: string;
let friendId: string;

connectToPeer.addEventListener("click", function (ev) {
  friendId = friendPeerIdText.value;

  connn = peer.connect(friendId);
  console.log(`connected to peer !`);
});

sendTestBtn.onclick = function(ev) {
    console.log(`should send something !`)
    connn.send('hello')
}
