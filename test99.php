<?php


ini_set('memory_limit', '512M');
error_reporting(E_ALL);
ini_set("display_errors", 1);

//include_once('inc/vgeodata.do');
//include_once('inc/vgeodata1.do');
//include_once('inc/vgeodata2.do');

set_time_limit(600);


//2개의 폴리곤값 받아서 하나의 통합 폴리곤 리턴
function b_union($polygon1, $polygon2)
{
    $sql = "SELECT st_AsText(st_union(ST_POLYGONFROMTEXT('{$polygon1}'),ST_POLYGONFROMTEXT('{$polygon2}'))) as poly";
    $sql_result = sql_fetch($sql);
    return $sql_result['poly'];
}

//폴리곤 좌표만 뽑아서 텍스트로 리턴
function get_polygon($point1)
{
    $ret_value = "";
    $first = true;

    foreach ($point1[0] as $k1 => $v1) {

        if ($first) {
            $first = false;
            $ret_value .= $v1[1] . ' ' . $v1[0];
        } else {
            $ret_value .= ', ' . $v1[1] . ' ' . $v1[0];
        }
    }
    return $ret_value;
}

//GEO데이터 읽어서 zone_temp로 입력
function do_geodata()
{
    global $vgeodata;
    $cnt = 0;
    $vgeodata_ = json_decode($vgeodata, true);
    //var_dump($vgeodata_['features'][0]);
    foreach ($vgeodata_['features'] as $k => $v) {
        //$cnt++;
        //if($cnt >5)exit;
        foreach ($v['geometry']['coordinates'] as $k1 => $v1) {
            $sql = "insert into zone_temp(sido,sigu,adr,poly,reg_date,reg_id) ";
            $sql .= "values('{$v['properties']['sidonm']}','{$v['properties']['sggnm']}','{$v['properties']['adm_nm']}',ST_POLYGONFROMTEXT('POLYGON((" . get_polygon($v1) . "))'),now(),'baekdoo')";
            sql_query($sql);
        }
        //if(count($v['geometry']['coordinates']) > 1){
        //    print_r($v['geometry']['coordinates']);
        //}
        //echo count($v['geometry']['coordinates']).PHP_EOL;
        //$sql= "insert into zone_temp(sido,sigu,adr,poly,reg_date,reg_id) ";
        //$sql .= "values('{$v['properties']['sidonm']}','{$v['properties']['sggnm']}','{$v['properties']['adm_nm']}',ST_POLYGONFROMTEXT('POLYGON((".get_polygon($v['geometry']['coordinates'])."))'),now(),'baekdoo')";
//        echo $sql.PHP_EOL;
        //sql_query($sql);
    }
}

//영역 합치기
function do_union($idx1, $idx2)
{
    $sql = "select idx,st_AsText(poly) as poly from zone_temp where idx = '$idx1' ";
    $sql_result = sql_fetch($sql);

    $sql = "select idx,st_AsText(poly) as poly from zone_temp where idx = '$idx2' ";
    $sql_result2 = sql_fetch($sql);

    $polygonTmp = b_union($sql_result2['poly'], $sql_result['poly']);

    if (strpos($polygonTmp, 'MULTIPOLYGON') !== false) {
        echo "MULTIPOLYGON value return !!" . PHP_EOL;
        return;
    }

    $sql = "update zone_temp set poly = ST_POLYGONFROMTEXT('$polygonTmp') where idx = '$idx1'";
    sql_fetch($sql);
    echo PHP_EOL;
    echo $sql . PHP_EOL;

}

