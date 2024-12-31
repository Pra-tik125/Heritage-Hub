// Toggle menu function
function toggleMenu() {
    const nav = document.querySelector('.navdiv ul.nb1');
    nav.classList.toggle('active');
}

// scroll event listener
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navdiv');
    if (window.scrollY > 0) {
        nav.classList.add('scrolled');
    }
    else {
        nav.classList.remove('scrolled');
    }

})


// current page navbar highlight

// Get the current page URL
const currentPage = window.location.pathname;

// Loop through all the nav links
document.querySelectorAll('.navbar .nb1 li a').forEach(link => {
    // Check if the current page is the homepage or a specific page
    if ((currentPage === '/' || currentPage === '/Heritage-Hub/')) {
        link.classList.add('activee');
    } else if (link.href.includes(currentPage)) {
        link.classList.add('active');
    }
});

// map popup
function openMapModal() {
    document.getElementById("mapModal").style.display = "block";
}

function closeMapModal() {
    document.getElementById("mapModal").style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    var modal = document.getElementById("mapModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}




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



