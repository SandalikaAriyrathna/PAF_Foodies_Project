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
import { storage } from '../firebase';
import uploadimage from '../../images/statusadd.png';
import './AddStatus.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: '10px',
};

class AddStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusList: [],
      open: false,
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch('http://localhost:8080/stories')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ statusList: data._embedded.stories });
      });
  };

  handleOpen = () => {
    console.log('open', this.state.open);
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
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

    var uploadTask = storage.ref('stories').child(file.name).put(file);

    uploadTask.on(
      'state_changed',
      function (snapshot) {},
      function (error) {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);

          let payload = {
            storyId: Math.floor(Math.random() * 100000).toString(),
            userId: JSON.parse(localStorage.getItem('users')).uid,
            path: downloadURL,
            title: this.state.title,
            timeStamp: new Date().getTime(),
          };
          console.log(payload.userId);
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          };

          fetch('http://localhost:8080/api/stories', requestOptions)
            .then((response) => response.json(), window.location.reload())
            .then((data) => {
              this.getData();
              this.setState({ open: false });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    );
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.handleOpen}
          style={{ border: '1px solid', padding: '62px 40px 65px 40px' }}
        >
          <img
            className="statusbar__upload"
            alt="uploadimage"
            src={uploadimage}
            width="20px"
            height="20px"
            paddingTop="20px"
          />
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
                        value={this.state.title}
                        onChange={this.handleTitleChange}
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
export default AddStatus;
