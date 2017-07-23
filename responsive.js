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

var SeoImage = document.getElementById('seo-img');

window.onresize = function(event)
{
    if(1392 <= window.innerWidth)
    {
            document.getElementById('seo-img').src="Images/main/business.png";
    }
    else if(1065 >= window.innerWidth)
        {
            document.getElementById('seo-img').src="Images/main/business.png";
        }
    else
        {
            document.getElementById('seo-img').src="Images/main/business_sideways.png";
        }
}

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

// SERVICES SELECTION //

function setActive()
{ 
    $(this).addClass('service-active');
}

$("#seo-selection").click(function()
                          {
    $(this).addClass("service-active");
});



