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
    
    // All buttons that can add items to cart.
    var CartButtons = document.getElementsByClassName('cart-button');

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
        discount: 0,
        
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
            // Add discount with coupon name and percentage off below
            buyme: 10
        },
        
        discountApplied: false
    };
    
    // Check for local storage support
    if(typeof(Storage) !== "undefined")
    {
        // Get cart out of local storage if it exists.
        if(localStorage.getObject("contents") != null)
        {
            Cart.contents = localStorage.getObject("contents");
        }
        
    }
    
    
    
    // Show CyberCart modal when user clicks on cart icon
    $('.cart').click(function()
    {
        $('#cybercart-modal').css('display', 'block');
        
        UpdateCart();
    });  
    
    // Apply coupon code
    $('#apply-discount').click(function(event)
    {
        event.preventDefault();
        
        var text = $('#discount-code').val();
        var result = Cart.discounts[text];
        
        
        //alert(result);
        if(false == Cart.discountApplied)
        {
            if(result != undefined)
            {
                alert("Coupon applied!");
                Cart.discount = parseFloat(result) / 100;
                Cart.discountApplied = true;
                
                UpdateCart();
            }
            else
            {
                alert("Invalid coupon code.");
            }
        }
        else
        {
            alert("Coupon already applied.");
        }
        
    })
    
    // Hide CyberCart modal when user clicks close
    $('#cart-close').click(function()
    {
        $('#cybercart-modal').css('display', 'none');
    });
    
    // Hide CyberCart modal when user clicks on outside modal
    
        
    
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
                    // Only set shipping value if there are items in the cart. Shipping rate is a flat $5.00.
                    Cart.shipping = 5;
                    
                    var Item     = Cart.contents[property][ITEM_INDEX];
                    var Quantity = parseFloat(Cart.contents[property][COUNT_INDEX]);
                    var Price = Cart.contents[property][PRICE_INDEX];
                    
                    // Add new item to cart. Use data-item to identify the name of object with cart contents, class = item-quantity to keep track of input fields,
                    $('#items').append("<div data-item=" + property + " class='row cart-item-block'> <div class='col-4'><h3>" + 
                                        Item + "</h3></div>" +
                                    
                                        "<div class='col-4'><input class='item-quantity' min='0' type='number' value=" + Quantity + "></div>" + 
                                       "<div class='col-2'><h3>$" + parseFloat(Price * Quantity).toFixed(2) + "</h3></div><div class='col-2'><span class='delete'>" + "&times;" + "</span></div></div>");
                    
                    // Add item to items array for paypal API
                    ItemsPaypal = ItemsPaypal.concat("{name: '" + Cart.contents[property][ITEM_INDEX] + "', quantity: '" + Cart.contents[property][COUNT_INDEX] + "'},");
                
                    Cart.subtotal = Cart.subtotal + (Cart.contents[property][PRICE_INDEX] * Cart.contents[property][COUNT_INDEX]);
                }
            }
        }
        
        
        var Discount = parseFloat(Cart.subtotal * Cart.discount).toFixed(2);
        // Update discount value, since new items may have been added to cart
        // since discount was initially applied. If subtotal is zero,
        // hide discount element.
        if(Cart.subtotal > 0 && true == Cart.discountApplied)
        {
            $('#discount-value').css('display', 'block');
            $('#discount-value').text("Discount: -$" + Discount);
        }
        else
        {
            $('#discount-value').css('display', 'none');
            Discount = 0.0;
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
            
            // Reset coupon code states.
            Cart.discount = 0;
            Cart.discountApplied = false;
        }
        
        // Display shipping and force to the 2nd decimal place.
        $('#shipping').text("$" + parseFloat(Cart.shipping).toFixed(2));
        
        // Display subtotal.
        $('#subtotal').text("$" + parseFloat(Cart.subtotal).toFixed(2));
        // Add subtotal to total and force to the 2nd decimal place.
        $('#total').text("$" + parseFloat((Cart.subtotal + Cart.shipping) - Discount).toFixed(2));
        
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
        
        localStorage.setObject("contents", Cart.contents);
    }
    
    
            paypal.Button.render({

            env: 'production', // sandbox | production
            
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
