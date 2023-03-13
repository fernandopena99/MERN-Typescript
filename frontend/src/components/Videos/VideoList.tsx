import { useEffect, useState } from "react";
import { Video } from "./Video";
import * as videoService from "./VideoService";
import { VideoItem } from "./VideoItem";

const VideoList = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const loadVideos = async () => {
    const res = await videoService.getVideos();

    const formatedVideo = res.data.map(video => {
      return{
        //Esto es para que se ordenen segun la fecha, se ordena el que se agrega ultimo, pasa a la primera posicion
        ...video,
        createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
        updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date() 
      }
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    setVideos(formatedVideo);
  };
  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="row">
      {videos.map((video) => {
        return <VideoItem video={video} key={video._id} loadVideos={loadVideos}/>;
      })}
    </div>
  );
};

export default VideoList;
