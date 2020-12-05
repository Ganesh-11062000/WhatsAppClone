import React, {useState, useEffect} from 'react';
import { Avatar } from '@material-ui/core'

import "./SidebarChat.css"
import db from '../firebase';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

function SidebarChat({addNewChat,id,name}) {

    const [seed,setSeed] = useState("");
    // const {roomId}  = useParams();

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Enter room name for Chat");

        if(roomName){
            //some db stuff here ...
            db.collection('rooms').add({
                name:roomName,
            })
        }
    }

    return !addNewChat?
    (
        
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>last message ...</p>
                    {console.log(id)}
                </div>
            </div>
        </Link>
    ):
    (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat;
