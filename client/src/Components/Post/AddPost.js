import React, { Component } from 'react';
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  Box,
  TextField,
  Chip,
} from '@material-ui/core';
import uploadImage from '../../images/upload.png';
import { storage, auth } from '../../Components/firebase';
import './share.css';
import Image from '../../assets/img.png';
import Map from '../../assets/map.png';
import Friend from '../../assets/friend.png';

import './Post.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
};

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postArray: [],
      progressBar: '',
      open: false,
    };
  }
  handleOpen = () => {
    console.log('open', this.state.open);
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.getPost();
  }

  getPost = () => {
    //API
    const thisContext = this;

    fetch('http://localhost:8080/post')
      .then((response) => response.json())
      .then((data) => {
        thisContext.setState({ postArray: data });
      });
  };

  handleCaptionChange = (event) => {
    this.setState({ caption: event.target.value });
  };

  handleFileChange = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { file } = this.state;

    if (!file) {
      alert('Please select a file');
      return;
    }

    this.upload();
  };

  upload = () => {
    let image = this.state.file;
    const thisContext = this;
    if (image == null || image === undefined) return;

    var uploadTask = storage.ref('images').child(image.name).put(image);
    uploadTask.on(
      'state_changed',
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        thisContext.setState({ progressBar: progress });
      },
      function (error) {},
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log(downloadURL);

          let payload = {
            postId: Math.floor(Math.random() * 100000).toString(),
            userId: JSON.parse(localStorage.getItem('users')).uid,
            postPath: downloadURL,
            caption: thisContext.state.caption,
            timeStamp: new Date().getTime(),
            likeCount: 0,
          };

          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          };

          fetch('http://localhost:8080/post', requestOptions)
            .then((response) => response.json(), window.location.reload())
            .then((data) => {
              console.log(data);
              thisContext.getPost();
            })
            .catch((error) => {});
        });
      }
    );
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleOpen}>
          <img className="mainpage__uploadicon" src={uploadImage} alt="" />
        </Button>
        <Modal
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <form onSubmit={this.handleSubmit}>
            <Fade in={this.state.open}>
              <Box sx={style}>
                <div className="share">
                  <div className="container">
                    <div className="top">
                      <img src="" alt="" />
                      <input
                        type="text"
                        placeholder={`What's on your mind ?`}
                        value={this.state.caption}
                        onChange={this.handleCaptionChange}
                      />
                    </div>
                    <hr />
                    <div className="bottom">
                      <div className="left">
                        <input
                          type="file"
                          id="file"
                          style={{ display: 'none' }}
                          onChange={this.handleFileChange}
                        />
                        <label htmlFor="file">
                          <div className="item">
                            <img src={Image} alt="" />
                            <span>Add Image</span>
                          </div>
                        </label>
                        <div className="item">
                          <img src={Map} alt="" />
                          <span>Add Place</span>
                        </div>
                        <div className="item">
                          <img src={Friend} alt="" />
                          <span>Tag Friends</span>
                        </div>
                      </div>
                      <div className="right">
                        <button type="submit">Share</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </Fade>
          </form>
        </Modal>
      </div>
    );
  }
}
export default AddPost;
