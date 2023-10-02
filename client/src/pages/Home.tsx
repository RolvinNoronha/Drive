import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Modal from "../components/Modal";
import Video from "../components/Video";

type modalType = {
    open: boolean,
    type: string,
}

type videoDataType = {
  caption: string;
  uploadDate: string;
  _id: string;
  videoName: string;
}

const Home = () => {    

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies<any>([]);
    const [videoData, setVideoData] = useState<videoDataType[]>([]);
    const [username, setUsername] = useState("");
    const [modal, setModal] = useState<modalType>({ open: false, type: ""});

    useEffect(() => {
        const verifyCookie = async () => {

            if (!cookies.token) {
                navigate("/");
            }

            const { data } = await axios.post(
                "http://localhost:5000",
                {},
                { withCredentials: true }
            );

            const { status, user } = data;
            setUsername(user);
            if (!status) {
                removeCookie("token", []);
                removeCookie("uid", []);
                navigate("/");
            }
        };

        const getData = async () => {
            
            const data = await axios.get("http://localhost:5000/getData", {
                params: {
                    uid: cookies.uid,
                }
            })
            
            const DATA = [...data.data];
            setVideoData(DATA);
        }


        verifyCookie();
        getData();
    }, [cookies, removeCookie, modal, videoData]);
    
    const Logout = () => {
        removeCookie("token", []);
        navigate("/");
    };

    return (
        <>
            <div className="header">
                <h1 className="header_title">Drive</h1>
                <div className="header_links">
                    {/* <button onClick={() => setModal({ ...modal, open: true, type: "Image"})}>Upload Image</button> */}
                    <button className="header_link" onClick={() => setModal({ ...modal, open: true, type: "Video"})}>Upload Video</button>
                    <button className="header_link" onClick={Logout}>Logout</button>
                </div>
            </div>

            {modal.open ? <Modal type={modal.type} setModal={setModal} /> : null}

            <div className="videos">
            {
                videoData?.map((data) => {
                    return <Video key={data._id} name={data.videoName} caption={data.caption} date={data.uploadDate} />
                })
            }
            </div>
        </>
    );
};

export default Home;