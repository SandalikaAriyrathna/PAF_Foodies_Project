import React, { Component } from 'react';
import './MainContent.css';
import Grid from '@material-ui/core/Grid';
import StatusBar from '../StatusBar/StatusBar';
import MainPage from '../MainPage/MainPage';
import LeftBar from '../leftBar/LeftBar';
import RightBar from '../rightBar/RightBar';
// import InfoSection from '../InfoSection/InfoSection';
// import Suggestions from '../Suggestions/Suggestions';

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={2} style={{ display: 'flex', marginRight: '120px' }}>
            <LeftBar />
          </Grid>
          <Grid item xs={6} className="maincontent__container">
            <div>
              <StatusBar />
              <MainPage />
            </div>
          </Grid>
          <Grid item xs={3}>
            <RightBar />
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </div>
    );
  }
}

export default MainContent;
