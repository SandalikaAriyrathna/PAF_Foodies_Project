import React, { Component } from 'react';
import './Post.css';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Modal,
  Popover,
  TextField,
  Typography,
} from '@material-ui/core';
import love from '../../images/love.svg';
import comment from '../../images/comment.svg';
import share from '../../images/share.svg';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Iconify from '../iconify/Iconify.js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [],
      comment: '',
      caption: '',
      anchorEl: null,
      menuOpen: false,
      dialogOpen: false,
      openModalEdit: false,
      commentOpen: false,
      openModalEditComment: false,
      selectedComment: null, // to store the selected status object
      isLoggedIn: false, // default value
    };
    this.setOpen = this.setOpen.bind(this);
    this.setOpenComment = this.setOpenComment.bind(this);
  }

  handleCommentChange = (event) => {
    console.log(event.target.value);
    this.setState({ comment: event.target.value });
  };

  handleCaptionChange = (event) => {
    // console.log(event.target.value);
    this.setState({ caption: event.target.value });
  };

  handleOpenEdit = (event) => {
    this.setState({
      openModalEdit: true,
      caption: event.caption,
    });
  };

  handleCloseEdit = () => {
    this.setState({ openModalEdit: false });
  };

  handleOpenEditComment = (event) => {
    this.setState({
      openModalEditComment: true,
      comment: event.comment,
    });
  };

  handleCloseEditComment = () => {
    this.setState({ openModalEditComment: false });
  };

  setOpen(value) {
    this.setState({ menuOpen: value });
  }

  setOpenComment(value) {
    this.setState({ commentOpen: value });
  }

  handleOpenMenu = (event, id) => {
    this.setState({ anchorEl: event.currentTarget, menuOpen: true });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null, menuOpen: false });
  };

  handleOpenMenuComment = (event) => {
    this.setState({ anchorEl: event.currentTarget, commentOpen: true });
  };

  handleCloseMenuComment = () => {
    this.setState({ anchorEl: null, commentOpen: false });
  };

  componentDidMount() {
    this.getComments();
    // check if the user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem('users'));
    if (loggedInUser) {
      this.setState({ isLoggedIn: true });
    }
  }
  /////////////////////////////////////////////////////////////////////
  getComments = () => {
    fetch('http://localhost:8080/comments/' + this.props.id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ commentList: data });
        console.log(this.setState({ commentList: data }), '111111', data);
        console.log(this.state.commentList, '1222222');
      });
  };

  submitComments = (event) => {
    if (event.key === 'Enter') {
      let comment = event.currentTarget.value;
      if (comment != null || comment !== undefined) {
        let payload = {
          commentId: Math.floor(Math.random() * 1000000).toString(),
          userId: JSON.parse(localStorage.getItem('users')).uid,
          postId: this.props.id,
          timeStamp: new Date().getTime(),
          comment: comment,
        };

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        };

        fetch('http://localhost:8080/comments', requestOptions)
          .then((response) => response.json())
          .then((data) => {
            this.getComments();
          })
          .catch((error) => {});
      }
    }
  };
  //////////////////////////////////////////////////////////////////
  getPost = () => {
    fetch('http://localhost:8080/post' + this.props.id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data });
        console.log(data, 'zzz');
      });
  };

  // In the component that calls handleSubmitEditPost:
  handleSubmitEditPost = (id) => {
    let payload = {
      caption: this.state.caption,
    };
    console.log(id, payload, 'id and payload');
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };

    fetch(`http://localhost:8080/post/update/${id}`, requestOptions)
      .then((response) => response.json(), window.location.reload())
      // .then((response) => response.json())
      .then((data) => {
        this.getPost();
        this.setState({ openModalEdit: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDeletePost = (id) => {
    console.log(id);
    fetch(`http://localhost:8080/post/delete/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.info('Post deleted successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting Post:', error);
      });
  };
  /////////////////////////////////////////////////////////////////////

  handleSubmitComment = (id) => {
    let payload = {
      comment: this.state.comment,
    };
    console.log(payload.userId);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };

    fetch(`http://localhost:8080/comments/update/${id}`, requestOptions)
      .then((response) => response.json(), window.location.reload())
      .then((data) => {
        this.getComments();
        this.setState({ open: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDeleteComment = (id) => {
    console.log(id);
    fetch(`http://localhost:8080/comments/delete/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.info('Comment deleted successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting Comment:', error);
      });
  };

  /////////////////////////////////////////////////////////////////////
  render() {
    const { anchorEl: anchorElMenu, menuOpen } = this.state;
    const { anchorEl: anchorElComment, commentOpen } = this.state;
    return (
      <div className="post__container">
        {/* Header */}
        <div className="post__header">
          <Avatar className="post__image" src="" />
          <div className="post__username">{this.props.userName}</div>
          {this.props.userId ===
          JSON.parse(localStorage.getItem('users')).uid ? (
            <IconButton
              size="large"
              color="inherit"
              style={{ marginLeft: 'auto' }}
              onClick={this.handleOpenMenu}
            >
              <Iconify icon={'eva:more-vertical-fill'} />
            </IconButton>
          ) : (
            <span></span>
          )}
        </div>
        {/* Image */}
        <div>
          <h5>{this.props.caption}</h5>
          <img src={this.props.postImage} width="601px" alt="" />
        </div>
        {/* Analytics */}
        <div>
          <div style={{ marginLeft: '10px' }}>
            <img src={love} className="post_reactimage" alt="" />
            <img src={comment} className="post_reactimage" alt="" />
            <img src={share} className="post_reactimage" alt="" />
          </div>
          <div style={{ fontWeight: 'bold', marginLeft: '20px  ' }}>
            {this.props.likes} likes
          </div>
        </div>
        {/* Comment Section */}
        <div>
          {this.state.commentList.map((item, index) =>
            index < 4 ? (
              <div className="post_comment">
                {item.userName}: {item.comment}
                {item.userId ===
                JSON.parse(localStorage.getItem('users')).uid ? (
                  <IconButton
                    size="large"
                    color="inherit"
                    style={{ marginLeft: 'auto' }}
                    onClick={(event) => this.handleOpenMenuComment(event)}
                  >
                    <Iconify icon={'eva:more-vertical-fill'} />
                  </IconButton>
                ) : (
                  <span></span>
                )}
                <Popover
                  open={commentOpen}
                  anchorEl={anchorElComment}
                  onClose={this.handleCloseMenuComment}
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{
                    sx: {
                      p: 1,
                      width: 140,
                      '& .MuiMenuItem-root': {
                        px: 1,
                        typography: 'body2',
                        borderRadius: 0.75,
                      },
                    },
                  }}
                >
                  <MenuItem>
                    <Iconify
                      icon={'eva:edit-fill'}
                      sx={{ mr: 2 }}
                      onClick={() => this.handleOpenEditComment(item)}
                    />
                    Edit
                  </MenuItem>

                  <MenuItem sx={{ color: 'error.main' }}>
                    <Iconify
                      icon={'eva:trash-2-outline'}
                      sx={{ mr: 2 }}
                      onClick={() => this.handleDeleteComment(item.id)}
                    />
                    Delete
                  </MenuItem>
                </Popover>
                {/* comment */}
                {/* /////////////////////////////////////////////////////////////////////////////// */}
                {/* comment edit modal */}
                <Modal
                  open={this.state.openModalEditComment}
                  onClose={this.handleCloseEditComment}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      Edit Comment
                    </Typography>
                    <br />
                    <br />
                    <TextField
                      sx={{
                        mt: 2,
                        width: '500px',
                        marginBottom: '50px',
                      }}
                      style={{
                        marginLeft: 'auto',
                        marginRight: '80px',
                        width: '400px',
                      }}
                      id="name"
                      // value={item.comment}
                      value={this.state.comment}
                      label="Comment"
                      variant="outlined"
                      onChange={this.handleCommentChange}
                    />
                    <br />
                    <br />
                    <Button type="submit" style={{ float: 'right' }}>
                      <Chip
                        label="Update"
                        variant="outlined"
                        onClick={() => this.handleSubmitComment(item.id)}
                      />
                    </Button>
                  </Box>
                </Modal>
              </div>
            ) : (
              <span></span>
            )
          )}
          <input
            text="text"
            onKeyPress={this.submitComments}
            className="post__commentbox"
            placeholder="Add a comment..."
          />
        </div>
        {/* post */}
        {/* ///////////////////////////////////////////////////////////// */}
        <Popover
          open={this.state.menuOpen}
          anchorEl={this.state.anchorEl}
          onClose={this.handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              p: 1,
              width: 140,
              '& .MuiMenuItem-root': {
                px: 1,
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }}
        >
          <MenuItem>
            <Iconify
              icon={'eva:edit-fill'}
              sx={{ mr: 2 }}
              onClick={() => this.handleOpenEdit(this.props)}
            />
            Edit
          </MenuItem>

          <MenuItem sx={{ color: 'error.main' }}>
            <Iconify
              icon={'eva:trash-2-outline'}
              sx={{ mr: 2 }}
              onClick={() => this.handleDeletePost(this.props.Id)}
            />
            Delete
          </MenuItem>
        </Popover>
        {/* //////////////////////////////////////////////////////// */}
        {/* post edit modal */}
        <Modal
          open={this.state.openModalEdit}
          onClose={this.handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* <form onSubmit={this.handleSubmitEditPost}> */}
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Edit Caption
            </Typography>
            <br />
            <br />
            <TextField
              sx={{
                mt: 2,
                width: '500px',
                marginBottom: '50px',
              }}
              style={{
                marginLeft: 'auto',
                marginRight: '80px',
                width: '400px',
              }}
              id="name"
              value={this.state.caption}
              label="Caption"
              variant="outlined"
              onChange={this.handleCaptionChange}
            />
            <br />
            <br />
            <Button type="submit" style={{ float: 'right' }}>
              <Chip
                label="Update"
                variant="outlined"
                onClick={() => this.handleSubmitEditPost(this.props.Id)}
              />
            </Button>
          </Box>
          {/* </form> */}
        </Modal>
        {/* /////////////////////////////////////////////////////////////////////// */}
      </div>
    );
  }
}

export default Post;
