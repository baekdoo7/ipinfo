<?php
$useCompassTestServer = false;

$temp = "

<!DOCTYPE html>
<html>
<head>
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
<style>
body{margin:0;padding:0;}
</style>
</head>
<body>
<script type=\"text/javascript\">
    acrossadx_ad_slot = \"21845\";
    acrossadx_ad_passback = \"https://compass.adop.cc/RD/ba7608bf-447d-4d19-bf14-74d5cd8fe013\";
</script>
<script type=\"text/javascript\" src=\"https://adf.acrosspf.com/js/acrossadx.js\"></script>
</body>
</html>

<!-- END CRITEO CDB -->
";

/*
preg_match('/\'(.{8}\-.{4}\-.{4}\-.{4}\-.{12})\'/',$temp, $matches);
if(!empty($matches[1])){
    $change_passback = "htmlcode = \"<scr\"+\"ipt> parent.postMessage('792_".mt_rand(1,9999)."_".$matches[1]."','*');<\/scr\"+\"ipt>\"";
    $temp = preg_replace("/(htmlcode.*?\";)/",$change_passback,$temp);
}
*/

$temp = str_replace("cc/RD/","cc/PB/",$temp);

//print_r($matches);
//echo $change_passback;

echo $temp;

if(in_array("jh",array("jhjh","1234","lkjh"))){
    echo "okokokok";
}
?>

