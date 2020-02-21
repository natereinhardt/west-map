<?php
session_start();

//Google API PHP Library includes
//require_once '/Applications/XAMPP/xamppfiles/htdocs/google-api-php-client-2.4.0/google-api-php-client-2.4.0/vendor/autoload.php';
require_once '\xampp\htdocs\google-api-php-client-master\google-api-php-client-master\src\Google\autoload.php';
//require_once '/../../vendor/autoload.php';

// Set config params to acces Google API
 $client_id = '200087147717-s631mincki9phknd5g3m5opf2c32k7oc.apps.googleusercontent.com';
 $client_secret = 'NP25U1eAQ2s_NrarAr42V_2f';
 $redirect_uri = 'http://localhost/home.php';
 
//Create and Request to access Google API
$client = new Google_Client();
//$client->setAuthConfig('client_secret.json');
$client->setApplicationName("Google OAuth Login With PHP");
$client->setClientId($client_id);
$client->setClientSecret($client_secret);
$client->addScope('https://www.googleapis.com/auth/cloud-platform');

$client->setRedirectUri($redirect_uri);

$objRes = new Google_Service_Oauth2($client);
//echo $_GET['code'];
//Add access token to php session after successfully authenticate
if (isset($_GET['code'])) {
  echo 'Hello 2';
  $client->authenticate($_GET['code']);
  $_SESSION['access_token'] = $client->getAccessToken();
  header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
}

//set token
if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {  
  $client->setAccessToken($_SESSION['access_token']);
}

//store with user data
if ($client->getAccessToken()) {
  $userData = $objRes->userinfo->get(); 
  
  if(!empty($userData)) {
  //insert data into database
  }
  $_SESSION['access_token'] = $client->getAccessToken();
} else {
  $googleAuthUrl  =  $client->createAuthUrl();
}
//Logout
if (isset($_REQUEST['logout'])) {
    unset($_SESSION['access_token']);
    $client->revokeToken();
    header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL)); //redirect user back to page
  }
/*
<script>

// Render Google Sign-in button
function renderButton() {
  gapi.signin2.render('gSignIn', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
  });
}

// Sign-in success callback
function onSuccess(googleUser) {
  // Get the Google profile data (basic)
  //var profile = googleUser.getBasicProfile();
  
  // Retrieve the Google account data
  gapi.client.load('oauth2', 'v2', function () {
      var request = gapi.client.oauth2.userinfo.get({
          'userId': 'me'
      });
      request.execute(function (resp) {
          // Display the user details
          var profileHTML = '<h3>Welcome '+resp.given_name+'! <a href="javascript:void(0);" onclick="signOut();">Sign out</a></h3>';
          profileHTML += '<img src="'+resp.picture+'"/><p><b>Google ID: </b>'+resp.id+'</p><p><b>Name: </b>'+resp.name+'</p><p><b>Email: </b>'+resp.email+'</p><p><b>Gender: </b>'+resp.gender+'</p><p><b>Locale: </b>'+resp.locale+'</p><p><b>Google Profile:</b> <a target="_blank" href="'+resp.link+'">click to view profile</a></p>';
          document.getElementsByClassName("userContent")[0].innerHTML = profileHTML;
          
          document.getElementById("gSignIn").style.display = "none";
          document.getElementsByClassName("userContent")[0].style.display = "block";
      });
  });
}

// Sign-in failure callback
function onFailure(error) {
  alert(error);
}

// Sign out the user
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
      document.getElementsByClassName("userContent")[0].innerHTML = '';
      document.getElementsByClassName("userContent")[0].style.display = "none";
      document.getElementById("gSignIn").style.display = "block";
  });
  
  auth2.disconnect();
}
</script>
*/
?>