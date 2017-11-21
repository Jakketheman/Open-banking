<?php

// imports
require("functions.php");

// response header
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// request URL
 $url = 'https://psd2.api.swedbank.com/sandbox/v1/accounts/{accountID}/';
  $templateParamNames = array('{accountID}');
  $templateParamValues = array(urlencode('AsdF01234EfgH4567'));
  $url = str_replace($templateParamNames, $templateParamValues, $url);
   $queryParams = '?' . urlencode('BIC') . '=' . urlencode('SWEDSESS').'&' . urlencode('with-balance') . '=' . urlencode('true');

// request headers
$reqHeader = [];
array_push($reqHeader, "accountID: AsdF01234EfgH4567");
array_push($reqHeader, "Authorization: Bearer ThisWillBeYourOauthToken123");

array_push($reqHeader, "Process-ID: ASBS3456");
array_push($reqHeader, "Request-ID: 12345SGHDF");
array_push($reqHeader, "Date: Thu, 01 Dec 1994 16:00:00 GMT");


// request query (GET-params)
$params = $_SERVER['QUERY_STRING'];

try {
    echo curl_fetch($url, $params, $reqHeader,$queryParams);
} catch (Exception $e) {
    logg("PHP Broker curl", "ERROR/WARNING on [$url] with [".$_SERVER['QUERY_STRING']."]" . $e->getMessage());
}


?>