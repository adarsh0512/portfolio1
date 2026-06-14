// 1. Typing Animation
const typingTextOffset = ["Web Developer", "Freelancer", "Designer", "Creator"];
const typingTextElement = document.querySelector(".typing-text");
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = typingTextOffset[textIndex];

  if (isDeleting) {
    typingTextElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingTextElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(type, 2000); // Wait before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTextOffset.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 100 : 200);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typingTextElement) type();
});


// 2. Scroll-Triggered Skill Bars
const skillSection = document.querySelector(".skill");
const progressBars = document.querySelectorAll(".circular-progress");
let skillsAnimated = false;

function animateSkills() {
  progressBars.forEach((progressBar) => {
    let valueContainer = progressBar.querySelector(".progress-value");
    let progressValue = 0;
    let progressEndValue = parseInt(valueContainer.textContent);
    let speed = 30;
    let color = getComputedStyle(valueContainer).color; // Get color from CSS

    let progress = setInterval(() => {
      progressValue++;
      valueContainer.textContent = `${progressValue}%`;
      progressBar.style.background = `conic-gradient(${color} ${progressValue * 3.6}deg, #2a2a40 0deg)`;

      if (progressValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
  });
}

// Use Intersection Observer for better performance
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !skillsAnimated) {
    animateSkills();
    skillsAnimated = true;
  }
}, { threshold: 0.5 }); // Trigger when 50% visible

if (skillSection) observer.observe(skillSection);


// 3. Home Section Bubble Effect (Mouse Move)
const homeSection = document.querySelector(".home");

// Only enable mouse move bubble effect on non-touch devices
if (homeSection && !('ontouchstart' in window)) {
  homeSection.addEventListener("mousemove", (e) => {
    createBubble(e.offsetX, e.offsetY);
  });
}

function createBubble(x, y) {
  const bubble = document.createElement("span");
  bubble.classList.add("bubble");

  // Random size
  const size = Math.random() * 50 + 20 + "px";
  bubble.style.width = size;
  bubble.style.height = size;

  // Position at mouse cursor (relative to section)
  bubble.style.left = x + "px";
  bubble.style.top = y + "px";

  // Random color variant (optional, using theme colors)
  // bubble.style.background = ... 

  homeSection.appendChild(bubble);

  // Remove after animation
  setTimeout(() => {
    bubble.remove();
  }, 4000);
}


// 4. Button Ripple Effect
const buttons = document.querySelectorAll(".c-btn, #btn-back-to-top, .filter-item, .post .card, .service-card, .progress-card");

buttons.forEach(btn => {
  btn.addEventListener("click", function (e) {
    // Create ripple element
    let ripple = document.createElement("span");
    ripple.classList.add("ripple")
    this.appendChild(ripple);

    // Position ripple
    let x = e.clientX - e.target.getBoundingClientRect().left;
    let y = e.clientY - e.target.getBoundingClientRect().top;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Remove after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});


// 5. Filter Functionality (Existing)
$(document).ready(function () {
  $(".filter-item").click(function () {
    const value = $(this).attr("data-filter");

    // Active class for buttons
    $(".filter-item").removeClass("active");
    $(this).addClass("active");

    if (value == "all") {
      $(".post").show("1000");
    } else {
      $(".post")
        .not("." + value)
        .hide("1000");
      $(".post")
        .filter("." + value)
        .show("1000");
    }
  });
});


// 6. Sticky Navbar
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      document.getElementById('navbar-top').classList.add('fixed-top');
      // add padding top to show content behind navbar
      navbar_height = document.querySelector('.navbar').offsetHeight;
      document.body.style.paddingTop = navbar_height + 'px';
    } else {
      document.getElementById('navbar-top').classList.remove('fixed-top');
      // remove padding top from body
      document.body.style.paddingTop = '0';
    }
  });
});


// 7. Back to Top Button
let mybutton = document.getElementById("btn-back-to-top");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// 8. Day/Night Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeBody = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  themeBody.classList.add("light-mode");
  if (themeIcon) themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    themeBody.classList.toggle("light-mode");
    const isLight = themeBody.classList.contains("light-mode");

    // Update Icon
    if (themeIcon) {
      if (isLight) {
        themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
      } else {
        themeIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
      }
    }

    // Save preference
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}
