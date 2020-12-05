import React, {useState, useEffect} from 'react';
import "./Chat.css";
import {Avatar, IconButton} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

function Chat() {
    const [seed,setSeed] = useState("");
    const [input,setInput] = useState("");
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState("");
    const [messages,setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, [roomId]);

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => {
                setRoomName(snapshot.data().name);
            });

            db.collection('rooms')
                .doc(roomId)
                .collection("messages")
                .orderBy('timestamp','asc')
                .onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => 
                    doc.data()
                ))
            });
        }
    },[roomId]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('rooms')
            .doc(roomId)
            .collection("messages")
            .add({
                name:user.displayName,
                message:input,
                timestamp:new Date(),
            })
        
        setInput("");
    }

    return (
        <div className="chat">
            
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`} />
                
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen at {messages[messages.length-1].timestamp?.toDate()}</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton><SearchIcon/></IconButton>
                    <IconButton><AttachFileIcon/></IconButton>
                    <IconButton><MoreVertIcon/></IconButton>
                </div>

            </div>

            <div className="chat__body">

                {console.log(messages)}

                {messages.map((message) => (
                    <p className={`chat__message ${user.displayName === message.name && "chat__receiver"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toISOString()}</span>
                    </p>  
                ))}
                     
            </div>

            <div className="chat__footer">
                <IconButton><InsertEmoticonIcon/></IconButton>
                <IconButton><AttachFileIcon/></IconButton>
                <form>
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message"/>
                    <button type="submit" onClick={sendMessage}></button>
                </form>
                <IconButton><MicIcon/></IconButton>
   
            </div>
        </div>
    )
}

export default Chat;
