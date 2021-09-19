<?PHP
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF8' . "\r\n";
$headers .= 'From: '.$from."\r\n".
    'Reply-To: '.$from."\r\n" .
    'X-Mailer: PHP/' . phpversion();	
$betreff = "Hi Partner " . $_GET['wichtel'];
$from = "From: P2Pair <simeon@staneks.de>";
$text = 'Hi ' . $_GET['wichtel']  . ','. "\r\n" . 'hast in diesem Jahr ' . $_GET['name'] . ' gezogen.' ;
mail($_GET['mail'], $betreff, $text, $from, $headers);
?> 