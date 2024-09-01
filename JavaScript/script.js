// Function to throttle events
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
          func.apply(context, args);
          lastRan = Date.now();
      } else {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(function () {
              if ((Date.now() - lastRan) >= limit) {
                  func.apply(context, args);
                  lastRan = Date.now();
              }
          }, limit - (Date.now() - lastRan));
      }
  }
}

// Toggle menu function
function toggleMenu() {
  const nav = document.querySelector('.navdiv ul.nb1');
  nav.classList.toggle('active');
}

// Throttled scroll event listener
window.addEventListener('scroll', throttle(function () {
  const nav = document.querySelector('.navdiv');
  if (window.scrollY > 0) {
      nav.classList.add('scrolled');
  } else {
      nav.classList.remove('scrolled');
  }
}, 200));

// Form script
const form = document.getElementById('contactform');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Captcha check
  const hCaptcha = form.querySelector('textarea[name=h-captcha-response]').value;
  if (!hCaptcha) {
      alert("Please fill out the captcha field");
      return;
  }

  // Form data preparation
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.innerHTML = "Please wait...";
  result.style.display = "block";  // Ensure the result message is visible

  // Form submission
  fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: json
  })
      .then(async (response) => {
          let json = await response.json();
          if (response.status === 200) {
              result.innerHTML = "Form submitted successfully";
          } else {
              console.log(response);
              result.innerHTML = json.message;
          }
      })
      .catch(error => {
          console.log(error);
          result.innerHTML = "Something went wrong!";
      })
      .finally(() => {
          form.reset();
          setTimeout(() => {
              result.style.display = "none";
          }, 4000);
      });
});
