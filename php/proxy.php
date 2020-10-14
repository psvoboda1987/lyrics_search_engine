<?php

function getUrl($url)
{
    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "x-rapidapi-host: genius.p.rapidapi.com",
            "x-rapidapi-key: a29801eb73msh61898a70ed9a259p16400cjsnfeabbd739262"
        ]
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
		
        $result = "cURL Error #:" . $err;

    }
    else {

        $result = $response;

    }

    return $result;
}

echo getUrl($_GET['url']);