<?php
session_start();

require 'vendor/autoload.php';

use ReallySimpleJWT\Token;

$payload = [
    'UserIndexNum' => $_SESSION['UserIndexNum'],
    'FullName' => $_SESSION['FullName'],
    'Biodata' => $_SESSION['Biodata'],
    'Mobile1' => $_SESSION['Mobile1'],
    'Mobile2' => $_SESSION['Mobile2'],
    'Address' => $_SESSION['Address'],
    'District' => $_SESSION['District'],
    'UserID' =>    $_SESSION['UserID'],
    'UserName' =>    $_SESSION['UserName'],
    'StateID' => $_SESSION['StateID'],
    'UserRequestTime' =>  $_SESSION['UserRequestTime'],
    'ViewCode' => $_SESSION['ViewCode']
];

$payload1=['userInfo' => $payload];

$secret = 'VimleshKumar@123';

$token = Token::customPayload($payload1, $secret);
//echo $token;
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<script>
    var jwt = '<?php echo $token; ?>';
    // alert(jwt);
    //console.log(jwt);
    localStorage.setItem('token', JSON.stringify({
        "token": jwt
    }));
    setTimeout(function() {
        location.replace("./index.html");
    }, 1000);
    //location.replace("index.html")

    //location.replace("../browser/index.html")
</script>

<body>

</body>

</html>