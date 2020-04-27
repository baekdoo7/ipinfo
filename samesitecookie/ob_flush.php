<?php
echo ob_get_level();
exit;
//header('Content-type: text/html; charset=euc-kr');
for($i=1; $i<3000;$i++){
    //echo "$i <br />";
    echo "<script type='text/javascript'>console.log('".$i."');</script> \n";
    //echo str_pad("",4096);
    ob_flush();
    flush();
    usleep(100000);
}
?>