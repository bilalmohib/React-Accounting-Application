import React, { useState, useEffect } from 'react'

import firebase from '../../firebase/index';
import firebaseAuth from 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import "firebase/firestore"
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      isSignedIn: false,
    }
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }

  componentDidMount = () => {

    // firebase.firestore().collection('things')
    //   .get()
    //   .then(snapshot => {
    //     let data = [];
    //     snapshot.forEach(element => {
    //       data.push(Object.assign({
    //         id: element.id
    //       }, element.data()))
    //     })
    //     console.log("data=> ", data)
    //   }).catch(err => {
    //     console.log(err)
    //   })


    firebase.auth().onAuthStateChanged(user => {
      // this.setState({ isSignedIn: !!user })
      // console.log("user", user)

      // var positiono = {};
      // if ('geolocation' in navigator) {
      //   // console.log("Geolocation is Available");
      //   navigator.geolocation.getCurrentPosition((position) => {
      //     positiono = position
      //     //  console.log("Latitude==>",position.coords.latitude);
      //     //  console.log("Longitude==>",position.coords.longitude);
      //   })
      // }
      // else {
      //   alert("Geolocation is not supported by this browser.");
      // }

      this.setState({ isSignedIn: !!user })
      // console.log("user", user)

      if (this.state.isSignedIn == true) {
      }
      else {
        console.log("Not signed in")
      }
    })

    //console.log("User_Data==> ", user.providerData[0])
    //   console.log("Simple User===>",this.state.user_data);
  }

  componentDidUpdate = () => {
    console.log(this.state.isSignedIn)
  }

  // googleSignin = () => {
  //   const auth = firebase.auth();

  //   auth.signInWithPopup(provider)
  //     .then((result) => {
  //       var credential = result.credential;

  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       var token = credential.accessToken;
  //       // The signed-in user info.
  //       var user = result.user;
  //       alert(user)
  //       // ...
  //     }).catch((error) => {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       // The email of the user's account used.
  //       var email = error.email;
  //       // The firebase.auth.AuthCredential type that was used.
  //       var credential = error.credential;
  //       // ...
  //     });

  //   // auth.onAuthStateChanged(user => {
  //   //   if (user) {
  //   //     alert("Signed in successfully==> ", user.displayName);

  //   //   } else {
  //   //     console.log('Not signed in');
  //   //   }
  //   // });
  // }
  render() {
    if (this.state.isSignedIn == true) {
      const pathname = window.location.pathname;
      if (pathname == '/') {
        if (this.state.user_data.name != undefined) {
          //Sending the data
          const db = firebase.firestore();
          let name = this.state.user_data.name;
          let thingsRef = db.collection(`Users/Bio/${name}`);
          thingsRef.add(this.state.user_data).then(() => {
            console.log("Data sent");
            //alert("Data Sent Successfully.")
          })
          alert("Move to main")
          //Sending the data
          // Router.push('/main')
        }
      }
    }
    return (
      <div>
        <main id="homeMainBody">
          <h1 className="bg-light text-center headingstaff text-warning bg-light mt-3">STAFF MANAGER</h1>
          <section className="login-block">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <form className="md-float-material form-material" action="#" method="POST">
                    <div className="auth-box card">
                      <div className="card-block">
                        <div className="row">
                          <div className="col-md-12">
                            <h3 className="text-center heading">STAFF MANAGER</h3>
                          </div>
                        </div>
                        <div className="or-container">
                          <div className="line-separator" />
                          {/* <div className="or-label">or</div> */}
                          <h5>Staff Login</h5>
                          <div className="line-separator" />
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            {(this.state.isSignedIn) ? (
                              <>
                                <div className="text-center">
                                  <div id="loader"></div>
                                </div>
                                <br />
                                <div className="animate-bottom text-center">
                                  <h2>You are already signed In</h2>
                                  <p>Please wait you will be re directed to the projects soon......</p>
                                </div>
                              </>
                            ) : (
                              <StyledFirebaseAuth
                                uiConfig={this.uiConfig}
                                firebaseAuth={firebase.auth()}
                              />
                            )}
                          </div>
                        </div>
                        <p className="text-inverse text-center">Dont have an account? <i className="text-primary">Click on above sign in button to create account.</i> </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }
}
export default Login;