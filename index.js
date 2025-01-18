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



const form = document.querySelector('form');
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

 
    if (!valid) {
        e.preventDefault();
    }
});





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

 
 

