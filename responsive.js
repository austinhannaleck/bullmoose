/*
$(document).ready(function()
                 {
    $('a[href^="#"]').on('click', function(event) {

    var target = $(this.getAttribute('href'));

    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }

});
})
*/

/* Used to calculate actual width and height of viewport */
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function CheckWindow()
{
    if(1065 > viewport().width)
            {
                $("#alternate-navbar").show();
                $("#nav").hide();
            }
        else
            {
               $("#alternate-navbar").hide();
                $("#nav").show(); 
            }   
}
$(document).ready(function () {
    CheckWindow();
    
    window.onresize = function(Event)
    {
        if(1065 > viewport().width)
            {
                $("#alternate-navbar").show();
                $("#nav").hide();
            }
        else
            {
               $("#alternate-navbar").hide();
                $("#nav").show(); 
            }
    }
    
})
    
/*
const WINDOW_UPPER_MIN = 1320;
const WINDOW_LOWER_MIN = 767;

window.onresize = function(Event)
{
    var ItemsArray = document.getElementsByClassName('portfolio-item');
    
    if(WINDOW_UPPER_MIN > window.innerWidth && WINDOW_LOWER_MIN < window.innerWidth)
    {
        
        ItemsArray[0].classList.remove('rspn-col-3');
        ItemsArray[0].classList.add('rspn-col-4');
        
        ItemsArray[1].classList.remove('rspn-col-3');
        ItemsArray[1].classList.add('rspn-col-4');
        
        ItemsArray[2].classList.remove('rspn-col-3');
        ItemsArray[2].classList.add('rspn-col-4');
    }
    
    else if(WINDOW_LOWER_MIN >= window.innerWidth) // Check for less than 767
    {
        ItemsArray[0].classList.remove('rspn-col-4');
        ItemsArray[0].classList.add('rspn-col-6');
        
        ItemsArray[1].classList.remove('rspn-col-4');
        ItemsArray[1].classList.add('rspn-col-6');
        
        ItemsArray[2].classList.remove('rspn-col-4');
        ItemsArray[2].classList.add('rspn-col-6');
    }
    else
    {
        ItemsArray[0].classList.remove('rspn-col-4');
        ItemsArray[0].classList.add('rspn-col-3');
        
        ItemsArray[1].classList.remove('rspn-col-4');
        ItemsArray[1].classList.add('rspn-col-3');
        
        ItemsArray[2].classList.remove('rspn-col-4');
        ItemsArray[2].classList.add('rspn-col-3');
    }
}
*/



