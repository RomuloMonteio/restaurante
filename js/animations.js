/* ===========================
   SISTEMA DE ANIMAÇÕES GLOBAL
   Zé do Pernil
=========================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- LOADING SCREEN ---------- */
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(function () {
      loadingScreen.classList.add('hidden');
      setTimeout(function () { loadingScreen.remove(); }, 500);
    }, 1400);
  }

  /* ---------- AOS INIT ---------- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }

  /* ---------- SCROLL PROGRESS BAR ---------- */
  var bar = document.getElementById('scroll-progress');
  if (bar) {
    window.addEventListener('scroll', function () {
      var scrolled = document.documentElement.scrollTop;
      var total    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      bar.style.width = (scrolled / total * 100) + '%';
    }, { passive: true });
  }

  /* ---------- NAVBAR SHRINK AO SCROLL ---------- */
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ---------- NAVBAR LINK ACTIVO ---------- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- RIPPLE NOS BOTÕES ---------- */
  document.querySelectorAll('.hero-btn-main, .hero-btn-outline, .rest-btn, .btn-glass, .btn-reserva').forEach(function (btn) {
    btn.classList.add('btn-ripple');
    btn.addEventListener('click', function (e) {
      var rect   = btn.getBoundingClientRect();
      var size   = Math.max(rect.width, rect.height);
      var x      = e.clientX - rect.left - size / 2;
      var y      = e.clientY - rect.top  - size / 2;
      var circle = document.createElement('span');
      circle.classList.add('ripple-circle');
      circle.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;';
      btn.appendChild(circle);
      setTimeout(function () { circle.remove(); }, 600);
    });
  });

  /* ---------- COUNTER ANIMADO ---------- */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1800;
    var step = target / (duration / 16);
    var current = 0;
    var timer = setInterval(function () {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current) + (el.getAttribute('data-suffix') || '');
    }, 16);
  }

  var counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { io.observe(el); });
  }

  /* ---------- PARALLAX HERO ---------- */
  var hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        hero.style.backgroundPositionY = (50 + scrollY * 0.18) + '%';
      }
    }, { passive: true });
  }

  /* ---------- PAGE TRANSITIONS ---------- */
  var overlay = document.getElementById('page-transition');
  if (overlay) {
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('//') || href.startsWith('javascript')) return;
      link.addEventListener('click', function (e) {
        e.preventDefault();
        overlay.classList.add('active');
        setTimeout(function () { window.location.href = href; }, 280);
      });
    });
    window.addEventListener('pageshow', function () {
      overlay.classList.remove('active');
    });
  }

  /* ---------- TOAST HELPER (global) ---------- */
  window.showToast = function (msg, type) {
    type = type || 'success';
    var container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    var toast = document.createElement('div');
    toast.className = 'toast-msg ' + type;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(function () {
      toast.classList.add('hiding');
      setTimeout(function () { toast.remove(); }, 350);
    }, 3500);
  };

  /* ---------- MENU HAMBURGER AUTO-CLOSE ---------- */
  var menu    = document.getElementById('menu');
  var toggler = document.querySelector('.navbar-toggler');
  if (menu && toggler) {
    document.addEventListener('click', function (e) {
      var open = menu.classList.contains('show');
      if (open && !menu.contains(e.target) && !toggler.contains(e.target)) {
        var bsc = bootstrap.Collapse.getInstance(menu) || new bootstrap.Collapse(menu, { toggle: false });
        bsc.hide();
      }
    });
  }

});
