import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useState,useEffect } from "react";

const Chats = ({socket,username,roomname}) => {
    const [message, setmessage] = useState("")
    const [messagelist, setmessagelist] = useState([])

    const sendmessage =async()=>{
        if(message!==""){
            const messagedata={
                room:roomname,
                author:username,
                messages:message,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message",messagedata);
            setmessagelist((list)=>[...list,messagedata])
            setmessage("");
        }
    };


  


 
        
    useEffect(() => {
        socket.on("receive_message", (data) => {
            
          setmessagelist((list)=>[...list,data])
          
        });
       
      }, [socket]);
        
  


    return <div>
        <div className='header'><h3>Live Chat</h3></div> 
        <div className='body'>
           <ScrollToBottom className='scroll'>
            {messagelist.map(ele=>{
                return  <div id={username===ele.author?"you":"other"} className='maincontainer'>
                    
                    <h5 className='messages' >{ele.messages}</h5>
                    <p className='time'>{ele.time} : {ele.author}</p>
                </div> 
                    
                
            })}
            </ScrollToBottom>
        </div>
        <div className='footer'>
            <input className='messageinp' type='text' placeholder='message' value={message} onChange={(e)=>{setmessage(e.target.value)}}/>
            <button className='chatbtn' onClick={sendmessage}><i class="fa-solid fa-paper-plane"></i></button>
        </div>
    </div>;
}



export default Chats;