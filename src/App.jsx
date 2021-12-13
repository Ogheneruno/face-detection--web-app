import { useEffect, useState } from "react";
import "./App.css";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";
import Me from "./img/m2.jpg";
import { IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));



function App() {
  const classes = useStyles();
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage({
          url: img.src,
          width: img.width,
          height: img.height,
        });
      };
    };

    file && getImage();
  }, [file]);

  return (
    <div>
      <Navbar />
      {image ? (
        <NewPost image={image} />
      ) : (
        <div className="newPostCard">
          <div className="addPost">
            <img
              src={Me}
              alt="Me..."
              className="avatar"
            />
            <div className="postForm">
              <input
                type="text"
                placeholder="Upload A Picture"
                className="postInput"
              />
              <label htmlFor="file">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
                <button style={{backgroundColor: 'blue'}}>Send</button>
              </label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                id="file"
                style={{ display: "none" }}
                type="file"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
