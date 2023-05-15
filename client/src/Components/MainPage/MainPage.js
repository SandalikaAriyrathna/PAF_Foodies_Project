import React, { Component } from 'react';
import './MainPage.css';
import Post from '../Post/Post';
// import uploadImage from '../../images/upload.png';
import { storage, auth } from '../firebase';
import AddPost from '../Post/AddPost';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postArray: [],
      progressBar: '',
    };
  }

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

  upload = (event) => {
    let image = event.target.files[0];
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
            .then((response) => response.json())
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
        <div className="mainpage__container" style={{ marginLeft: '-130px' }}>
          <div className="mainpage__divider"></div>
          <div className="fileupload">
            <label for="file-upload">
              <AddPost />
              {/* <img className="mainpage__uploadicon" src={uploadImage} alt="" /> */}
            </label>
            <input onChange={this.caption} id="cation" type="text" />

            <input onChange={this.upload} id="file-upload" type="file" />
          </div>
          <div className="mainpage__divider"></div>
        </div>
        <div className="upload_text">{this.state.progressBar}</div>
        {this.state.postArray.map((item, index) => (
          <Post
            Id={item.id}
            id={item.postId}
            userName={item.userName}
            postImage={item.postPath}
            caption={item.caption}
            likes={item.likeCount}
            userId={item.userId}
          />
        ))}
      </div>
    );
  }
}

export default MainPage;
