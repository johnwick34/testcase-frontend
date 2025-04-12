document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu-links");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  const darkToggle = document.getElementById('dark-mode-toggle');
  darkToggle.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');

    // Toggle icon 🌙/☀️
    const isLight = document.body.classList.contains('light-mode');
    this.textContent = isLight ? '☀️' : '🌙';
  });
});

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.textContent = "❄";

  const size = Math.random() * 10 + 10; // 10px to 20px
  const left = Math.random() * window.innerWidth;
  const duration = Math.random() * 5 + 5; // 5s to 10s

  snowflake.style.fontSize = `${size}px`;
  snowflake.style.left = `${left}px`;
  snowflake.style.animationDuration = `${duration}s`;
  snowflake.style.opacity = Math.random();

  document.body.appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, duration * 1000);
}

setInterval(createSnowflake, 100); // Control snow density

let snowEnabled = true;
let isBlossom = false;
let effectInterval;

function createEffectParticle() {
  const particle = document.createElement("div");
  particle.classList.add("snowflake");

  // Set icon and color
  particle.textContent = isBlossom ? "🌸" : "❄";
  particle.style.color = isBlossom ? "#f9c" : "white";

  const size = Math.random() * 10 + 10;
  const left = Math.random() * window.innerWidth;
  const duration = Math.random() * 5 + 5;

  particle.style.fontSize = `${size}px`;
  particle.style.left = `${left}px`;
  particle.style.animationDuration = `${duration}s`;
  particle.style.opacity = Math.random();

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, duration * 1000);
}

function startEffect() {
  effectInterval = setInterval(createEffectParticle, 100);
}

function stopEffect() {
  clearInterval(effectInterval);
}

document.getElementById("toggle-effect").addEventListener("click", () => {
  snowEnabled = !snowEnabled;

  if (snowEnabled) {
    startEffect();
    document.body.classList.remove('snow-disabled');
    document.getElementById("toggle-effect").textContent = isBlossom ? "🌸 Turn Off" : "❄️ Turn Off";
  } else {
    stopEffect();
    document.body.classList.add('snow-disabled');
    document.getElementById("toggle-effect").textContent = isBlossom ? "🌸 Turn On" : "❄️ Turn On";
  }
});

document.getElementById("switch-effect").addEventListener("click", () => {
  isBlossom = !isBlossom;

  if (isBlossom) {
    document.body.classList.add('snow-disabled');
  } else if (snowEnabled) {
    document.body.classList.remove('snow-disabled');
  }

  // Update button text
  document.getElementById("switch-effect").textContent = isBlossom
    ? "❄️ Switch to Snowfall"
    : "🌸 Switch to Cherry Blossom";

  document.getElementById("toggle-effect").textContent = isBlossom
    ? (snowEnabled ? "🌸 Turn Off" : "🌸 Turn On")
    : (snowEnabled ? "❄️ Turn Off" : "❄️ Turn On");
});

// Start effect by default
startEffect();
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  const ratingText = document.getElementById("rating-text");
  const emojiFeedback = document.getElementById("emoji-feedback");

  const emojis = ["😡", "😕", "😐", "😊", "😍"];
  let selectedRating = parseInt(localStorage.getItem("rating")) || 0;

  function updateUI(rating) {
    stars.forEach((s, i) => {
      s.classList.toggle("selected", i < rating);
    });
    if (rating > 0) {
      ratingText.textContent = `You rated this ${rating} star${rating > 1 ? "s" : ""}!`;
      emojiFeedback.textContent = emojis[rating - 1];
    }
  }

  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      stars.forEach((s, i) => {
        s.classList.toggle("hovered", i <= index);
      });
    });

    star.addEventListener("mouseout", () => {
      stars.forEach((s) => s.classList.remove("hovered"));
    });

    star.addEventListener("click", () => {
      selectedRating = index + 1;
      localStorage.setItem("rating", selectedRating);
      updateUI(selectedRating);
    });
  });

  // Load saved rating on refresh
  if (selectedRating > 0) {
    updateUI(selectedRating);
  }
});
// Lightbox logic
document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close-btn");

  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.classList.remove("hidden");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.add("hidden");
  });

  // Close on background click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add("hidden");
    }
  });
});
function updateClockAndGreeting() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  // Format time
  const timeString = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
  document.getElementById('clock').textContent = timeString;

  // Greeting logic
  let greetingText = '';
  let emoji = '';

  if (hours < 12) {
    greetingText = 'Good Morning';
    emoji = '☀️';
  } else if (hours < 18) {
    greetingText = 'Good Afternoon';
    emoji = '🌤️';
  } else {
    greetingText = 'Good Evening';
    emoji = '🌙';
  }

  document.getElementById('greeting').textContent = `${greetingText},  ${emoji}`;
}

// Call once, then repeat every second
updateClockAndGreeting();
setInterval(updateClockAndGreeting, 1000);
