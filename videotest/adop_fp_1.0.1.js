try{
    const loc      = document.currentScript.getAttribute('data-loc');
    const adopZone = document.currentScript.getAttribute('data-zone');
    const adopType = document.currentScript.getAttribute('data-type');
    const adopId   = document.currentScript.getAttribute('data-id');
    const adopCl   = document.currentScript.getAttribute('data-cl');
    const w        = document.currentScript.getAttribute('data-width');
    const h        = document.currentScript.getAttribute('data-height');
    const bottomUp = document.currentScript.getAttribute('data-bottom');
    
    let execute = false; 

    let call = function (){
        execute = true;
        let wrapper = document.createElement("div");
        wrapper.style.position = "fixed";
        wrapper.style.display = "block";
        if(loc == "adop-rb"){
            wrapper.style.bottom = "10px";
            wrapper.style.right = "15px";
        }else if (loc == "adop-rt"){
            wrapper.style.top = "10px";
            wrapper.style.right = "15px";
        }else if (loc == "adop-lt"){
            wrapper.style.top = "10px";
            wrapper.style.left = "15px";
        }else if (loc == "adop-lb"){
            wrapper.style.bottom = "10px";
            wrapper.style.left = "15px";
        }
        wrapper.style.zIndex = "2147483647";
        //하단 사용자가 설정하게 변경
        if(bottomUp != ""){
            wrapper.style.bottom = bottomUp + "px";
        }

        let colDiv = document.createElement("div");
        colDiv.setAttribute("id", adopId);
        colDiv.setAttribute("style", "transition:height 1s ease-out; height:0;  overflow:hidden;");
        let cpsScript = document.createElement("script");
        cpsScript.src = "//dezf3o8j9jdt6.cloudfront.net/js/adop_colleapse_1.1.0.min.js";
        cpsScript.setAttribute("data-id",adopId);
        cpsScript.setAttribute("data-width",w);
        cpsScript.setAttribute("data-height",h);
        cpsScript.setAttribute("data-type",adopType);
        cpsScript.setAttribute("data-zone",adopZone);
        cpsScript.setAttribute("data-cl","Y");


        wrapper.appendChild(colDiv);
        wrapper.appendChild(cpsScript);

        document.body.appendChild(wrapper);
    }

    call();
} catch(e){}