import ReactPlayer from "react-player";
import {  useSearchParams } from "react-router-dom";


const VideoPlay = () => {

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");


  return (
    <div className="content">
      <ReactPlayer url={`${process.env.REACT_APP_CLOUDFRONT_URL}/${id}/${name}`} controls={true}></ReactPlayer>
    </div>    
  )
}

export default VideoPlay