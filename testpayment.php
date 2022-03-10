<?php
//아임포트 결제 테스트
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>아임포트 결제 테스트</title>

    <!-- jQuery -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" ></script>
    <!-- iamport.payment.js -->
    <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"></script>


    <!-- 합쳐지고 최소화된 최신 CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <!-- 부가적인 테마 -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
    <!-- 합쳐지고 최소화된 최신 자바스크립트 -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <script>
        $(document).on("click","#btn_left",function (){
            //결제 진행
            var IMP = window.IMP; // 생략 가능
            IMP.init("imp71162147"); // 예: imp00000000

            // IMP.request_pay(param, callback) 호출
            IMP.request_pay({ // param
                pg: "html5_inicis",
                pay_method: "card",
                merchant_uid: "ORD20180131-0000011",
                name: "상품명1",
                amount: 500,
                buyer_email: "gildong@gmail.com",
                buyer_name: "홍길동",
                buyer_tel: "010-4242-4242",
                buyer_addr: "서울특별시 강남구 신사동",
                buyer_postcode: "01181",
                confirm_url : 'http://www.naver.com'
            },function (rsp) {
                if (rsp.success) {
                    // 결제 성공 시 로직,
                    console.log('결제호출 성공!!!')
                    console.log(rsp);
                }else{
                    console.log('결제호출 실패!!!')
                    console.log(rsp);
                    // 결제 실패 시 로직,
                }
            });
        });
    </script>
</head>
<body>
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="btn-group" role="group" aria-label="...">
                <button type="button" class="btn btn-default" id="btn_left">결제테스트</button>
                <button type="button" class="btn btn-default" id="btn_middle">Middle</button>
                <button type="button" class="btn btn-default" id="btn_right">Right</button>
            </div>
        </div>
    </div>

</body>
</html>





