gsap.registerPlugin(ScrollTrigger);

/* RESET OVERLAYS */
document.addEventListener("DOMContentLoaded", () => {
  gsap.set(".page-transition", { scaleY: 0 });
  gsap.set(".hero-mask", { scaleY: 1, transformOrigin: "top" });
});
window.scrollTo(0, 0);

/* LOADER */
window.addEventListener("load", () => {
  gsap.to(".loader", {
    opacity: 0,
    duration: 0.8,
    onComplete: () => {
      document.querySelector(".loader").style.display = "none";
      gsap.to(".hero-mask", { scaleY: 0, duration: 1.2, ease: "power4.inOut" });
    },
  });
});

/* HERO TEXT ANIMATION */
const heroTitle = document.querySelector(".hero-title");
heroTitle.innerHTML = heroTitle.textContent
  .split("")
  .map((l) => `<span>${l}</span>`)
  .join("");
gsap.from(".hero-title span", {
  y: 120,
  opacity: 0,
  stagger: 0.03,
  ease: "power4.out",
  duration: 1.2,
  delay: 0.4,
});
gsap.to(".hero-title span", {
  rotation: () => Math.random() * 5 - 2.5,
  color: "#fff",
  repeat: -1,
  yoyo: true,
  stagger: 0.1,
  ease: "sine.inOut",
  duration: 3,
});

/* HERO BG ZOOM */
gsap.to(".hero-bg", {
  scale: 1.15,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
});

/* HERO SVG FLOAT */
gsap.to(".hero-svg circle", {
  y: "+=20",
  x: "+=15",
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  duration: 8,
});
gsap.to(".hero-svg rect", {
  y: "+=10",
  x: "-=10",
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  duration: 10,
});

/* HERO STAMP FLOAT */
gsap.from(".hero-stamp span", {
  y: 20,
  opacity: 0,
  stagger: 0.15,
  duration: 1,
  delay: 0.8,
});
gsap.to(".hero-stamp", {
  y: -6,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

/* ABOUT ANIMATION */
gsap.from(".about img", {
  x: -100,
  opacity: 0,
  scrollTrigger: { trigger: ".about", start: "top 70%" },
});
gsap.from(".about-text", {
  x: 100,
  opacity: 0,
  scrollTrigger: { trigger: ".about", start: "top 70%" },
});
gsap.to(".about-svg circle", {
  y: "+=20",
  x: "-=20",
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  duration: 12,
});

/* COLLECTION ANIMATION */
gsap.from(".collection-item", {
  y: 50,
  opacity: 0,
  stagger: 0.2,
  scrollTrigger: { trigger: ".collection", start: "top 80%" },
});
gsap.to(".collection-svg circle", {
  y: "+=10",
  x: "+=10",
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  duration: 15,
});

/* TESTIMONIAL TRACK */
const testimonialTrack = document.querySelector(".testimonial-track");
let testimonialPaused = false;
testimonialTrack.addEventListener(
  "mouseenter",
  () => (testimonialPaused = true)
);
testimonialTrack.addEventListener(
  "mouseleave",
  () => (testimonialPaused = false)
);
setInterval(() => {
  if (!testimonialPaused) {
    gsap.to(testimonialTrack, { x: "-=1", duration: 0.05, repeat: 0 });
  }
}, 50);

/* PAGE TRANSITION */
const sections = document.querySelectorAll("section");
sections.forEach((sec) => {
  ScrollTrigger.create({
    trigger: sec,
    start: "top bottom",
    onEnter: () =>
      gsap.fromTo(
        ".page-transition",
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 0, duration: 0.8, ease: "power4.inOut" }
      ),
    onLeaveBack: () =>
      gsap.fromTo(
        ".page-transition",
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 0, duration: 0.8, ease: "power4.inOut" }
      ),
  });
});

/* CUSTOM CURSOR */
const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);
document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX - 60,
    y: e.clientY - 20,
    duration: 0.15,
    ease: "power3.out",
  });
});

/* HAMBURGER MENU */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("toggle");
});

// Optional: close menu when clicking a link
document.querySelectorAll(".nav-links li a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("toggle");
  });
});

// Slowly rotate footer SVG background for effect
const footerSVG = document.querySelector(".footer-svg");
let rotation = 0;
function animateFooter() {
  rotation += 0.02; // speed
  footerSVG.style.transform = `rotate(${rotation}deg)`;
  requestAnimationFrame(animateFooter);
}
animateFooter();

// Slowly rotate SVGs independently
const circle1 = document.querySelector(".circle1");
const circle2 = document.querySelector(".circle2");
const circle3 = document.querySelector(".circle3");

let angle1 = 0,
  angle2 = 0,
  angle3 = 0;

function animateFooterSVGs() {
  angle1 += 0.02;
  angle2 -= 0.015;
  angle3 += 0.025;

  circle1.style.transform += ` rotate(${angle1}deg)`;
  circle2.style.transform += ` rotate(${angle2}deg)`;
  circle3.style.transform += ` rotate(${angle3}deg)`;

  requestAnimationFrame(animateFooterSVGs);
}

animateFooterSVGs();
