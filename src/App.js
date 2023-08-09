import io from "socket.io-client"
import './App.css';
import { useState } from "react";
import Chats from "./Chats";
import Title from "./Title";
import Navbar from "./Navbar"
import Footer from "./Footer";
const socket=io.connect("https://chatapp-backend-9b3p.onrender.com");
function App() {
  const [username, setusername] = useState("")
  const [roomname, setroomname] = useState("")
  const [login, setlogin] = useState(false)
  

function handlejoin(){
  if(username!==""&&roomname!==""){
    socket.emit("join",roomname);
    setlogin(true);
  }
}
  
  return (
    <>
    <Navbar/>
    <div className="App">
      
      {login===false?<Title/>:""}
      
      {login===false ? <div className="loginbox">
      
        <h1>Chat room</h1>
        <input className="username" type="text" placeholder="Username" onChange={(e)=>{setusername(e.target.value)}}/>
        <input className="roomname" type="text" placeholder="Room-name" onChange={(e)=>{setroomname(e.target.value)}}/>
        <button className="joinbtn btn btn-outline-dark" onClick={handlejoin} >Join Room</button>
        </div>:<Chats socket={socket} username={username} roomname={roomname}/>}
     


      
      
    </div>
    <Footer/>
    </>
  );
}

export default App;
