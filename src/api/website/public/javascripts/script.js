// tippy.js

tippy("[data-tippy-content]");

// aos.js
AOS.init({
  duration: 700,
  once: true
});

// navbar burger
document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

$(document).ready(function() {
  $(".navbar-burger").click(function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
  });
});

// navbar on scroll
$(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 700) {
      $("nav").addClass("nav-w");
      $(".navbar-menu").addClass("nav-w");
      $(".navbar-item").addClass("nav-dark");
      $(".navbar-link").addClass("nav-dark");
      $(".navbar-burger").removeClass("has-text-white");
      $(".navbar-burger").addClass("has-text-dark");
    } else {
      $("nav").removeClass("nav-w");
      $(".navbar-menu").removeClass("nav-w");
      $(".navbar-item").removeClass("nav-dark");
      $(".navbar-link").removeClass("nav-dark");
      $(".navbar-burger").removeClass("has-text-dark");
      $(".navbar-burger").addClass("has-text-white");
    }
  });
});

// back to top
var btn = $("#backtotop");

$(window).scroll(function () {
  if ($(window).scrollTop() > 100) {
    btn.addClass("show");
  } else {
    btn.removeClass("show");
  }
});

btn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "300");
});

// copyright year
document.getElementById("cp-year").innerHTML = new Date().getFullYear()

particlesJS("particles-js", {"particles":{"number":{"value":40,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":6,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":3,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"repulse"},"onclick":{"enable":false,"mode":"push"},"resize":false},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);
