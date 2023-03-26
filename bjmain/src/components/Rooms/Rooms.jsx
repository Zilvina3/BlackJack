import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { rooms } from "../../config";
import { roomsChat } from "../../config";
import './Rooms.css'





const Rooms = () => {

    const navigate = useNavigate();
    const token =localStorage.getItem('token');

    const[roomsChatText, setRoomsChatText] = useState('')

    useEffect(() => {
            axios.get(rooms, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => console.log('rooms: ', res))
            .catch(error => {
                console.log(error.response.statusText)      
                navigate('/login')
                return
            })
    }, [])

    useEffect(() => {
        axios.get(roomsChat, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => {
           console.log('chat: ', res) 
           setRoomsChatText(res.data)
        })
        .catch(error => {
            console.log(error.response.statusText)      
            navigate('/login')
            return
        })
}, [])

    console.log(roomsChatText)

    return(
        <div>
            <h1>Rooms</h1>
            <div className="main_chat_wrap">
                <div className="chat_wrap">
                    <div className="chat_box">
                {roomsChatText && roomsChatText.map((element, key) => {
                    return(
                      <p key={key}>
                        <span className="chat_user">{`${element.userName}:`}</span><br/><span className="chat_message">{`${element.message}`}</span>
                    </p>  
                    )                   
                })}
                </div>             
            </div> <form className="chat_send_wrap" onSubmit={(e) => {
                e.preventDefault();

                console.log(e.target.message.value)
            }}>
                    <textarea name="message" id="message" placeholder="Your message . . . "/>
                    <button type="submit">Send</button>
                </form>           
            </div>
                
        </div>
    )
}

export default Rooms;