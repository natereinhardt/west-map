<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  <!-- jQuery -->
  <style type="text/css">
  body { margin-top:20px; }
  .panel-body:not(.two-col) { padding:0px }
  .glyphicon { margin-right:5px; }
  .glyphicon-new-window { margin-left:5px; }
  .panel-body .radio,.panel-body .checkbox {margin-top: 0px;margin-bottom: 0px;}
  .panel-body .list-group {margin-bottom: 0;}
  .margin-bottom-none { margin-bottom: 0; }
  .panel-body .radio label,.panel-body .checkbox label { display:block; }
  /* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}


/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #DD4B39;
}
.loginBtn--google:before {
  border-right: #BB3F30 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #E74B37;
}
</style>
<?php
include_once('google_oauth_config.php');
?>
</head>
<body class="">
  <div class="container">
    <h2>PHP Google OAuth 2.0 Login</h2>
    <div class="well">
        <?php if (isset($googleAuthUrl)): ?>
      <form action="<?php echo $googleAuthUrl; ?>" method="post">
      <button type="submit" class="loginBtn loginBtn--google">
      Login with Google
    </button>
    </form>
        <?php else: ?>
      <h3>Successfully! Authenticated</h3>
        <?php endif ?>
      </div>

  </div>
</body>
</html>