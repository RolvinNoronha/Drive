import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

type modalProps = {
    type: string,
    setModal: React.Dispatch<React.SetStateAction<any>>
}



const Modal = ({ type, setModal } : modalProps) => {

    const [spin, setSpin] = useState<boolean>(false);
    const [video, setVideo] = useState<File | null>();
    const [cookies, removeCookie] = useCookies<any>([]);
    const [caption, setCaption] = useState<string>("");

    console.log(cookies);

    
    const handleChange = (e : any) => setVideo(e.target.files?.[0])
    
    const upload = async (e : any)  => {
        e.preventDefault();

        const formData = new FormData();
        if (video) {
            formData.append("file", video);
            formData.append("uid", cookies.uid);
            formData.append("caption", caption);
        }

        axios.post("http://localhost:5000/upload", formData)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })

        setVideo(null);
        setCaption("");
        setSpin(false);
        setModal(false);
    }

    return (
        <div id="myModal" className="modal">

            <div className="modal-content">
                <div className="modal_close">
                    <span onClick={() => setModal(false)} className="close">&times;</span>
                </div>
                <h1 className="modal_title">Upload {type}</h1>
                <label htmlFor="caption">Enter a Caption</label>
                <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)}/>
                <input type="file" accept="video/*" onChange={handleChange} />
                {spin ?
                    <div className="loader"></div> 
                : 
                    <button className="signin_button" onClick={upload}>Upload</button>
                }
            </div>
             
        </div>
    )
}


export default Modal;