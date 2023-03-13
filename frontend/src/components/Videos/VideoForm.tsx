import { ChangeEvent, useState, useEffect } from "react";
import { Video } from "./Video";
import * as videoService from "./VideoService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { type } from "os";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type Params = {
  id: string;
};

const VideoForm = () => {
  const navigate = useNavigate();
  const params = useParams<Params>();

  const initialState = { title: "", description: "", url: "" };
  const [video, setVideo] = useState<Video>(initialState);

  const handleInputChange = (e: InputChange) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.id) {
      await videoService.createVideo(video);
      toast.success("New video added");
      setVideo(initialState);
    } else {
      await videoService.updateVideo(params.id, video);
    }

    navigate("/");
  };

  const getVideo = async (id: string) => {
    const res = await videoService.getVideo(id);
    const { title, description, url } = res.data;
    setVideo({ title, description, url });
  };

  useEffect(() => {
    if (params.id) {
      getVideo(params.id);
    }
  }, []);

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>New Video</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group row mb-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Write a title for this video"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.title}
                  autoFocus
                />
              </div>
              <div className="form-group row mb-3">
                <input
                  type="text"
                  name="url"
                  placeholder="https://ejemplo.com"
                  className="form=control"
                  onChange={handleInputChange}
                  value={video.url}
                />
              </div>
              <div className="form-group row mb-3">
                <textarea
                  name="description"
                  rows={3}
                  className="form-control"
                  placeholder="write a description"
                  onChange={handleInputChange}
                  value={video.description}
                ></textarea>
              </div>
              {params.id ? (
                <button className="btn btn-info row">Updated Video</button>
              ) : (
                <button className="btn btn-primary row">Create Video</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
