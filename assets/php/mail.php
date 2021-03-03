<?php

$from = "nobody@jetclic.mx";
$recepients = ["ventas@eurohydraulics.com.mx"];

// VARIABLES TO USE WITH GOOGLE RECAPTCHA
define("SITE_KEY", "6Leh7s0UAAAAAKYppl9nk1ZUdi1DimyEj049GaMS");
define("SECRET_KEY", "6Leh7s0UAAAAAFhN7lhbmvdaGU3JQXgc60iSSvCF");
define("URL_VERIFY", "https://www.google.com/recaptcha/api/siteverify");

if (isset($_POST["token"]) && isset($_POST["email"])) {
    $verification = file_get_contents(URL_VERIFY . "?secret=" . SECRET_KEY . "&response=" . $_POST["token"]);
    $response = json_decode($verification);
} else {
    die();
}

if ($response -> success == true && $response -> score > 0.5) {

    $site = trim($_POST["site"]);
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $phone = trim($_POST["phone"]);
    $message = trim($_POST["message"]);

    $subject = "Mensaje de " . $name . " desde " . $site;

    $send_message = "<div style='font-size: 14px;'>
    $message<br><br>
    Nombre: $name <br>
    Email: $email <br>
    Teléfono: $phone <br><br>
    Desarrollado por <a href='https://www.jetclic.mx'>JetClic</a>
    </div>";

    $headers = "From: $name <".$from.">" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    foreach ($recepients as $recepient) {
        mail($recepient, $subject, $send_message, $headers);
    }
}