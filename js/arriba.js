document.getElementById("ir-arriba").addEventListener("click", scrollUp);

function scrollUp() {

    var currentScroll = document.documentElement.scrollTop;

    if (currentScroll > 0){
        window.requestAnimationFrame(scrollUp);
        window.scrollTo (0, Math.max(currentScroll - 80, 0));
    }
    
}

buttonUp = document.getElementById("ir-arriba");

window.onscroll = function(){

    var scroll = document.documentElement.scrollTop;

    if (scroll > 500){
        buttonUp.style.transform = "scale(1)";
    }else if(scroll < 500){
        buttonUp.style.transform = "scale(0)";
    }

}