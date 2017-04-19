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
    }

    function registerFunction() {
        $mail = $_POST['mail'];
        $pass = $_POST['pass'];
        $name = $_POST["name"];

        $passEncry = encryptFunction($pass);

        $result = attemptRegister($passEncry, $mail, $name);

        if ($result["status"] == "SUCCESS"){
            //session_start();
            //$_SESSION['USER'] = $userName;
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
                //session_start();
                //$_SESSION['USER'] = $userName;
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
        $uid = $_POST["uid"];

        $result = attemptAddData($description, $amount, $uid, $expinc, $category);

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

?>
