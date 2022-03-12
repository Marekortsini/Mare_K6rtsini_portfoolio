gsap.set('.cursor-follower', { xPercent: -50, yPercent: -70 });

/* --------------------------
 * VARS
 * -------------------------- */
const root = document.documentElement;
const main = document.querySelector('.main');
const cursorFollower = document.querySelector('.cursor-follower');
const cursorFollowerText = document.querySelector('.message');
const menuButton = document.querySelector('.menu-kursor');
const cursorFollowerMessages = document.querySelectorAll('.cursor-follower-message');
let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let mouse = { x: pos.x, y: pos.y };
let speed = 0.1;

let fpms = 60 / 1000;

let xSet = gsap.quickSetter(cursorFollower, 'x', 'px');
let ySet = gsap.quickSetter(cursorFollower, 'y', 'px');


/* --------------------------
 * MOUSE TRACKER EVENTS
 * -------------------------- */

document.addEventListener('mouseenter', e => {
  gsap.to(".cursor-follower", { duration: 0.2, scale: 1 })
});

document.addEventListener('mouseleave', e => {
  gsap.to(".cursor-follower", { duration: 0.3, scale: 0 })
});
window.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;

  root.style.setProperty('--mouse-x', mouse.x + 'px');
  root.style.setProperty('--mouse-y', mouse.y + 'px');

});

let menuTimeline = gsap.timeline({ paused: true });

menuTimeline.to(".dot", {
  duration: 0.2,
  y: 5,
  opacity: 0,
  ease: "power1.inOut",
  stagger: {
    amount: 0.1
  }
})
  .set(".dot", {
    y: -5,
  })
  .to(".dot", {
    duration: 0.2,
    y: 0,
    opacity: 1,
    ease: "power1.inOut",
    stagger: {
      amount: 0.1
    }
  })
  ;


/* --------------------------
 * MENU BUTTON
 * -------------------------- */
menuButton.addEventListener('mouseover', e => {
  gsap.to('.cursor-follower', { width: 40, height: 40 });

  menuTimeline.seek(0);
  menuTimeline.play();
});

menuButton.addEventListener('mouseout', e => {
  gsap.to('.cursor-follower', { width: 10, height: 10 });
});


/* --------------------------
 * TICKER
 * -------------------------- */
gsap.ticker.add((time, deltaTime) => {

  var delta = deltaTime * fpms;
  var dt = 1.0 - Math.pow(1.0 - speed, delta);

  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});


/* --------------------------
 * CURSOR FOLLOWER MESSAGES
 * -------------------------- */
cursorFollowerMessages.forEach((cursorFollowerMessage) => {
  let message = cursorFollowerMessage.dataset.cursorMessage;

  cursorFollowerMessage.addEventListener('mouseover', e => {
    gsap.to('.cursor-follower', { width: 70, height: 70, duration: 0.3, backgroundColor: 'rgba(255,255,255,0.9)', ease: 'back.inOut(1.3)' });
    gsap.to('.message', { opacity: 1, duration: 0.3, scale: 1, text: message });

  });
  cursorFollowerMessage.addEventListener('mouseout', e => {
    gsap.to('.cursor-follower', { width: 10, height: 10, duration: 0.3, backgroundColor: 'rgba(255,255,255,0)' });
    gsap.to('.message', { opacity: 0, duration: 0.3, scale: 0, text: "" });
    ;
  });
});