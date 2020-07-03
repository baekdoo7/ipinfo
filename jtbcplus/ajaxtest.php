<!DOCTYPE html>
<html>
<head>
<script>
    function  testgo(u){
            var xhr;
            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }
            else{
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if(xhr.readyState == xhr.DONE && xhr.status == 200){
                    //console.log(xhr.responseText);
                    document.getElementById("txt_label").innerHTML = xhr.responseText;
                }
            };
            xhr.open("POST",u,true);
            //xhr.open("POST","test01.php",true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(encodeURI('object=123'));
            //console.log(encodeURI('object='+adoptag.makeSendData()));

    }
    function aaa(){
        var url1 = "http://dsp.adop.cc/api/sov.php";
        var url = "http://compasstest.adop.cc/jtbcplus/ajaxtest.php";


        testgo(url);
    }
</script>
</head>
<body>
<div id="txt_label"></div>
<button onclick="aaa();">눌러</button>
</body>
</head>
</html>