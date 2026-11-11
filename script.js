"use strict";

// SLIDESHOW DATA
const slides = [
  {
    emoji: "🌸",
    title: "Beautiful Day",
    text: "May your life always be full of flowers and happiness!",
  },
  {
    emoji: "🍓",
    title: "Sweet Birthday",
    text: "May your new year be as sweet as strawberry cake!",
  },
  {
    emoji: "🧸",
    title: "Cute Memories",
    text: "Keep smiling and enjoy every little moment!",
  },
  {
    emoji: "🌈",
    title: "Wonderful Future",
    text: "May all your dreams become beautiful reality!",
  },
  {
    emoji: "💗",
    title: "Special Person",
    text: "Wishing you endless happiness and lovely memories!",
  },
];

let currentSlide = 0;

// SELECT ELEMENTS
const slideEmoji = document.getElementById("slideEmoji");
const slideTitle = document.getElementById("slideTitle");
const slideText = document.getElementById("slideText");
const dots = document.getElementById("dots");

// SHOW SLIDE
function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;

  const slide = slides[currentSlide];

  slideEmoji.textContent = slide.emoji;
  slideTitle.textContent = slide.title;
  slideText.textContent = slide.text;

  dots.innerHTML = "";

  slides.forEach((item, i) => {
    const dot = document.createElement("button");

    dot.className = "dot";

    if (i === currentSlide) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      showSlide(i);
    });

    dots.appendChild(dot);
  });
}

// NEXT BUTTON
document.getElementById("next").addEventListener("click", () => {
  showSlide(currentSlide + 1);
});

// PREVIOUS BUTTON
document.getElementById("previous").addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

// AUTO SLIDE
setInterval(() => {
  showSlide(currentSlide + 1);
}, 4000);

// OPEN BIRTHDAY LETTER
const openLetter = document.getElementById("openLetter");
const letterContent = document.getElementById("letterContent");

openLetter.addEventListener("click", () => {
  letterContent.classList.toggle("show");

  if (letterContent.classList.contains("show")) {
    openLetter.textContent = "Close Letter ♡";
  } else {
    openLetter.textContent = "Open My Letter ♡";
  }
});

// MUSIC BUTTON - ORIGINAL BROWSER TONES
const musicButton = document.getElementById("musicButton");

let audioContext = null;
let musicTimer = null;
let musicPlaying = false;
let noteIndex = 0;

const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46];

function playNote(frequency) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);

  gain.gain.exponentialRampToValueAtTime(0.04, audioContext.currentTime + 0.05);

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioContext.currentTime + 0.5,
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.55);
}

musicButton.addEventListener("click", async () => {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      alert("Audio is not supported in this browser.");
      return;
    }

    audioContext = new AudioContextClass();
  }

  if (!musicPlaying) {
    await audioContext.resume();

    musicPlaying = true;
    musicButton.textContent = "♫ Music ON";

    musicTimer = setInterval(() => {
      playNote(notes[noteIndex]);

      noteIndex = (noteIndex + 1) % notes.length;
    }, 600);
  } else {
    musicPlaying = false;

    clearInterval(musicTimer);

    await audioContext.suspend();

    musicButton.textContent = "♫ Music OFF";
  }
});

// SURPRISE BUTTON
const surprise = document.getElementById("surprise");
const surpriseText = document.getElementById("surpriseText");

surprise.addEventListener("click", () => {
  surpriseText.textContent =
    "🎉 Happy Birthday! Keep shining, beautiful star! 💗";

  createConfetti();
});

// CONFETTI
function createConfetti() {
  const colors = ["#ff8fb1", "#ffd166", "#b8a4e8", "#a8e6cf", "#ffffff"];

  for (let i = 0; i < 70; i++) {
    const piece = document.createElement("div");

    piece.style.position = "fixed";
    piece.style.top = "-20px";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.width = "10px";
    piece.style.height = "14px";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];

    piece.style.zIndex = "999";
    piece.style.pointerEvents = "none";

    piece.style.transition = "transform 3s linear, opacity 3s linear";

    document.body.appendChild(piece);

    requestAnimationFrame(() => {
      piece.style.transform = `translateY(110vh) rotate(${Math.random() * 900}deg)`;

      piece.style.opacity = "0";
    });

    setTimeout(() => {
      piece.remove();
    }, 3200);
  }
}

// INITIALIZE WEBSITE
showSlide(0);
