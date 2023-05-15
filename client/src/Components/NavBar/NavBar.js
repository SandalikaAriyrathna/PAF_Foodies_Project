import './navbar.scss';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import { Link } from 'react-router-dom';
// import { useContext } from 'react';
// import { DarkModeContext } from '../../context/darkModeContext';
// import { AuthContext } from '../../context/authContext';
import { Avatar } from '@material-ui/core';
import pp from '../../images/pp1.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
  // const { toggle, darkMode } = useContext(DarkModeContext);
  // const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <div style={{ textDecoration: 'none' }}>
          <span>Foodies</span>
        </div>
        <HomeOutlinedIcon />
        {/* {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )} */}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link to="/profile">
          <div className="user">
            <Avatar
              src={pp}
              className="navbar__img"
              style={{ maxWidth: '25px', maxHeight: '25px' }}
            />
            <span>John Doe</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;

// import React, { Component } from 'react';
// import './NavBar.css';
// import Grid from '@material-ui/core/Grid';
// import insta_log from '../../images/nav.png';
// import home from '../../images/home.svg';
// import message from '../../images/message.svg';
// import find from '../../images/find.svg';
// import react from '../../images/love.svg';
// import Avatar from '@material-ui/core/Avatar';
// import pp from '../../images/pp1.png';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

// class NavBar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return (
//       <div>
//         <div className="navbar__barContent">
//           <Grid container>
//             <Grid item xs={2}>
//               {' '}
//             </Grid>
//             <Grid item xs={3}>
//               <img
//                 className="navbar_logo"
//                 src={insta_log}
//                 width="200px"
//                 style={{ marginLeft: '-200px' }}
//               />
//             </Grid>
//             <Grid item xs={3}>
//               {/* <input
//                 text="text"
//                 className="navbar__searchBar"
//                 placeholder="Search"
//                 style={{ marginLeft: '-180px' }}
//               /> */}
//               <div className="search">
//                 <SearchOutlinedIcon />
//                 <input type="text" placeholder="Search..." />
//               </div>
//             </Grid>
//             <Grid item xs={3} style={{ display: 'flex', marginLeft: '100px' }}>
//               <img className="navbar__img" src={home} width="25px" />
//               <img className="navbar__img" src={message} width="25px" />
//               <img className="navbar__img" src={find} width="25px" />
//               <img className="navbar__img" src={react} width="25px" />
//               <Avatar
//                 src={pp}
//                 className="navbar__img"
//                 style={{ maxWidth: '25px', maxHeight: '25px' }}
//               />
//             </Grid>
//             <Grid item xs={1}></Grid>
//           </Grid>
//         </div>
//       </div>
//     );
//   }
// }

// export default NavBar;
