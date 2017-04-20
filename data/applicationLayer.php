<?php

    header('Content-type: application/json');
    require_once __DIR__ . '/dataLayer.php';

    $action = $_POST["action"];

    switch($action){
        case "REGISTER" : registerFunction();
            break;
        case "LOGIN" : loginFunction();
            break;
        case "ADDDATAENTRY" : addDataFunction();
            break;
        case "CHECKSESSION" : checkSession();
            break;
        case "LOGOUT" : logoutFunction();
            break;
        case "GETCHARTDATA" : getChartDataFunction();
            break;
        case "GETENTRIES" : getEntriesFunction();
            break;
    }

    function registerFunction() {
        $mail = $_POST['mail'];
        $pass = $_POST['pass'];
        $name = $_POST["name"];

        $passEncry = encryptFunction($pass);

        $result = attemptRegister($passEncry, $mail, $name);

        if ($result["status"] == "SUCCESS"){
            session_start();
            $_SESSION['USER'] = $mail;
            setcookie("mail", $mail, time()+ (86400 * 30), "/", "", 0);
            echo json_encode(array('mail' => $result["mail"], 'name' => $result["name"]));
        }
        else{
            header('HTTP/1.1 500' . $result["status"]);
            die($result["status"]);
        }


    }

    function encryptFunction($text) {
        //Initialize encryption
            $key = pack('H*', "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
            $key_size =  strlen($key);
            $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
            $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);

            $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $text, MCRYPT_MODE_CBC, $iv);
            $ciphertext = $iv . $ciphertext;
            $ciphertext_base64 = base64_encode($ciphertext);

        return $ciphertext_base64;

    }

    function loginFunction(){
        $mail = $_POST['mail'];
        $pass = $_POST['pass'];

        $result = attemptLogin($mail);

        if ($result["status"] == "SUCCESS"){

            $decrypt = decryptFunction($result["pass"]);

            if ($decrypt == $pass) {
                session_start();
                $_SESSION['USER'] = $mail;
                setcookie("mail", $mail, time()+ (86400 * 30), "/", "", 0);
                echo json_encode(array('name' => $result["name"]));
            }
            else {
                header('HTTP/1.1 500' . "INVALID CREDENTIALS");
                die("INVALID CREDENTIALS");
            }
        }
        else{
            header('HTTP/1.1 500' . $result["status"]);
            die($result["status"]);
        }
    }

    function decryptFunction($text) {
        //Extra needed
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
        $key = pack('H*', "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");

        //Decryption
        $ciphertext_dec = base64_decode($text);
        $iv_dec = substr($ciphertext_dec, 0, $iv_size);
        $ciphertext_dec = substr($ciphertext_dec, $iv_size);
        $plaintext_dec = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);

        $count = 0;
        $length = strlen($plaintext_dec);

        for ($i = $length - 1; $i >= 0; $i --)
        {
            if (ord($plaintext_dec{$i}) === 0)
            {
                $count ++;
            }
        }

        $password = substr($plaintext_dec, 0,  $length - $count);

        return $password;

    }

    function addDataFunction() {
        $description = $_POST['description'];
        $amount = $_POST['amount'];
        $expinc = $_POST["expinc"];
        $category = $_POST["category"];
        $mail = $_COOKIE["mail"];

        $result = attemptAddData($description, $amount, $mail, $expinc, $category);

        if ($result["status"] == "SUCCESS"){
            //session_start();
            //$_SESSION['USER'] = $userName;
            echo json_encode(array('description' => $result["description"], 'amount' => $result["amount"]));
        }
        else{
            header('HTTP/1.1 500' . $result["status"]);
            die($result["status"]);
        }
    }

    function checkSession() {
        session_start();
        if (isset($_SESSION['USER'])) {
            echo json_encode(array('satus' => 'OK'));
        }
        else {
             header('HTTP/1.1 500' . "START A SESSION");
            die("START A SESSION");
        }
    }

    function logoutFunction() {
        session_start();
        unset($_SESSION['USER']);
        session_destroy();
        echo json_encode(array("logout" => "LOGOUT"));
    }

    function getChartDataFunction() {
        session_start();
        $mail = $_SESSION['USER'];
        $food = attemptChartData($mail, "Food/Drinks", 0);
        $car = attemptChartData($mail, "Car", 0);
        $living = attemptChartData($mail, "House/Apartment", 0);
        $nightlife = attemptChartData($mail, "Nightlife", 0);
        $kids = attemptChartData($mail, "Kids", 0);
        $work = attemptChartData($mail, "Work", 0);
        $other = attemptChartData($mail, "Other", 0);

        if ($other["status"] = "SUCCESS") {
            echo json_encode(array("food" => $food["amount"], "car" => $car["amount"], "living" => $living["amount"], "nightlife" => $nightlife["amount"], "kids" => $kids["amount"], "work" => $work["amount"], "other" => $other["amount"]));
        } else {
            header('HTTP/1.1 500' . "BAD IN CHART");
            die("BAD IN CHART");
        }
    }

function getEntriesFunction() {
    session_start();
    $mail = $_SESSION['USER'];
    $type = $name = $_POST['type'];
    $category = $_POST['category'];
    if ($type == "expense") {
        $type = 0;
    } else {
        $type = 1;
    }
    $result = attemptGetEntries($mail, $type, $category);

    if ($result["status"] = "SUCCESS") {
            echo json_encode($result);
        } else {
            header('HTTP/1.1 500' . $result["status"]);
            die($result["status"]);
        }

}

?>
