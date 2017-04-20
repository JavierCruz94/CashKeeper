<?php

	function connectionToDataBase(){
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "cashkeeper";

		$conn = new mysqli($servername, $username, $password, $dbname);

		if ($conn->connect_error){
			return null;
		}
		else{
			return $conn;
		}
	}

    function attemptRegister($userPassword, $mail, $name) {

		$conn = connectionToDataBase();

		if ($conn != null){
            $sql = "SELECT mail FROM User WHERE mail = '$mail'";
			$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
				$conn -> close();
                return array("status" => "MAIL REGISTERED");
			}
			else{

                $sql = "INSERT INTO USER VALUES ('$name', '$mail', '$userPassword', NULL, NULL, NULL, NULL, NULL)";
                $insertSql = $conn->query($sql);

                $response = array("status" => "SUCCESS", 'mail' => $mail, 'name' => $name);

				$conn -> close();
                return $response;
			}
		}else{
			$conn -> close();
			return array("status" => "CONNECTION WITH DB WENT WRONG");
		}
	}

    function attemptLogin($mail){

		$conn = connectionToDataBase();

		if ($conn != null){
			$sql = "SELECT mail, passwrd, name FROM User WHERE mail = '$mail'";

			$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
				$conn -> close();

                while($row = $result->fetch_assoc())
                {
                    /*
                    if ($rememberMe == "true") {
                        setcookie("username", $userName, time()+ (86400 * 30), "/", "", 0);
                        //$response = array ('message' => $_COOKIE['username'], );
                    }
                    */
                   $response = array("status" => "SUCCESS", "name" => $row['name'], "pass" => $row['passwrd']);
                }
                return $response;
			}
			else{
				$conn -> close();
				return array("status" => "USERNAME NOT FOUND");
			}
		}else{
			$conn -> close();
			return array("status" => "CONNECTION WITH DB WENT WRONG");
		}
	}

    function attemptAddData($description, $amount, $mail, $expinc, $category, $date) {

		$conn = connectionToDataBase();

		if ($conn != null){
                $sql = "INSERT INTO DATAENTRY VALUES ( '$mail', '$amount', '$expinc', '$category', NULL, '$description', '$date')";
                $insertSql = $conn->query($sql);

                $response = array("status" => "SUCCESS", 'description' => $description, 'amount' => $amount);

				$conn -> close();
                return $response;
			}
        else{
			$conn -> close();
			return array("status" => "CONNECTION WITH DB WENT WRONG");
		}
	}
    function attemptChartData($mail, $category, $type) {
        $conn = connectionToDataBase();

        if ($conn != null){
            $date = getdate();
            $month = $date['mon'];
            $sql = "SELECT SUM(amount) AS Sum FROM dataentry WHERE category = '$category' AND mail = '$mail' AND type = '$type' AND MONTH(dateEntry) = '$month'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0)
            {
                $conn -> close();

                while($row = $result->fetch_assoc())
                {
                   $response = array("status" => "SUCCESS", 'amount' => intval($row['Sum']));
                }
            }
            return $response;
            }
        else{
            $conn -> close();
            return array("status" => "CONNECTION WITH DB WENT WRONG");
        }
    }

    function attemptGetEntries($mail, $type, $category) {
        $conn = connectionToDataBase();

        if ($conn != null){
            $date = getdate();
            $month = $date['mon'];
            $sql = "SELECT description, amount FROM dataentry WHERE category = '$category' AND mail = '$mail' AND type = '$type' AND MONTH(dateEntry) = '$month'";
            $result = $conn->query($sql);
            if ($result->num_rows > 0){
                $conn -> close();

                $entries = array();
                $response = array("status" => "SUCCESS");
                array_push($entries, $response);

                while($row = $result->fetch_assoc()) {
                   $response = array('amount' => $row['amount'], 'description' => $row['description']);
                   array_push($entries, $response);
                }
                return $entries;
            }
        }
        else{
            $conn -> close();
            return array("status" => "CONNECTION WITH DB WENT WRONG");
        }
    }

?>
