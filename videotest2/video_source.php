<?php

$rnd = rand(1,4);

if($rnd == 1){
    header('Location: http://adopvideocdn.adop.cc/1.mp4');
}
elseif ($rnd == 2 ){
    header('Location: http://adopvideocdn.adop.cc/2.mp4');
}
elseif ($rnd == 3){
    header('Location: http://adopvideocdn.adop.cc/3.mp4');
}
else{
    header('Location: http://adopvideocdn.adop.cc/4.mp4');
}




?>



