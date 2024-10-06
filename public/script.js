(function($) {

  "use strict";

  const tabs = document.querySelectorAll('[data-tab-target]')
  const tabContents = document.querySelectorAll('[data-tab-content]')

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.querySelector(tab.dataset.tabTarget)
      tabContents.forEach(tabContent => {
        tabContent.classList.remove('active')
      })
      tabs.forEach(tab => {
        tab.classList.remove('active')
      })
      tab.classList.add('active')
      target.classList.add('active')
    })
  });

  // Responsive Navigation with Button

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".menu-list");

  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("responsive");
  }

  const navLink = document.querySelectorAll(".nav-link");

  navLink.forEach(n => n.addEventListener("click", closeMenu));

  function closeMenu() {
      hamburger.classList.remove("active");
      navMenu.classList.remove("responsive");
  }

  var initScrollNav = function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      $('#header').addClass("fixed-top");
    }else{
      $('#header').removeClass("fixed-top");
    }
  }

  $(window).scroll(function() {    
    initScrollNav();
  }); 

  $(document).ready(function(){
    initScrollNav();
    
    Chocolat(document.querySelectorAll('.image-link'), {
        imageSize: 'contain',
        loop: true,
    })

    $('#header-wrap').on('click', '.search-toggle', function(e) {
      var selector = $(this).data('selector');

      $(selector).toggleClass('show').find('.search-input').focus();
      $(this).toggleClass('active');

      e.preventDefault();
    });


    // close when click off of container
    $(document).on('click touchstart', function (e){
      if (!$(e.target).is('.search-toggle, .search-toggle *, #header-wrap, #header-wrap *')) {
        $('.search-toggle').removeClass('active');
        $('#header-wrap').removeClass('show');
      }
    });

    $('.main-slider').slick({
        autoplay: false,
        autoplaySpeed: 4000,
        fade: true,
        dots: true,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
    }); 

    $('.product-grid').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 999,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 660,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
    });

    AOS.init({
      duration: 1200,
      once: true,
    })

    jQuery('.stellarnav').stellarNav({
      theme: 'plain',
      closingDelay: 250,
      // mobileMode: false,
    });

  }); // End of a document


})(jQuery);
function displaycart(a){
    let j=0;
    if(cart.length==0){
      document.getElementById('add-to-cart').innerHTML="your cart is empty";
    }
    else{
      document.getElementById("add-to-cart").innerHTML=cart.map((items)=>
      {
        var{image,title,price}=items;
        return(
          `<div class='add-to-cart'>
          <div class='row-img'>
          <img class='rowimg' src=${image}>
          </div>
          <p style='font-size:12px;'>${title}</p>
          <h2 style='font-size:15px;'>$ ${price}.00</h2>`+
          "<i class='fa-solid fa-trash' onclick='delElement("+(j++)+")'></i></div>"
        );

      }).join('');
    }
}

// Function to handle adding items to cart
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Retrieve cart from localStorage or create an empty array if not present
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Loop through all 'Add to Cart' buttons and add event listeners
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productItem = this.closest('.product-item');
            const title = productItem.querySelector('h3').textContent;
            const author = productItem.querySelector('span').textContent;
            const price = productItem.querySelector('.item-price').textContent;
            const imgSrc = productItem.querySelector('img').src;

            // Create a new product object
            const product = {
                title,
                author,
                price,
                imgSrc
            };

            // Add product to cart array
            cart.push(product);

            // Save the updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Optionally, alert user that the item was added to the cart
            alert(`${title} by ${author} has been added to your cart!`);
        });
    });
});



// Display cart items on the cart page
document.addEventListener('DOMContentLoaded', function () {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceContainer = document.getElementById('total-price');

  // Retrieve cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Calculate total price
  let totalPrice = 0;

  // Loop through cart and display each item
  cart.forEach(item => {
      // Create a new cart item element
      const cartItem = document.createElement('div');
      cartItem.classList.add('col-md-3', 'product-item');
      cartItem.innerHTML = `
          <figure class="product-style">
              <img src="${item.imgSrc}" alt="${item.title}" class="product-item">
          </figure>
          <figcaption>
              <h3>${item.title}</h3>
              <span>${item.author}</span>
              <div class="item-price">${item.price}</div>
          </figcaption>
      `;

      // Add cart item to the container
      cartItemsContainer.appendChild(cartItem);

      // Update total price
      totalPrice += parseFloat(item.price.replace('₹', '').replace(',', ''));
  });

  // Update the total price display
  totalPriceContainer.innerHTML = `&#8377;${totalPrice.toFixed(2)}`;
});

