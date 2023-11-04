//=======================Feedback=======================
//We have to use if to not interfere with other pages.
if (document.getElementById("feedbackForm")) {
    document.getElementById("feedbackForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        //Collects form values
        const name = document.getElementById("username").value;
        const rating = document.getElementById("rating").value;
        const feedbackText = document.getElementById("feedback").value;
        
        
        //Creat HTML elements to represent feedback data
        //Create a article element to insert the new feedback.
        const feedbackItem = document.createElement("article");
        feedbackItem.classList.add("feedback-item");

        //Create a h3 element for the name.
        const nameElement = document.createElement("h3");
        nameElement.textContent = name;

        //Creat a paragraph for the rating.
        const ratingElement = document.createElement("p");
        ratingElement.textContent = `${getStarRating(rating)}`;

        //Create a paragraph element at HTML for the new feedback writed.
        const feedbackElement = document.createElement("p");
        feedbackElement.textContent = feedbackText;

        //Now insert the created feedback elements into the feedback section.

        const feedbackContainer = document.querySelector(".feedback-container");
        feedbackContainer.appendChild(feedbackItem);
        feedbackItem.appendChild(nameElement);
        feedbackItem.appendChild(ratingElement);
        feedbackItem.appendChild(feedbackElement);
    
        //Show the alert with
        window.alert("Thank you for your review!");

        //Clear the form after send the feedback
        document.getElementById("feedbackForm").reset();
    });
}

//Function to show the rating selected by user.
function getStarRating(rating){
    const maxStars = 5;
    const fullStar = "★".repeat(rating);
    const emptyStar = "☆".repeat(maxStars - rating);
    return fullStar + emptyStar;
}

//=======================Feedback END=======================



//=======================Index=======================

//Function to add product at the cart, store the product selected and redirect to payment.
//This function is called inside the button on the index page.
function addToCart(imageSrc, pDescription, pPrice) {
    localStorage.setItem('productImg', imageSrc);
    localStorage.setItem('productDescription', pDescription);
    localStorage.setItem('productPrice', pPrice);

    //Redirect to payment page.
    window.location.href = "order-page.html";
}

//=======================Index END=======================



//=======================Order-page=======================

//If the cart is empty redirect to the products to select and buy one.
//This function is called inside the button on the order page with an empty cart.
function redirectToProducts() {
    window.location.href = "index.html#ourProductSection";
}

function checkout(){
    alert()
}


//This function is called at the order-page to display the product selected and proceed to the checkout.
function displayProductSelected() {
    const productImg = localStorage.getItem('productImg');
    const productDescription = localStorage.getItem('productDescription');
    const productPrice = parseFloat(localStorage.getItem('productPrice')).toFixed(2); //Convert the string in a number.

    if (productImg && productDescription && productPrice) {
        //Show product details
        console.log(productImg);
        document.getElementById('productImg').src = productImg;
        document.getElementById('productDescription').textContent = productDescription;
        document.getElementById('productPrice').textContent = "$" + productPrice;

        //To hide the empty cart layout.
        document.getElementById('emptyCartSection').style.display = 'none';
        //To display the selected product.
        document.getElementById('productDetailsSection').style.display = 'block';
    } else { //If any product was selected.
        //To hide the product details.
        document.getElementById('productDetailsSection').style.display = 'none';
        //To display the message empty cart.
        document.getElementById('emptyCartSection').style.display = 'block';
    }
}

function clearCart() {
    localStorage.removeItem('productImg');
    localStorage.removeItem('productDescription');
    localStorage.removeItem('productPrice');

    location.reload();
}


//Call the function to clear the cart. We have to use if to not interfere with other pages.
if (localStorage.getItem('productImg') && localStorage.getItem('productDescription') && localStorage.getItem('productPrice')) {
    window.addEventListener('beforeUnload', function(){
        clearCart();
    });
}

//Calling the funcion when the page is loaded. We have to use if to not interfere with other pages.
if (window.location.pathname.includes('order-page.html')) {
    displayProductSelected();
}

//=======================Order-page END=======================