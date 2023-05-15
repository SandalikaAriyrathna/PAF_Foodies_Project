import React, { Component } from 'react';
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  Box,
  TextField,
  Avatar,
  Chip,
} from '@material-ui/core';
import { storage } from '../firebase';
import uploadimage from '../../images/statusadd.png';
import './AddStatus.css';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '10px',
};

class EditStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusList: [], // your status list data
      open: false, // for controlling modal
      selectedStatus: [], // to store the selected status object
      title: '', // to store the title
      file: null, // to store the uploaded file
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
        console.log(this.state.statusList + '1111133333');
      });
  };

  // getData = () => {
  //   fetch('http://localhost:8080/stories')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       const statusList = data._embedded.stories;
  //       const userIds = statusList.map((status) => status.userId);
  //       console.log(userIds);
  //       this.setState({ statusList: statusList });
  //     });
  // };

  handleOpen = (status) => {
    console.log('status:', status);
    console.log(localStorage.getItem('users'));
    this.setState({
      open: true,
      selectedStatus: {
        ...status,
        id: status._id,
        userId: status.userId,
      },
      title: status.title,
    });
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

  handleSubmit = (id) => {
    let payload = {
      title: this.state.title,
    };
    console.log(payload.userId);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };

    fetch(`http://localhost:8080/api/update/${id}`, requestOptions)
      .then((response) => response.json(), window.location.reload())
      .then((data) => {
        this.getData();
        this.setState({ open: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:8080/api/delete/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.info('Story deleted successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting story:', error);
      });
  };

  render() {
    return (
      <div>
        {this.state.statusList.map((item, index) => (
          <Button onClick={() => this.handleOpen(item)}>
            <div className="status">
              <Avatar className="statusbar__status" src={item.path} />
              <div className="statusbar__text">{item.userName}</div>
            </div>
          </Button>
        ))}

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
                <div>
                  <h2 id="transition-modal-title">My Status</h2>
                  {this.state.selectedStatus && (
                    <img
                      className="statusbar__statusedit"
                      src={this.state.selectedStatus.path}
                    />
                  )}

                  <TextField
                    id="outlined-multiline-flexible"
                    label="Title"
                    multiline
                    maxRows={4}
                    style={{ marginTop: '30px', marginBottom: '30px' }}
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                  />
                </div>

                {this.state.selectedStatus.userId ===
                JSON.parse(localStorage.getItem('users')).uid ? (
                  <div style={{ float: 'right' }}>
                    <Button type="submit">
                      <Chip
                        label="Update"
                        onClick={() =>
                          this.handleSubmit(this.state.selectedStatus.storyId)
                        }
                        variant="outlined"
                      />
                    </Button>
                    <Button
                      type="button"
                      onClick={() =>
                        this.handleDelete(this.state.selectedStatus.storyId)
                      }
                    >
                      <Chip
                        label="Delete"
                        variant="outlined"
                        style={{ float: 'right' }}
                      />
                    </Button>
                  </div>
                ) : (
                  <span></span>
                )}
              </Box>
            </Fade>
          </form>
        </Modal>
      </div>
    );
  }
}
export default EditStatus;
