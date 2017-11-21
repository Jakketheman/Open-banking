<?php

// funktion som tar en url, HTTP-query (GET-params) och HTTPS-headers (POST-params) och använder CURL för att hämta url med params och returnerar innehållet

function curl_fetch($url, $params = null, $headers = null,$queryParams){

    // is cURL installed?
    if (!function_exists('curl_init')){
        die('Sorry cURL is not installed!');
    }

    $ch = curl_init();

    // params/query (GET-params)
    if($params){
        $url = $url . "?". $params;
    }

    // Set URL to download
    curl_setopt($ch, CURLOPT_URL, $url . $queryParams);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);

    // Set a referer
    curl_setopt($ch, CURLOPT_REFERER, $url); // låtsas komma från samma webbplats
    
    // låtsas vara en vald webbläsare
    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36");

    // headers (POST-params)
    if($headers){
        
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    }

    // diverse
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // vid SSl-problem se http://flwebsites.biz/posts/how-fix-curl-error-60-ssl-issue
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Should cURL return or print out the data? (true = return, false = print)
    curl_setopt($ch, CURLOPT_TIMEOUT, 10); // Timeout in seconds

    // Download the given URL, and return output
    $output = curl_exec($ch);
    if(($output = curl_exec($ch)) === false)
    {
        throw new Exception('Curl error: ' . curl_error($ch));
    }

    //$info = curl_getinfo($ch);
    //echo '<div id="info">'.print_r($info).'</div>';
    //echo '<div id="output">'.$output.'</div>';

    // Close the cURL resource, and free system resources
    curl_close($ch);

    return $output;
}

function logg($context, $txt){
    //Config_DB::DB_USER
    $logfile = "log_".date("Y-m-d").".txt";
    $log = fopen($logfile, "a") or die("Unable to open log file!");
    fwrite($log, date("H.h:s")." [$context] $txt\n");
    fclose($log);
}

?>