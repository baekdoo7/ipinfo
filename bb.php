<?php


?>

테스트123

<script>
    login1 = function (){
        console.log('test');
         var test = "문어";
    };
    login = function(){
        console.log(login1.test);
        return {
            bbb:function (){
                console.log('test1234');
            },
            ccc:function(msg){
                console.log(msg);
            },
            ddd:"오징어"
        }
    }();
</script>

<button onclick="login1('오징어')">눌러</button>
<button onclick="login.ccc('오징어문어');">눌러2</button>