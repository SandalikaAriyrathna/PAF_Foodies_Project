import React, { Component } from 'react';
import './StatusBar.css';
import { Avatar } from '@material-ui/core';
import uploadimage from '../../images/statusadd.png';
import { storage, auth } from '../firebase';
import AddStatus from '../StatusModal/AddStatus';
import EditStatus from '../StatusModal/EditStatus';

class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusList: [],
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

  uploadStatus = (event) => {
    let image = event.target.files[0];
    const thisContext = this;
    if (image == null || image === undefined) return;

    var uploadTask = storage.ref('stories').child(image.name).put(image);
    uploadTask.on(
      'state_changed',
      function (snapshot) {},
      function (error) {},
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log(downloadURL);

          let payload = {
            storyId: Math.floor(Math.random() * 100000).toString(),
            userId: JSON.parse(localStorage.getItem('users')).uid,
            path: downloadURL,
            timeStamp: new Date().getTime(),
          };
          console.log(payload.userId);
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          };
          //   console.log(requestOptions);

          fetch('http://localhost:8080/api/stories', requestOptions)
            .then((response) => response.json(), window.location.reload())
            // setEvents(response.data.filter((item) => item.status === true))
            .then((data) => {
              thisContext.getData();
              window.location.reload();
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
        <div className="statusbar__container">
          <div className="fileupload">
            <AddStatus />
          </div>

          <EditStatus />
        </div>
      </div>
    );
  }
}

export default StatusBar;
