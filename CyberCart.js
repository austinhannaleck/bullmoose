// Index for item price in Cart contents object.
const PRICE_INDEX = 0;
// Index for item count in Cart contents object.
const COUNT_INDEX = 1;
// Index for item description in Cart contents object.
const ITEM_INDEX  = 2;

$(document).ready(function()
{
    
    var CartButtons = document.getElementsByClassName('cart-button');

    //alert(CartButtons[0].getAttribute("data-productid"));
    
    /*
    for(var i = 0; i < CartButtons.length; i++)
    {
        alert(CartButtons[i].getAttribute("data-productid"));
    }
    */
    
    $('.cart-button').click(function()
    {
        var id   = $(this).attr("data-productid");
        var item = $(this).attr("data-item");
        
        Cart["contents"][item][COUNT_INDEX]++;
        
        alert(Cart["contents"][item][COUNT_INDEX]);
        
    });
    
    var Cart = 
    {
        subtotal: 0,
        shipping: 0,
        
        /* List of items with price and quantity */
        contents:
        {
            sigBalm: [12.00, 0, "Beard Balm - Signature"],
            sigOil: [12.00, 0, "Beard Oil - Signature"],
            sigWash: [12.00, 0, "Beard Wash - Signature"],
            expedBalm: [12.00, 0, "Beard Balm - Expedition"],
            expedOil: [12.00, 0, "Beard Oil - Expedition"],
            expedButter: [12.00, 0, "Shave Butter - Expedition"],
            hearthBalm: [12.00, 0, "Beard Balm - Hearth"],
            hearthOil: [12.00, 0, "Beard Oil - Hearth"],
            hearthWash: [12.00, 0, "Beard Wash - Hearth"]
        }
    };
    
    
    
    
    
    // Show CyberCart modal when user clicks on cart icon
    $('#cart').click(function()
    {
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
        // Clear the cart
        $('#items').html(""); 
        Cart.subtotal = 0;
        
        // Iterate through number of possible items in cart.
        // In the event that an item has a quantity greater than 0,
        // add item to the cart and update price.
        
        for(var property in Cart.contents)
        {
            if(Cart.contents.hasOwnProperty(property))
            {
                if(Cart.contents[property][COUNT_INDEX] > 0)
                {
                    
                    // Add new item to cart. Use data-item to identify the name of object with cart contents, class = item-quantity to keep track of input fields,
                    $('#items').append("<div data-item=" + property + " class='row'> <div class='col-6'><h3>" + 
                                        Cart.contents[property][ITEM_INDEX] + "</h3></div>" +
                                        "<div class='col-4'><input class='item-quantity' min='0' type='number' value=" + Cart.contents[property][COUNT_INDEX] + "></div><div class='col-2'><span class='delete'>" + "&times;" + "</span></div></div>");
                
                    Cart.subtotal = Cart.subtotal + (Cart.contents[property][PRICE_INDEX] * Cart.contents[property][COUNT_INDEX]);
                }
            }
        }
        
        $('#shipping').text("$" + parseFloat(Cart.shipping).toFixed(2));
        
        // Add subtotal to total and force to the 2nd decimal place.
        $('#total').text("$" + parseFloat( Cart.subtotal + Cart.shipping).toFixed(2));
        
        // Add event handlers for quantity buttons in cart
        $(".item-quantity").change(function()
        {
            var count = $(this).val();
            var item = $(this).parent().parent().attr("data-item"); // Get the data item of the parent of the parent (the row div)
            
            // Don't allow users to edit item quantity to less than zero.
            if(count < 0)
            {
                alert("ERROR - Item quantity cannot be less than zero.")
                count = 0; // Set item to zero to remove from cart.
            }
            
            Cart.contents[item][COUNT_INDEX] = parseFloat(count);
            UpdateCart();
        });
        
        // Add event handlers for item delete button
        $('.delete').click(function()
        {
            var item = $(this).parent().parent().attr("data-item"); // Get the data item of the parent of the parent (the row div)
            
            Cart.contents[item][COUNT_INDEX] = 0;
            
            UpdateCart();
        });
    }
    
    
    
});
