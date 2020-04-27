const adopDiv = document.currentScript.getAttribute("data-id"),
    adopWidth = document.currentScript.getAttribute("data-width"),
    adopHeight = document.currentScript.getAttribute("data-height"),
    adopZone = document.currentScript.getAttribute("data-zone"),
    adopType = document.currentScript.getAttribute("data-type"),
    adopCl = document.currentScript.getAttribute("data-cl"),
    adopFl = document.currentScript.getAttribute("data-fl"),
    adopFlWidth = document.currentScript.getAttribute("data-fl-width"),
    target = document.getElementById(adopDiv),
    clientRect = target.getBoundingClientRect(),
    relativeTop = clientRect.top,
    absoluteTop = window.pageYOffset + relativeTop;
let last_known_scroll_position = 0,
    ticking = !1,
    makeAds = !1,
    moved = !1;
var avaec = !1,
    adopPassbackFl = !1;
let getAds = function () {
    let t = adopHeight, e = adopWidth;
    target.style.height = t + "px";
    let i = document.createElement("div");
    i.setAttribute("style", "width:" + e + "px; margin:0 auto;");
    let o = document.createElement("ins");
    o.setAttribute("class", "adsbyadop"), o.setAttribute("_adop_zon", adopZone), o.setAttribute("_adop_type", adopType), o.setAttribute("style", "display:inline-block;width:" + e + "px;height:" + t + "px;"), o.setAttribute("_page_url", "");
    let d = document.createElement("script");
    d.src = "//compass.adop.cc/assets/js/adop/adopJ.js?v=14", i.appendChild(o), i.appendChild(d), target.appendChild(i)
}, colleapse = function (t) {
    t > absoluteTop - window.innerHeight + window.pageYOffset / 2.5 && (makeAds || (makeAds = !0, getAds()))
};
var adop_transform = function (t) {
    const e = target.getElementsByTagName("iframe")[0].contentWindow.document, i = e.getElementById("adop-adContainer");
    let o = .5625 * parseInt(adopWidth), d = parseInt(adopWidth);
    if (t) d = parseInt(adopWidth), o = parseInt(adopHeight), target.setAttribute("style", "transition:height 1s ease-out; height:" + adopHeight + "px; overflow:hidden;"), target.childNodes[0].style.width = d + "px", target.getElementsByTagName("ins")[0].querySelector("div").setAttribute("style", "width:" + d + "px;height:" + parseInt(adopHeight) + "px"), null != e.getElementById("adBox") && e.getElementById("adBox").setAttribute("style", "width:" + d + "px;height:" + o + "px"), e.getElementById("adop-video-total").setAttribute("style", "width:" + d + "px;height:" + (o - 22) + "px;"), i.querySelector("div").style.width = d, i.querySelector("div").style.height = o + 30, i.querySelector("video").style.width = d, i.querySelector("video").style.height = .5625 * d, i.lastElementChild.style.width = d, i.lastElementChild.style.height = o, i.querySelector("iframe").setAttribute("width", d), i.querySelector("iframe").setAttribute("height", .5625 * d); else {
        o = .5625 * parseInt(adopFlWidth), d = parseInt(adopFlWidth);
        let t = o + 60;
        target.setAttribute("style", "position:fixed;bottom:0px;right:0;"), target.style.height = t + "px", target.style.width = d + "px", target.childNodes[0].style.width = d + "px", target.getElementsByTagName("ins")[0].querySelector("div").setAttribute("style", "width:" + d + "px;height:" + t + "px"), null != e.getElementById("adBox") && e.getElementById("adBox").setAttribute("style", "width:" + d + "px;height:" + t + "px"), e.getElementById("adop-video-total").setAttribute("style", "width:" + d + "px;height:" + t + "px;"), i.querySelector("div").style.width = d, i.querySelector("div").style.height = o, i.querySelector("video").style.width = d, i.querySelector("video").style.height = o, i.lastElementChild.style.width = d, i.lastElementChild.style.height = o, i.querySelector("iframe").setAttribute("width", d), i.querySelector("iframe").setAttribute("height", o)
    }
};
let transform_location = function (t) {
    adopPassbackFl || (t > absoluteTop + parseInt(adopHeight) && (moved || (moved = !0, adop_transform(!1))), moved && t < absoluteTop && (moved = !1, adop_transform(!0)))
};
var noAds = function () {
    target.style.height = "0px"
};
window.addEventListener("scroll", function (t) {
    last_known_scroll_position = window.scrollY || document.documentElement.scrollTop, void 0 !== adopCl && "Y" == adopCl && (ticking || (window.requestAnimationFrame(function () {
        colleapse(last_known_scroll_position), ticking = !1
    }), ticking = !0)), void 0 !== adopFl && "Y" == adopFl && avaec && transform_location(last_known_scroll_position)
}), void 0 !== adopCl && "Y" != adopCl && (target.style.height = adopHeight + "px", makeAds || (makeAds = !0, getAds()));