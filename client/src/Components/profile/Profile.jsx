import './p1.css';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import Post from '../Post/Post';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Chip, Modal, TextField, Typography } from '@mui/material';

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

const Profile = () => {
  const correntUser = JSON.parse(localStorage.getItem('users')).uid;
  console.log(correntUser);
  const [user, setUser] = useState([]);
  console.log(user);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/users/${correntUser}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(data);
      });
  }, []);

  // edit user
  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      name,
      userName,
    };

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(payload),
    };
    fetch(`http://localhost:8080/users/update/${user.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('User updated successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  // delete user
  const handleLogout = () => {
    localStorage.removeItem('users');
  };

  const handleDeleteProfile = () => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    fetch(`http://localhost:8080/api/users/delete/${user.id}`, requestOptions)
      .then((response) => {
        // handle success
        console.log('User deleted successfully');
        window.location = '/';
        handleLogout();
      })
      .catch((error) => {
        // handle error
        console.error(error);
      });
  };

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        {user.profilePicture ? (
          <img src={user.profilePicture} alt="" className="profilePic" />
        ) : (
          <img
            src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
            className="profilePic"
          />
        )}
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{user.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{user.userName}.dev</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />

            <EditIcon onClick={() => setOpenModal(true)} />
            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {/* add the form for editing the user's details here */}
                <form onSubmit={handleSubmit}>
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                  >
                    Edit Profile Name
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
                    variant="outlined"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                    variant="outlined"
                    type="text"
                    value={userName}
                    id="userName"
                    name="userName"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <br />
                  <br />
                  <Button type="submit" style={{ float: 'right' }}>
                    <Chip label="Update" variant="outlined" />
                  </Button>

                  {/* add input fields for other editable details here */}
                  {/* <button type="submit">Save</button> */}
                </form>
              </Box>
            </Modal>
            <DeleteIcon onClick={handleDeleteProfile} />
          </div>
        </div>

        <Post />
      </div>
    </div>
  );
};

export default Profile;
