(function () {
  'use strict';

  var THEME_KEY = 'theme';

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    updateThemeToggle(theme);
  }

  function updateThemeToggle(theme) {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var isLight = theme === 'light';
    btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    btn.setAttribute('title', isLight ? 'Dark mode' : 'Light mode');
    btn.innerHTML = isLight
      ? '<span class="theme-icon" aria-hidden="true">🌙</span>'
      : '<span class="theme-icon" aria-hidden="true">☀️</span>';
  }

  function initTheme() {
    var stored = getStoredTheme();
    var theme = stored || getSystemTheme();
    applyTheme(theme);

    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') || 'dark';
        var next = current === 'light' ? 'dark' : 'light';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    }

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
      if (!getStoredTheme()) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }

  function initMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('nav-links--open');
      toggle.setAttribute('aria-expanded', open);
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('nav-links--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('nav-links--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function initReadingProgress() {
    var bar = document.getElementById('reading-progress');
    if (!bar) return;

    function update() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, progress)) + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    function update() {
      if (window.scrollY > 400) {
        btn.classList.add('back-to-top--visible');
      } else {
        btn.classList.remove('back-to-top--visible');
      }
    }

    window.addEventListener('scroll', update, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    update();
  }

  function initCopyLink() {
    var btn = document.getElementById('copy-link');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          showCopied(btn);
        });
      } else {
        var input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showCopied(btn);
      }
    });
  }

  function showCopied(btn) {
    var original = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copy-link--copied');
    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove('copy-link--copied');
    }, 2000);
  }

  function initPostToc() {
    var toc = document.getElementById('post-toc');
    var content = document.querySelector('.post-content');
    if (!toc || !content) return;

    var headings = content.querySelectorAll('h2, h3');
    if (headings.length < 3) {
      toc.closest('.post-toc-wrapper').style.display = 'none';
      return;
    }

    var list = document.createElement('ul');
    list.className = 'post-toc-list';

    headings.forEach(function (heading, i) {
      if (!heading.id) {
        heading.id = 'section-' + (i + 1);
      }
      var li = document.createElement('li');
      li.className = 'post-toc-item post-toc-item--' + heading.tagName.toLowerCase();
      var a = document.createElement('a');
      a.href = '#' + heading.id;
      a.textContent = heading.textContent;
      li.appendChild(a);
      list.appendChild(li);
    });

    toc.appendChild(list);
  }

  function initImageFallbacks() {
    document.querySelectorAll('.post-content img, .post-cover img, .post-preview-thumbnail img').forEach(function (img) {
      img.addEventListener('error', function () {
        img.classList.add('img--broken');
        img.alt = img.alt || 'Image unavailable';
      });
    });
  }

  initTheme();
  initMobileNav();
  initReadingProgress();
  initBackToTop();
  initCopyLink();
  initPostToc();
  initImageFallbacks();
})();
