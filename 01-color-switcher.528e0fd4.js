!function(){function t(){return"#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}var e=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]"),n=document.querySelector("body");e.addEventListener("click",(function(e){a.disabled=!1,e.target.disabled=!0,n.style.backgroundColor=t(),r=setInterval((function(){n.style.backgroundColor=t()}),1e3)})),a.addEventListener("click",(function(t){e.disabled=!1,t.target.disabled=!0,clearInterval(r)})),a.disabled=!0;var r=null}();
//# sourceMappingURL=01-color-switcher.528e0fd4.js.map