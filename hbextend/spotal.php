<!doctype html>
<html lang="ko">
<head>
    <title>Test Cookie Syne</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="HTML5 website template">
    <meta name="keywords" content="global, template, html, sass, jquery">
    <meta name="author" content="baekdoo">
    <link rel="stylesheet" href="">
    <script async src="http://compasscdn.adop.cc/js/prebid1.36.0.js"></script>
    <script type="text/javascript" src="//compasscdn.adop.cc/js/prebidadop1_15.js"></script>
    <script>

        pbjs.floor_price = 0.1;
        pbjs.bidtrace = false;
        pbjs.que.push(function () {
            var adUnits = [{
                "code": "3d185e5b-8335-4bc0-b15d-ff9b249ebfe3",
                "mediaTypes": {
                    "banner": {
                        "sizes": [[300, 250]]
                    }
                },
                "bids": [{
                    "bidder": "audienceNetwork",
                    "params": {
                        "placementId": "3350140735057816_3397411766997379",
                    }
                }]
            }];
            pbjs.addAdUnits(adUnits);
            pbjs.requestBids({
                bidsBackHandler: floorPrice001
            });
        });

    </script>

</head>
<body>

<div>
    광고 아이프레임
    <script  src='http://compasscdn.adop.cc/js/adopHB1.1.1.min.js' ></script>
    <ins class='adsbyadop' _adop_zon = '3d185e5b-8335-4bc0-b15d-ff9b249ebfe3' _adop_type = 'hb' style='display:inline-block;width:300px;height:250px;'  _page_url=''></ins>
</div>
<div>
    광고 노프레임
</div>
<div>
    모바 테스팅........
</div>
<div>

</div>
</body>
</html>
