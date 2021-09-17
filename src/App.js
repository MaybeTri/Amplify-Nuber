import react from 'react';
import './App.css';
import { useForm } from "react-hook-form";
import { Auth } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

var AWS = require('aws-sdk');



function App() {
  const { btnFile, handleSubmit } = useForm();

  <script src="https://sdk.amazonaws.com/js/aws-sdk-2.989.0.min.js"></script>
  
  AWS.config.region = 'us-east-1'; // 1. Enter your region

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:7ac19166-8587-4786-8f74-5da3c9aedcc0' // 2. Enter your identity pool
  });

  AWS.config.credentials.get(function(err) {
      if (err) alert(err);
      console.log(AWS.config.credentials);
  });

  var bucketName = 'amplify-reactamplified-master-101003-deployment'; // Enter your bucket name
  var bucket = new AWS.S3({
      params: {
          Bucket: bucketName
      }
  });

  const onSubmit = (data) => {

    
    if (data) {

      results.innerHTML = '';
      var objKey = 'testing/' + data.name;
      var params = {
          Key: objKey,
          ContentType: data.type,
          Body: data,
          ACL: 'public-read'
      };

      bucket.putObject(params, function(err, data) {
          if (err) {
              results.innerHTML = 'ERROR: ' + err;
          } else {
              listObjs();
          }
      });
  } else {
      results.innerHTML = 'Nothing to upload.';
  }
    console.log(data);
  };
  var results = document.getElementById('results');
 
  function listObjs() {
      var prefix = 'testing';
      bucket.listObjects({
          Prefix: prefix
      }, function(err, data) {
          if (err) {
              results.innerHTML = 'ERROR: ' + err;
          } else {
              var objKeys = "";
              data.Contents.forEach(function(obj) {
                  objKeys += obj.Key + "<br>";
              });
              results.innerHTML = objKeys;
          }
      });
  }



  return (
    <div className="App">
    <header>
    <ul>
      <li><a href="">Home</a></li>
      <li><a href="">Driver Profile</a></li>
      <li><a href="">Contact Us</a></li>
      <li><a href="">Switch to Customer</a></li>
      <li><a href="">Sign Out</a></li>

    </ul>
    </header>

    <body>
      <h1>Welcome New Driver, <br/>Please upload your ID below</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input ref={btnFile} type="file" name="picture" />
      <button>Submit</button>
      </form>
      <div id="results"></div>
    </body>
  
    </div>
  );
}

export default App;
