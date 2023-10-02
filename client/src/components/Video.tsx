//import videoDataType from "../pages/Home";

import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

type videoDataType = {
  name: string;
  caption: string;
  date: string;
}

const Video = ({ name , caption, date } : videoDataType) => {

  const [cookie] = useCookies();

  return (
      <div className="video">
        <Link 
          to={{
            pathname: "/video",
            search: `?id=${cookie.uid}&name=${name}`,
          }}
        >
          <img className="video_img" src={"https://addplaybuttontoimage.way4info.net/Images/Icons/25.png"} alt={"thumbnail"}/>
        </Link>
        <div className="video_data">
          <p className="video_caption">{caption}</p>
          <p className="video_date">{date}</p>
        </div>
      </div>
  )
}

export default Video