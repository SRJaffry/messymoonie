// Interactive behavior for the mobile menu, FAQ accordion, and enquiry form.

// Toggle the mobile navigation and close it when a link is selected.
const hamburgerButton = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

hamburgerButton.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburgerButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburgerButton.setAttribute('aria-expanded', 'false');
  });
});

// Keep the FAQ accordion to one open answer at a time.
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-q');

  question.addEventListener('click', () => {
    const isOpen = item.getAttribute('data-open') === 'true';

    document.querySelectorAll('.faq-item').forEach((faqItem) => {
      faqItem.setAttribute('data-open', 'false');
    });

    item.setAttribute('data-open', isOpen ? 'false' : 'true');
  });
});

// Validate the enquiry details, then prepare an email in the visitor's mail app.
const enquiryForm = document.getElementById('enquiryForm');
const enquiryMessage = document.getElementById('enquiryMsg');

enquiryForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const message = document.getElementById('cMsg').value.trim();

  if (!name || !email || !message) {
    enquiryMessage.className = 'form-msg show';
    enquiryMessage.style.background = 'rgba(227,131,90,0.18)';
    enquiryMessage.style.color = '#B45A38';
    enquiryMessage.textContent = 'Please fill in your name, email and message.';
    return;
  }

  const emailBody = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
  const subject = encodeURIComponent(`Question from ${name}`);
  window.location.href = `mailto:messymoonie@gmail.com?subject=${subject}&body=${emailBody}`;

  enquiryMessage.className = 'form-msg show success';
  enquiryMessage.textContent = 'Your email app should open with your message ready to send to messymoonie@gmail.com.';
});
