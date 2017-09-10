$(document).ready(function()
{
    var Cart = 
    {
        subtotal: 0,
        shipping: 1,
        /* Change price table accordingly */
        priceTable:
        {
            signatureOil: 12.00,
            signatureBalm: 12.00,
            signatureWash: 12.00,
            expeditionOil: 12.00,
            expeditionBalm: 12.00,
            expeditionButter: 12.00,
            hearthOil: 12.00,
            hearthBalm: 12.00,
            hearthWash: 12.00
        }
    };
    
    // Show CyberCart modal when user clicks on cart icon
    $('#cart').click(function()
    {
        alert(Cart.priceTable['signatureOil']);
        $('#cybercart-modal').css('display', 'block');
        
        UpdateCart();
    });  
    
    // Hide CyberCart modal when user clicks close
    $('#cart-close').click(function()
    {
        $('#cybercart-modal').css('display', 'none');
    });
    
    // Hide CyberCart modal when user clicks on outside modal
    {
        
    }
    
    function UpdateCart()
    {
        $('#shipping').text(Cart.shipping);
        $('#total').text(Cart.subtotal + Cart.shipping);
    }
    
});