//구별데이터생성
function do_make_sigu_data($sigu1 = "")
{
    $cnt = 0;
    $polygonTmp = '';
    if ($sigu1 == "") {
        $sql = "select distinct sido from zone_temp where type = 1 ";
    } else {
        $sql = "select distinct sido from zone_temp where type = 1 and sigu = '$sigu1' ";
    }
    $sql_result = sql_query($sql);
//echo $sql;
    while ($row = sql_fetch_array($sql_result)) {//시,도별
        if ($sigu1 == "") {
            $sql1 = "select distinct sigu from zone_temp where type = 1 and sido = '{$row['sido']}' ";
        } else {
            $sql1 = "select distinct sigu from zone_temp where type = 1 and sigu = '{$sigu1}' ";
        }
        echo $sql1;
        $sql_result1 = sql_query($sql1);
        while ($row1 = sql_fetch_array($sql_result1)) {//시,구별
            //echo $row1['sigu'].PHP_EOL;
            $polygonTmp = '';
            $sql2 = "select adr,st_AsText(poly) as poly from zone_temp where type = 1 and sido = '{$row['sido']}' and sigu = '{$row1['sigu']}' ";
            $sql2_result2 = sql_query($sql2);
//            echo $sql2;
            while ($row2 = sql_fetch_array($sql2_result2)) {//읍,면,동
                //echo $row2['adr'].PHP_EOL;
                if ($polygonTmp == '') {
                    $polygonTmp = $row2['poly'];
                } else {
                    $polygonTmp = b_union($polygonTmp, $row2['poly']);
                }
                //echo $row2['adr'].PHP_EOL;
                //print_r($polygonTmp.PHP_EOL);
            }
            //echo $row1['sigu'].' / '.$polygonTmp.PHP_EOL;
            if (strpos($polygonTmp, 'MULTIPOLYGON') !== false) {
                $adrListTmp = preg_replace("/MULTIPOLYGON\(/", "", $polygonTmp);
                $adrListTmp = preg_replace("/\)\)\)/", "))", $adrListTmp);
                $adrListTmp = preg_replace("/\)\),\(\(/", "))_((", $adrListTmp);
                $adrListArray = explode("_", $adrListTmp);
                foreach ($adrListArray as $k1 => $v1) {
                    $v2 = 'POLYGON ' . $v1;
                    $sql3 = "insert into zone_temp(type,sido,sigu,poly,adr,reg_date,reg_id) ";
                    $sql3 .= "values('9','{$row['sido']}','{$row1['sigu']}',ST_POLYGONFROMTEXT('{$v2}'),'{$row1['sigu']}',now(),'baekdoo') ";
                    //echo $sql3.PHP_EOL;
                    sql_query($sql3);
                }
                //echo $row1['sigu'].' / '.$adrListTmp.PHP_EOL;
            } else {
                $sql3 = "insert into zone_temp(type,sido,sigu,poly,adr,reg_date,reg_id) ";
                $sql3 .= "values('9','{$row['sido']}','{$row1['sigu']}',ST_POLYGONFROMTEXT('{$polygonTmp}'),'{$row1['sigu']}',now(),'baekdoo') ";
                sql_query($sql3);
            }
            //return;
        }
    }
}

