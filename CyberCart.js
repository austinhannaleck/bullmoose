// Index for item price in Cart contents object.
const PRICE_INDEX = 0;
// Index for item count in Cart contents object.
const COUNT_INDEX = 1;
// Index for item description in Cart contents object.
const ITEM_INDEX  = 2;

// Functions for getting/setting objects in local storage
Storage.prototype.setObject = function(key, value)
{
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key)
{
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

$(document).ready(function()
{
    var ItemsPaypal = "";
    
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
        
        alert( Cart["contents"][item][ITEM_INDEX] + " added to cart!");
        
        // DEBUG
        //alert(Cart["contents"][item][COUNT_INDEX]);
        
    });
    
    var Cart = 
    {
        subtotal: 0,
        shipping: 5,
        
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
        },
        
        discounts:
        {
            tryMe: 5   
        },
        
        discountApplied: false
    };
    
    if(typeof(Storage) !== "undefined")
    {
        if(localStorage.getObject("cart") != null)
        {
            Cart = localStorage.getObject("cart");
            
            // DEBUG
            //alert("Cart updated");
            //alert(Cart);
        }
        
    }
    
    
    
    // Show CyberCart modal when user clicks on cart icon
    $('#cart').click(function()
    {
        $('#cybercart-modal').css('display', 'block');
        
        UpdateCart();
    });  
    
    /* Apply discount code */
    $('#apply-discount').click(function(event)
    {
        event.preventDefault();
        
        var text = $('#discount-code').val();
        var result = Cart.discounts[text]
        
        if(result != undefined)
        {
            alert(result);
        }
        
    })
    
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
        Cart.shipping = 0;
        
        ItemsPaypal = "[";
        
        // Iterate through number of possible items in cart.
        // In the event that an item has a quantity greater than 0,
        // add item to the cart and update price.
        for(var property in Cart.contents)
        {
            if(Cart.contents.hasOwnProperty(property))
            {
                if(Cart.contents[property][COUNT_INDEX] > 0)
                {
                    Cart.shipping = 5;
                    
                    var Item     = Cart.contents[property][ITEM_INDEX];
                    var Quantity = Cart.contents[property][COUNT_INDEX];
                    // price
                    
                    // Add new item to cart. Use data-item to identify the name of object with cart contents, class = item-quantity to keep track of input fields,
                    $('#items').append("<div data-item=" + property + " class='row cart-item-block'> <div class='col-6'><h3>" + 
                                        Cart.contents[property][ITEM_INDEX] + "</h3></div>" +
                                        "<div class='col-4'><input class='item-quantity' min='0' type='number' value=" + Cart.contents[property][COUNT_INDEX] + "></div><div class='col-2'><span class='delete'>" + "&times;" + "</span></div></div>");
                    
                    // Add item to items array for paypal API
                    ItemsPaypal = ItemsPaypal.concat("{name: '" + Cart.contents[property][ITEM_INDEX] + "', quantity: '" + Cart.contents[property][COUNT_INDEX] + "'},");
                
                    Cart.subtotal = Cart.subtotal + (Cart.contents[property][PRICE_INDEX] * Cart.contents[property][COUNT_INDEX]);
                }
            }
        }
        
        // Cut off last character of string
        ItemsPaypal = ItemsPaypal.substr(0, ItemsPaypal.length-1);
        ItemsPaypal = ItemsPaypal.concat("]");
        
        // DEBUG
        //alert(ItemsPaypal);
        
        // Display a message if the cart is empty.
        if($('#items').is(':empty'))
        {
            $('#items').append("<div><h3 class='empty-cart'>Your cart is empty!</h3></div>");
        }
        
        // Display shipping and force to the 2nd decimal place.
        $('#shipping').text("$" + parseFloat(Cart.shipping).toFixed(2));
        
        // Add subtotal to total and force to the 2nd decimal place.
        $('#total').text("$" + parseFloat( Cart.subtotal + Cart.shipping).toFixed(2));
        
        // Add event handlers for quantity buttons in cart.
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
        
        localStorage.setObject("cart", Cart);
    }
    
    
            paypal.Button.render({

            env: 'sandbox', // sandbox | production
            
            style: {
                shape: 'rect'
            },

            // PayPal Client IDs - replace with your own
            // Create a PayPal app: https://developer.paypal.com/developer/applications/create
            client: 
            {
                sandbox:    'AdXHrDwft-8bmc_EMSgpGQfYWh9ylcj6ywBLoJIjfxy4vR5pKDY4t_hJV0VFsf2HWRwPe9DQ_5TTRyY4',
                production: 'ATupmcp0yd9U-9gu2VELwXvS_v87BUO8OP3ewzzer0eBfxBxJMTXwQ82eFyYzsz7ZSs0MNzo0U45mVl1'
            },

            // Show the buyer a 'Pay Now' button in the checkout flow
            commit: true,

            // payment() is called when the button is clicked
            payment: function(data, actions) {

                // Make a call to the REST api to create the payment
                return actions.payment.create({
                    payment: {
                        transactions: [
                            {
                                amount: { total: parseFloat( Cart.subtotal + Cart.shipping).toFixed(2), 
                                         currency: 'USD'
                                        },
                                description: 'Bullmoose Man Made Products Transaction',
                                note_to_payee: ItemsPaypal
                                //item_list: {items: ItemsPaypal}
                            }
                        ]
                    }
                });
            },

            // onAuthorize() is called when the buyer approves the payment
            onAuthorize: function(data, actions) {

                // Make a call to the REST api to execute the payment
                return actions.payment.execute().then(function() {
                    window.alert('Payment Complete!');
                });
            }

        }, '#paypal-button');
    
});
