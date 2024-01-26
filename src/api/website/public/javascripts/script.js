// tippy.js
import Riniya from '@riniya.ts'

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

function urls() {
  const url = `https://discord.com/api/oauth2/authorize?client_id=${Riniya.instance.application.id}&permissions=8&scope=bot`
  document.getElementById('getstarted').setAttribute("href", url)
  document.getElementById('invite').setAttribute("href", url)
}

function commands() {
  const commands = Riniya.instance.manager.toList()

  for (let command in commands) {
    let cmd = commands[command]

    let options = "";
    for (let option in cmd.options) {
      let opt = cmd.options[option]
      console.log(opt)
      options.concat(`<${opt.name}>`);
    }

    if (cmd.options.length <= 0) {
      options = 'No arguments'
    }

    $('#commands-list').append(`<tr><td>${cmd.category}</td> <td>${cmd.name}</td><td>${cmd.description}</td><td>${options}</td></tr>`);
  }
}

function refresh() {
  $('#servers').text(Riniya.instance.guilds.cache.size)
  $('#users').text(Riniya.instance.users.cache.size)
  $('#commands').text(Riniya.instance.manager.toList().length)
}

urls()
commands()
refresh()