//시별데이터생성
function do_make_sido_data($sido1 = "")
{
    $cnt = 0;
    $polygonTmp = '';
    if ($sido1 == "") {
        $sql = "select distinct sido from zone_temp where type = 9  ";
    } else {
        $sql = "select distinct sido from zone_temp where type = 9 and sido='$sido1' ";
    }

    $sql_result = sql_query($sql);
    while ($row = sql_fetch_array($sql_result)) {//시,도별
        $sql1 = "select sigu ,st_AsText(poly) as poly from zone_temp where type = 9 and sido = '{$row['sido']}' ";
        $sql_result1 = sql_query($sql1);
        $polygonTmp = '';
        $polygonTmpArray = array();
        $polygonTmpCnt = 0;
        while ($row1 = sql_fetch_array($sql_result1)) {//시,구별
            $polygonTmpCnt++;
            //echo $polygonTmpCnt.' : '.$row1['sigu'].PHP_EOL;
            if ($polygonTmpCnt >= 10) {
                $polygonTmpCnt = 0;
                $polygonTmpArray[] = $polygonTmp;
                $polygonTmp = '';
                //var_dump($polygonTmpArray);
            }

            if ($polygonTmp == '') {
                $polygonTmp = $row1['poly'];
            } else {
                $polygonTmp = b_union($polygonTmp, $row1['poly']);
            }
        }
        if ($polygonTmp != '') {
            $polygonTmpArray[] = $polygonTmp;
        }


        //var_dump($polygonTmpArray);
//echo $row1['sigu'].PHP_EOL;

        foreach ($polygonTmpArray as $k0 => $v0) {
            $polygonTmp = $v0;
            if (strpos($polygonTmp, 'MULTIPOLYGON') !== false) {
                $adrListTmp = preg_replace("/MULTIPOLYGON\(/", "", $polygonTmp);
                $adrListTmp = preg_replace("/\)\)\)/", "))", $adrListTmp);
                $adrListTmp = preg_replace("/\)\),\(\(/", "))_((", $adrListTmp);
                $adrListArray = explode("_", $adrListTmp);
                foreach ($adrListArray as $k1 => $v1) {
                    $v2 = 'POLYGON ' . $v1;
                    $sql3 = "insert into zone_temp(type,sido,poly,adr,reg_date,reg_id) ";
                    $sql3 .= "values('9','{$row['sido']}',ST_POLYGONFROMTEXT('{$v2}'),'{$row['sido']}',now(),'baekdoo') ";
                    //echo $sql3.PHP_EOL;
                    sql_query($sql3);
                }
                //echo $row1['sigu'].' / '.$adrListTmp.PHP_EOL;
            } else {
                $sql3 = "insert into zone_temp(type,sido,poly,adr,reg_date,reg_id) ";
                $sql3 .= "values('9','{$row['sido']}',ST_POLYGONFROMTEXT('{$polygonTmp}'),'{$row['sido']}',now(),'baekdoo') ";
                sql_query($sql3);
            }
        }

        //return;
    }
}

//난수발생기 문자열
function GenerateString($length)
{
    $characters = "0123456789";
    //$characters .= "abcdefghijklmnopqrstuvwxyz";
    $characters .= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    $string_generated = "";

    $nmr_loops = $length;
    while ($nmr_loops--) {
        $string_generated .= $characters[mt_rand(0, strlen($characters) - 1)];
    }

    return $string_generated;
}

function setRndString($arr = [], $num = 10)
{
    for ($i = 0; $i < $num; $i++) {
        $arr[] = GenerateString(10);
    }
    return $arr;
}

function getRndString($num = 10)
{
    $strArray = [];
    while (count($strArray) < $num) {
        $strArray[] = GenerateString(10);
        $strArray = array_unique($strArray);
    }
    return $strArray;
}

function getRndString2($num = 10)
{
    $strArray = [];
    while (count($strArray) < $num) {
        $strArray = setRndString($strArray, $num - count($strArray));
        $strArray = array_unique($strArray);
    }
    return $strArray;
}


function makeFile()
{
    $myfile = fopen($_SERVER['DOCUMENT_ROOT'] . '/temp/' . "newfile2.txt", "w") or die("Unable to open file!");
    $tmpArray = getRndString2(250000);
    foreach ($tmpArray as $key => $value) {
        fwrite($myfile, $value . PHP_EOL);
    }
    fclose($myfile);
}

//do_geodata();
//do_make_sigu_data();
//do_make_sido_data('경상북도');
//zone_boundary_show2('21070')
//do_union('21073','19895');
//makeFile();
//print_r(getRndString(20));


?>
<br/>
오징어!!!

<script>
    /*
            { lat: 37.63021304523975  , lng: 126.86694775151292 },
            { lat: 37.638532          , lng: 126.899264 },
            { lat: 37.63676768643173  , lng: 126.89967787117538 },
            { lat: 37.640481          , lng: 126.91822 },
            { lat: 37.601937622731086 , lng: 126.9078482778772 },
            { lat: 37.590237          , lng: 126.910593 },
            { lat: 37.592141324499266 , lng: 126.90521217516024 },
            { lat: 37.570308          , lng: 126.899337 },
            { lat: 37.6162269152431   , lng: 126.8371563811432 },
            { lat: 37.619884          , lng: 126.826823 },
            { lat: 37.620911180019164 , lng: 126.83081323743932 },
            { lat: 37.622536          , lng: 126.828613 },
            { lat: 37.63021304523975  , lng: 126.86694775151292}
    */


</script>


