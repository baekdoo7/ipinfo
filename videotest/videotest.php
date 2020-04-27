<?php
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>Video Test</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="HTML5 website template">
    <meta name="keywords" content="global, template, html, sass, jquery">
    <meta name="author" content="baekdoo">
    <link rel="stylesheet" href="">

    <style>
        /* All – 모든 해상도에서 해석하는 코드(미디어 쿼리 적용 안 함) */
        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed,
        figure, figcaption, footer, header, hgroup,
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article, aside, details, figcaption, figure,
        footer, header, hgroup, menu, nav, section {
            display: block;
        }
        body {
            line-height: 1;
        }
        ol, ul {
            list-style: none;
        }
        blockquote, q {
            quotes: none;
        }
        blockquote:before, blockquote:after,
        q:before, q:after {
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }



        #mainContainer {
            position: relative;
            width: 800px;
            height: 360px;
        }

        #content, #adContainer {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 800px;
            height: 360px;
        }

        #contentElement {
            width: 800px;
            height: 360px;
            overflow: hidden;
        }

        #wrap{width:800px; margin:0 auto; font-size:11pt; border:1px solid #dfdfdf; color:#555; line-height:24px;}
        h1{font-size:32pt; padding:40px 0 10px 0; border-bottom:2px solid #ccc; color:#333; text-transform:uppercase;}
        h1 span{display:none; float:right; font-size:16pt; color:#555;}
        h2{font-size:18pt; margin-top:40px; padding-bottom:20px; border-bottom:1px solid #ccc; color:#5f808d;}
        h3{font-size:16pt; padding-bottom:10px; color:#333;}
        figure img{width:100%; height:100%;}
        a{text-decoration:none; color:#8c8c8c;}
        a:hover{}
        #header, #container,#container2{padding:20px; background-color:#f6f6f6;}
        #container,#container2 > p{padding-bottom:40px; text-align:justify;}
        #content{display:block; width:100%; overflow:hidden;}
        #section{width:760px; margin:20px 0; font-size:11pt; text-align:justify;}
        #section p{margin-bottom:25px;}
        #aside p{font-size:12pt; color:#bbb;}
    </style>

</head>
<body>

<div id="wrap">
    <div id="container">
        <p>ADOP는 콘텐츠와 사용자 행동분석을 통해 콘텐츠 최적화를 추진하여 광고주에
            게는 최적화 광고 인벤토리를 퍼블리셔에게는 보다 효과적인 수익을 창출 할 수 있도록 합니다. ADOP는 <strong>좋은 콘텐츠가 많이 생산되어 세상의 의미있는 변화에 기여</strong>하고자 솔루션 개발 및 서비스 제공의 길을 4년째 걸어오고 있으며 다양한 경험과 기
            술력을 기반으로 글로벌 네트워크를 형성해 해외시장 친출에도 적극적으로 나서고 있습니
            다.</p>
        <div id="content2222">
            <h2>새로운 가치를 만드는 기업 &ndash; ADOP</h2>
            <div id="section">
                <!--
                <div id="autostation_v_out_inr_1x1-container" style="transition:height 1s ease-out; height:0;  overflow:hidden;"></div>
                <script src="//dezf3o8j9jdt6.cloudfront.net/js/adop_colleapse_1.0.6.min.js" data-id="autostation_v_out_inr_1x1-container" data-width="336" data-height="280" data-type="re" data-zone="19c02788-5e44-489b-bdab-ba35ec1c0c62" data-cl="Y" data-fl="N" data-fl-width=""></script>
                -->
                <p>최적화 광고 에코시스템 실현을 목표로 독창적 기술을 바탕으로 광고주, 퍼블리셔를 위한 차별화된 솔루션 및 서비스를 제공합니다. 특히 ADOP는 독창적 기술을 바탕으로 차별화 된 특허를 보유하여 이를 기반으로 솔루션 및 서비스 개발을 진행하고 있으며 ‘콘텐츠 필터링 서비스 솔루션’ 은 매체 지면에 구글 애드센스 광고 제한의 청잭 가이드라인을 CFS를 통해 사전 분석 필터링하여 성인, 도박 등 부정적인 콘텐츠의 노출을
                    제한하고 광고 효율을 향상시킵니다. 광고 영역에는 타 애드 네트워크의 광고를 매칭, 노출 시킴으로써 매체가 잃을 수 있는 수익 기회를 놓치지 않고 제공합니다. 이 콘텐츠 필터링 서비스 솔루션이 특허 출원됨에 따라 ADOP만의 고유한 기술력이 단단하게 자리매김할 수 있게 되었습니다.</p>
                <p>ADOP는 2014년 국내 최초 구글 애드센스 공식파트너, 국내 2번째 구글 애
                    널리틱스 프리미엄 공식 파트너에 이어 2015년 국내 최초 구글 퍼블리싱 공식 파트너로 선정되었습니다. 이에 따라 매체가 콘텐츠를 안정적으로 운영하고 수익을 창출하는 데 더
                    많은 도움을 줄 수 있게 되었습니다.
                    또한 200개 이상의 다양한 분야의 퍼블리셔와 함께하고 있으며 15개 이상의 국내/외 광고 네트워크사와의 제휴를 통해 다양한 형태의 광고를 제공 및 공금할 수 있는
                    넓은 커버리지를 확보하고 있습니다.</p>

            </div>

            <p>최근 ADOP 뉴스앱 서비스를 출시해 매체사로부터 많은 관심을 받고있습니
                다. ADOP 뉴스앱 서비스는 매체사의 뉴스 콘텐츠를 활용하여 개발한 모바일 뉴스 어플리케이션 입니다. PC로 보던 콘텐츠를 이제 모바>일 앱에서도 만나보실 수 있습니다. 기존에
                제공되는 RSS를 활용하여 ADOP가 자체 제작하기 때문에 매체의 별도 작업이 필요하지 않
                다는 장점이 있고, 앱 광고에 따른 수익을 share 함으로써 콘텐츠 유통과 수익 두 가지 측면 모두를 만족 시키는 앱이라고 할 수 있습>니다. 뿐만아니라 비디오 광고, 형태소 분석 기술 및 키워드 매칭 광고 등 경쟁력있는 광고 상품을 개발하는데 전력을 다하고 있습
                니다.</p>
            <p>지속적으로 ADOP의 새로운 소식을 듣고 싶다면  ADOP 홈페이지를 통해 뉴
                스레터를 신청하세요. 월별로 받아보실 수 있습니다.</p>
            <p>좋은 콘텐츠가 많이 생산되어 세상의 의미있는 변화에 기여하는 ADOP가 되겠습니다.<br />
                감사합니다.</p>

            <p>최근 ADOP 뉴스앱 서비스를 출시해 매체사로부터 많은 관심을 받고있습니
                다. ADOP 뉴스앱 서비스는 매체사의 뉴스 콘텐츠를 활용하여 개발한 모바일 뉴스 어플리케이션 입니다. PC로 보던 콘텐츠를 이제 모바>일 앱에서도 만나보실 수 있습니다. 기존에
                제공되는 RSS를 활용하여 ADOP가 자체 제작하기 때문에 매체의 별도 작업이 필요하지 않
                다는 장점이 있고, 앱 광고에 따른 수익을 share 함으로써 콘텐츠 유통과 수익 두 가지 측면 모두를 만족 시키는 앱이라고 할 수 있습>니다. 뿐만아니라 비디오 광고, 형태소 분석 기술 및 키워드 매칭 광고 등 경쟁력있는 광고 상품을 개발하는데 전력을 다하고 있습
                니다.</p>
            <p>지속적으로 ADOP의 새로운 소식을 듣고 싶다면  ADOP 홈페이지를 통해 뉴
                스레터를 신청하세요. 월별로 받아보실 수 있습니다.</p>
            <p>좋은 콘텐츠가 많이 생산되어 세상의 의미있는 변화에 기여하는 ADOP가 되겠습니다.<br />
                감사합니다.</p>

            <p>최근 ADOP 뉴스앱 서비스를 출시해 매체사로부터 많은 관심을 받고있습니
                다. ADOP 뉴스앱 서비스는 매체사의 뉴스 콘텐츠를 활용하여 개발한 모바일 뉴스 어플리케이션 입니다. PC로 보던 콘텐츠를 이제 모바>일 앱에서도 만나보실 수 있습니다. 기존에
                제공되는 RSS를 활용하여 ADOP가 자체 제작하기 때문에 매체의 별도 작업이 필요하지 않
                다는 장점이 있고, 앱 광고에 따른 수익을 share 함으로써 콘텐츠 유통과 수익 두 가지 측면 모두를 만족 시키는 앱이라고 할 수 있습>니다. 뿐만아니라 비디오 광고, 형태소 분석 기술 및 키워드 매칭 광고 등 경쟁력있는 광고 상품을 개발하는데 전력을 다하고 있습
                니다.</p>
            <p>지속적으로 ADOP의 새로운 소식을 듣고 싶다면  ADOP 홈페이지를 통해 뉴
                스레터를 신청하세요. 월별로 받아보실 수 있습니다.</p>
            <p>좋은 콘텐츠가 많이 생산되어 세상의 의미있는 변화에 기여하는 ADOP가 되겠습니다.<br />
                감사합니다.</p>
            <p>최근 ADOP 뉴스앱 서비스를 출시해 매체사로부터 많은 관심을 받고있습니
                다. ADOP 뉴스앱 서비스는 매체사의 뉴스 콘텐츠를 활용하여 개발한 모바일 뉴스 어플리케이션 입니다. PC로 보던 콘텐츠를 이제 모바>일 앱에서도 만나보실 수 있습니다. 기존에
                제공되는 RSS를 활용하여 ADOP가 자체 제작하기 때문에 매체의 별도 작업이 필요하지 않
                다는 장점이 있고, 앱 광고에 따른 수익을 share 함으로써 콘텐츠 유통과 수익 두 가지 측면 모두를 만족 시키는 앱이라고 할 수 있습>니다. 뿐만아니라 비디오 광고, 형태소 분석 기술 및 키워드 매칭 광고 등 경쟁력있는 광고 상품을 개발하는데 전력을 다하고 있습
                니다.</p>
            <p>지속적으로 ADOP의 새로운 소식을 듣고 싶다면  ADOP 홈페이지를 통해 뉴
                스레터를 신청하세요. 월별로 받아보실 수 있습니다.</p>
            <p>좋은 콘텐츠가 많이 생산되어 세상의 의미있는 변화에 기여하는 ADOP가 되겠습니다.<br />
                감사합니다.</p>
            <p>최근 ADOP 뉴스앱 서비스를 출시해 매체사로부터 많은 관심을 받고있습니
                다. ADOP 뉴스앱 서비스는 매체사의 뉴스 콘텐츠를 활용하여 개발한 모바일 뉴스 어플리케이션 입니다. PC로 보던 콘텐츠를 이제 모바>일 앱에서도 만나보실 수 있습니다. 기존에
                제공되는 RSS를 활용하여 ADOP가 자체 제작하기 때문에 매체의 별도 작업이 필요하지 않
                다는 장점이 있고, 앱 광고에 따른 수익을 share 함으로써 콘텐츠 유통과 수익 두 가지 측면 모두를 만족 시키는 앱이라고 할 수 있습>니다. 뿐만아니라 비디오 광고, 형태소 분석 기술 및 키워드 매칭 광고 등 경쟁력있는 광고 상품을 개발하는데 전력을 다하고 있습
                니다.</p>
            <p>지속적으로 ADOP의 새로운 소식을 듣고 싶다면  ADOP 홈페이지를 통해 뉴
                스레터를 신청하세요. 월별로 받아보실 수 있습니다.</p>
            <p>좋은 콘텐츠가 많이 생산되어 세상의 의미있는 변화에 기여하는 ADOP가 되겠습니다.<br />
                감사합니다.</p>

            <p>------------------------------------------------------------------------------------------------------------------------</p>
            <script src="adop_fp_1.0.1.min.js"  data-id="ajunews_v_out_sr_400x225-191113" data-loc="adop-rb" data-width="400" data-height="285" data-bottom="100" data-type='re' data-zone='4ea615ac-259b-46c5-b16b-1ae9275498a5' ></script>

            <p>------------------------------------------------------------------------------------------------------------------------</p>
            <p>최근 ADOP 뉴스앱 서비스를 출시해 매체사로부터 많은 관심을 받고있습니
                다. ADOP 뉴스앱 서비스는 매체사의 뉴스 콘텐츠를 활용하여 개발한 모바일 뉴스 어플리케이션 입니다. PC로 보던 콘텐츠를 이제 모바일 앱에서도 만나보실 수 있습니다. 기존에
                제공되는 RSS를 활용하여 ADOP가 자체 제작하기 때문에 매체의 별도 작업이 필요하지 않
                다는 장점이 있고, 앱 광고에 따른 수익을 share 함으로써 콘텐츠 유통과 수익 두 가지 측면 모두를 만족 시키는 앱이라고 할 수 있습니다. 뿐만아니라 비디오 광고, 형태소 분석 기술 및 키워드 매칭 광고 등 경쟁력있는 광고 상품을 개발하는데 전력을 다하고 있습
                니다.</p>
            <p>지속적으로 ADOP의 새로운 소식을 듣고 싶다면  ADOP 홈페이지를 통해 뉴
                스레터를 신청하세요. 월별로 받아보실 수 있습니다.</p>
            <p>좋은 콘텐츠가 많이 생산되어 세상의 의미있는 변화에 기여하는 ADOP가 되겠습니다.<br />
                감사합니다.</p>

            <p>최근 ADOP 뉴스앱 서비스를 출시해 매체사로부터 많은 관심을 받고있습니
                다. ADOP 뉴스앱 서비스는 매체사의 뉴스 콘텐츠를 활용하여 개발한 모바일 뉴스 어플리케이션 입니다. PC로 보던 콘텐츠를 이제 모바>일 앱에서도 만나보실 수 있습니다. 기존에
                제공되는 RSS를 활용하여 ADOP가 자체 제작하기 때문에 매체의 별도 작업이 필요하지 않
                다는 장점이 있고, 앱 광고에 따른 수익을 share 함으로써 콘텐츠 유통과 수익 두 가지 측면 모두를 만족 시키는 앱이라고 할 수 있습>니다. 뿐만아니라 비디오 광고, 형태소 분석 기술 및 키워드 매칭 광고 등 경쟁력있는 광고 상품을 개발하는데 전력을 다하고 있습
                니다.</p>
            <p>지속적으로 ADOP의 새로운 소식을 듣고 싶다면  ADOP 홈페이지를 통해 뉴
                스레터를 신청하세요. 월별로 받아보실 수 있습니다.</p>
            <p>좋은 콘텐츠가 많이 생산되어 세상의 의미있는 변화에 기여하는 ADOP가 되겠습니다.<br />
                감사합니다.</p>
            <p>최근 ADOP 뉴스앱 서비스를 출시해 매체사로부터 많은 관심을 받고있습니
                다. ADOP 뉴스앱 서비스는 매체사의 뉴스 콘텐츠를 활용하여 개발한 모바일 뉴스 어플리케이션 입니다. PC로 보던 콘텐츠를 이제 모바>일 앱에서도 만나보실 수 있습니다. 기존에
                제공되는 RSS를 활용하여 ADOP가 자체 제작하기 때문에 매체의 별도 작업이 필요하지 않
                다는 장점이 있고, 앱 광고에 따른 수익을 share 함으로써 콘텐츠 유통과 수익 두 가지 측면 모두를 만족 시키는 앱이라고 할 수 있습>니다. 뿐만아니라 비디오 광고, 형태소 분석 기술 및 키워드 매칭 광고 등 경쟁력있는 광고 상품을 개발하는데 전력을 다하고 있습
                니다.</p>
            <p>지속적으로 ADOP의 새로운 소식을 듣고 싶다면  ADOP 홈페이지를 통해 뉴
                스레터를 신청하세요. 월별로 받아보실 수 있습니다.</p>
            <p>좋은 콘텐츠가 많이 생산되어 세상의 의미있는 변화에 기여하는 ADOP가 되겠습니다.<br />
                감사합니다.</p>
            <p>최근 ADOP 뉴스앱 서비스를 출시해 매체사로부터 많은 관심을 받고있습니
                다. ADOP 뉴스앱 서비스는 매체사의 뉴스 콘텐츠를 활용하여 개발한 모바일 뉴스 어플리케이션 입니다. PC로 보던 콘텐츠를 이제 모바>일 앱에서도 만나보실 수 있습니다. 기존에
                제공되는 RSS를 활용하여 ADOP가 자체 제작하기 때문에 매체의 별도 작업이 필요하지 않
                다는 장점이 있고, 앱 광고에 따른 수익을 share 함으로써 콘텐츠 유통과 수익 두 가지 측면 모두를 만족 시키는 앱이라고 할 수 있습>니다. 뿐만아니라 비디오 광고, 형태소 분석 기술 및 키워드 매칭 광고 등 경쟁력있는 광고 상품을 개발하는데 전력을 다하고 있습
                니다.</p>
            <p>지속적으로 ADOP의 새로운 소식을 듣고 싶다면  ADOP 홈페이지를 통해 뉴
                스레터를 신청하세요. 월별로 받아보실 수 있습니다.</p>
            <p>좋은 콘텐츠가 많이 생산되어 세상의 의미있는 변화에 기여하는 ADOP가 되겠습니다.<br />
                감사합니다.</p>
            <p>최근 ADOP 뉴스앱 서비스를 출시해 매체사로부터 많은 관심을 받고있습니
                다. ADOP 뉴스앱 서비스는 매체사의 뉴스 콘텐츠를 활용하여 개발한 모바일 뉴스 어플리케이션 입니다. PC로 보던 콘텐츠를 이제 모바>일 앱에서도 만나보실 수 있습니다. 기존에
                제공되는 RSS를 활용하여 ADOP가 자체 제작하기 때문에 매체의 별도 작업이 필요하지 않
                다는 장점이 있고, 앱 광고에 따른 수익을 share 함으로써 콘텐츠 유통과 수익 두 가지 측면 모두를 만족 시키는 앱이라고 할 수 있습>니다. 뿐만아니라 비디오 광고, 형태소 분석 기술 및 키워드 매칭 광고 등 경쟁력있는 광고 상품을 개발하는데 전력을 다하고 있습
                니다.</p>
            <p>지속적으로 ADOP의 새로운 소식을 듣고 싶다면  ADOP 홈페이지를 통해 뉴
                스레터를 신청하세요. 월별로 받아보실 수 있습니다.</p>
            <p>좋은 콘텐츠가 많이 생산되어 세상의 의미있는 변화에 기여하는 ADOP가 되겠습니다.<br />
                감사합니다.</p>


            <p>최근 ADOP 뉴스앱 서비스를 출시해 매체사로부터 많은 관심을 받고있습니
                다. ADOP 뉴스앱 서비스는 매체사의 뉴스 콘텐츠를 활용하여 개발한 모바일 뉴스 어플리케이션 입니다. PC로 보던 콘텐츠를 이제 모바>일 앱에서도 만나보실 수 있습니다. 기존에
                제공되는 RSS를 활용하여 ADOP가 자체 제작하기 때문에 매체의 별도 작업이 필요하지 않
                다는 장점이 있고, 앱 광고에 따른 수익을 share 함으로써 콘텐츠 유통과 수익 두 가지 측면 모두를 만족 시키는 앱이라고 할 수 있습>니다. 뿐만아니라 비디오 광고, 형태소 분석 기술 및 키워드 매칭 광고 등 경쟁력있는 광고 상품을 개발하는데 전력을 다하고 있습
                니다.</p>
            <p>지속적으로 ADOP의 새로운 소식을 듣고 싶다면  ADOP 홈페이지를 통해 뉴
                스레터를 신청하세요. 월별로 받아보실 수 있습니다.</p>
            <p>좋은 콘텐츠가 많이 생산되어 세상의 의미있는 변화에 기여하는 ADOP가 되겠습니다.<br />
                감사합니다.</p>
            <div id="move">
            </div>

            <p>최근 ADOP 뉴스앱 서비스를 출시해 매체사로부터 많은 관심을 받고있습니
                다. ADOP 뉴스앱 서비스는 매체사의 뉴스 콘텐츠를 활용하여 개발한 모바일 뉴스 어플리케이션 입니다. PC로 보던 콘텐츠를 이제 모바>일 앱에서도 만나보실 수 있습니다. 기존에
                제공되는 RSS를 활용하여 ADOP가 자체 제작하기 때문에 매체의 별도 작업이 필요하지 않
                다는 장점이 있고, 앱 광고에 따른 수익을 share 함으로써 콘텐츠 유통과 수익 두 가지 측면 모두를 만족 시키는 앱이라고 할 수 있습>니다. 뿐만아니라 비디오 광고, 형태소 분석 기술 및 키워드 매칭 광고 등 경쟁력있는 광고 상품을 개발하는데 전력을 다하고 있습
                니다.</p>
            <p>지속적으로 ADOP의 새로운 소식을 듣고 싶다면  ADOP 홈페이지를 통해 뉴
                스레터를 신청하세요. 월별로 받아보실 수 있습니다.</p>
            <p>좋은 콘텐츠가 많이 생산되어 세상의 의미있는 변화에 기여하는 ADOP가 되겠습니다.<br />
                감사합니다.</p>


            <p>최근 ADOP 뉴스앱 서비스를 출시해 매체사로부터 많은 관심을 받고있습니
                다. ADOP 뉴스앱 서비스는 매체사의 뉴스 콘텐츠를 활용하여 개발한 모바일 뉴스 어플리케이션 입니다. PC로 보던 콘텐츠를 이제 모바>일 앱에서도 만나보실 수 있습니다. 기존에
                제공되는 RSS를 활용하여 ADOP가 자체 제작하기 때문에 매체의 별도 작업이 필요하지 않
                다는 장점이 있고, 앱 광고에 따른 수익을 share 함으로써 콘텐츠 유통과 수익 두 가지 측면 모두를 만족 시키는 앱이라고 할 수 있습>니다. 뿐만아니라 비디오 광고, 형태소 분석 기술 및 키워드 매칭 광고 등 경쟁력있는 광고 상품을 개발하는데 전력을 다하고 있습
                니다.</p>
            <p>지속적으로 ADOP의 새로운 소식을 듣고 싶다면  ADOP 홈페이지를 통해 뉴
                스레터를 신청하세요. 월별로 받아보실 수 있습니다.</p>
            <p>좋은 콘텐츠가 많이 생산되어 세상의 의미있는 변화에 기여하는 ADOP가 되겠습니다.<br />
                감사합니다.</p>


        </div>
    </div>
</div>

</body>
</html>