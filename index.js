// Subscription form submission handling
const scriptURL = 'https://script.google.com/macros/s/AKfycbxqaNpKRORm4Tk7CRHZmfmCaTvFrWhxKw9_uXnBCrCtusFhY0M074a0CmirZ8B_ROk5/exec';
const subForm = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');
const loadingIcon = document.getElementById('loading');

subForm.addEventListener('submit', e => {
  e.preventDefault();

  // Show loading icon and disable the form
  loadingIcon.style.display = 'block';
  document.body.style.cursor = 'wait';

  fetch(scriptURL, { method: 'POST', body: new FormData(subForm) })
    .then(response => {
      loadingIcon.style.display = 'none';
      document.body.style.cursor = 'default';

      if (response.ok) {
        msg.innerHTML = "Thank You For Subscribing!";
        setTimeout(() => { msg.innerHTML = ""; }, 5000);
        subForm.reset();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .catch(error => {
      console.error('Error!', error.message);
      msg.innerHTML = "Thank You For Subscribing!";
      subForm.reset();
      loadingIcon.style.display = 'none';
      document.body.style.cursor = 'default';
    });
});

// Menu and Contact button handling
const menu = document.querySelector('nav ul');
const menuBtn = document.querySelector('.menu-icon');
const closeBtn = document.querySelector('.close-btn');
const contact = document.querySelector('.footer-cont');
const contactBtn = document.querySelectorAll('.contactButton');
const cancelBtn = document.querySelector('.cancelBtn');

menuBtn.addEventListener('click', () => {
    menu.classList.add('open');
    contact.classList.remove('open-cont');
});

closeBtn.addEventListener('click', () => {
    menu.classList.remove('open');
});

cancelBtn.addEventListener('click', () => {
    contact.classList.remove('open-cont');
});

contactBtn.forEach(button => {
    button.addEventListener('click', () => {
        contact.classList.add('open-cont');
        menu.classList.remove('open');
    });
});

// Contact form submission handling
const contactScriptURL = 'https://script.google.com/macros/s/AKfycbxeTH7MzXUV4n-_trYR9PRESKrjjU7Ggt2ktLQc-VghrwIhMm8lOl8TUUx6HEbl3qz2Sg/exec';
const form = document.forms['message-to-google-sheet'];
const submitBtn = document.querySelector('.submit-btn');
const sendMsg = document.getElementById('sendmsg');
const loading = document.getElementById('subloading');

// Form validation and submission
form.addEventListener('submit', e => {
  document.querySelectorAll('.error-message').forEach(el => el.remove());

  const firstName = document.getElementById('first-name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');
  let valid = true;

  if (firstName.value.trim() === '') {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Name is required!';
    errorMessage.classList.add('error-message');
    firstName.after(errorMessage);
    valid = false;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.value.trim().match(emailPattern)) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Valid email is required!';
    errorMessage.classList.add('error-message');
    email.after(errorMessage);
    valid = false;
  }

  const phonePattern = /^[0-9]{10}$/;
  if (!phone.value.trim().match(phonePattern)) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'A valid 10-digit phone number is required.';
    errorMessage.classList.add('error-message');
    phone.after(errorMessage);
    valid = false;
  }

  if (message.value.trim() === '') {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Message is required.';
    errorMessage.classList.add('error-message');
    message.after(errorMessage);
    valid = false;
  }

  if (!valid) {
    e.preventDefault();
  } else {
    // Form is valid, submit data
    setLoadingState(true); // Set loading state
    e.preventDefault();

    fetch(contactScriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        sendMsg.innerHTML = "Thank You For Contacting Us!";
        setTimeout(() => { sendMsg.innerHTML = ""; }, 5000);
        form.reset();
      })
      .catch(error => {
        console.error('Error!', error.message);
        sendMsg.innerHTML = "Something went wrong. Please try again.";
      })
      .finally(() => {
        setLoadingState(false); // Reset loading state
      });
  }
});

// Add loading state for contact form
function setLoadingState(isLoading) {
  if (isLoading) {
    submitBtn.disabled = true;
    submitBtn.value = "Submitting...";
    document.body.style.cursor = 'wait';
  } else {
    submitBtn.disabled = false;
    submitBtn.value = "Submit";
    document.body.style.cursor = 'default';
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

 
 
