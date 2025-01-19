const scriptURL = 'https://script.google.com/macros/s/AKfycbyKpPX1bBtrFYWsfGkt9cz1mX3ZUO5EeGJTRI3d9Ie142cLU2--yev5VUGorLxr-dhG/exec';
const subForm = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');
const loadingIcon = document.getElementById('loading');

subForm.addEventListener('submit', e => {
  e.preventDefault();

  // Show loading icon and change cursor to 'wait'
  loadingIcon.style.display = 'block';
 

  fetch(scriptURL, { method: 'POST', body: new FormData(subForm) })
    .then(response => {
      // Hide loading icon and reset cursor
      loadingIcon.style.display = 'none';
      document.body.style.cursor = 'default';

      // Show success message
      msg.innerHTML = "Thank You For Subscribing";
      setTimeout(function(){
        msg.innerHTML = "";
      }, 5000);

      // Reset form
      subForm.reset();
    })
    .catch(error => {
      console.error('Error!', error.message);
      
      // Hide loading icon and reset cursor even in case of error
      loadingIcon.style.display = 'none';
      document.body.style.cursor = 'default';
    });
});

const menu = document.querySelector('nav ul');
const menuBtn = document.querySelector('.menu-icon');
const closeBtn = document.querySelector('.close-btn');
const contact = document.querySelector('.footer-cont');
const contactBtn = document.querySelectorAll('.contactButton');
const cancelBtn = document.querySelector('.cancelBtn');



menuBtn.addEventListener('click', () => {
    menu.classList.add('open')
    contact.classList.remove('open-cont')
});

closeBtn.addEventListener('click', () => {
    menu.classList.remove('open')
});

cancelBtn.addEventListener('click', () => {
    contact.classList.remove('open-cont')
});



contactBtn.forEach(button => {
    button.addEventListener('click', openContact);
});

function openContact() {
    contact.classList.add('open-cont')
    menu.classList.remove('open')
}



const contactScriptURL = 'https://script.google.com/macros/s/AKfycbwOYyqIMP9u95e8J_MxrRXXmGlenPyJo4rma1WjSjPTXUHGiwtHynhUsJYA1RIJPdpVPA/exec';  // Replace with your Google Script URL
const form = document.forms['message-to-google-sheet'];
const submitBtn = document.querySelector('.submit-btn');
const sendMsg = document.getElementById('sendmsg');
const loading = document.getElementById('subloading');

// Form Validation
form.addEventListener('submit', (e) => {
    document.querySelectorAll('.error-message').forEach((el) => el.remove());

    const firstName = document.getElementById('first-name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');
    let valid = true; 

    if (firstName.value.trim() === '') {
        const nameInput = form.querySelector('input[name="first-name"]');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Name is required!';
        errorMessage.classList.add('error-message');
        nameInput.after(errorMessage);
        valid = false;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.value.trim().match(emailPattern)) {
        const emailInput = form.querySelector('input[name="email"]');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Valid email is required!';
        errorMessage.classList.add('error-message');
        emailInput.after(errorMessage);
        valid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phone.value.trim().match(phonePattern)) {
        const phoneInput = form.querySelector('input[name="phone"]');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'A valid 10-digit phone number is required.';
        errorMessage.classList.add('error-message');
        phoneInput.after(errorMessage);
        valid = false;
    }

    if (message.value.trim() === '') {
        const messageInput = form.querySelector('textarea[name="message"]');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Message is required.';
        errorMessage.classList.add('error-message');
        messageInput.after(errorMessage);
        valid = false;
    }

    // Prevent submission if the form is invalid
    if (!valid) {
        e.preventDefault();
    } else {
        // If valid, proceed with sending the form data to Google Sheets
        setLoadingState(true);  // Set loading state
        e.preventDefault(); // Prevent default form submission


        fetch(contactScriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {


                sendMsg.innerHTML = "Thank You For Contacting Us!";
                setTimeout(() => { sendMsg.innerHTML = ""; }, 5000);
                form.reset();  // Reset the form after submission
            })
            .catch(error => {
                console.error('Error!', error.message);
                sendMsg.innerHTML = "Something went wrong. Please try again.";
                 // Hide loading icon and reset cursor even in case of error

            })
            .finally(() => {
                setLoadingState(false);  // Reset loading state
            });
    }
});

// Add loading state
function setLoadingState(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.value = "Submitting...";

    } else {
        submitBtn.disabled = false;
        submitBtn.value = "Submit";
        document.body.style.cursor = "default";  // Reset cursor

    }
}

window.addEventListener('DOMContentLoaded', function () {
    const img = document.getElementById('creative-image');
    const canvas = document.getElementById('canvas');
    const container = document.getElementById('container');

    img.addEventListener('load', function () {
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let r = 0, g = 0, b = 0;
        const totalPixels = pixels.length / 4;

        for (let i = 0; i < pixels.length; i += 4) {
            r += pixels[i];      // Red
            g += pixels[i + 1];  // Green
            b += pixels[i + 2];  // Blue
        }

        r = Math.floor(r / totalPixels);
        g = Math.floor(g / totalPixels);
        b = Math.floor(b / totalPixels);


        const blendFactor = 0.9; // 
        r = Math.floor(r + (0 - r) * blendFactor);
        g = Math.floor(g + (0 - g) * blendFactor);
        b = Math.floor(b + (0 - b) * blendFactor);

        // Set the subtle background color
        const avgColor = `rgb(${r}, ${g}, ${b})`;
        container.style.backgroundColor = avgColor;
    });
});

 
 
