(function () {
  function onReady(cb) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', cb);
      return;
    }
    cb();
  }

  onReady(function () {
    if (!window.posthog || typeof window.posthog.capture !== 'function') {
      return;
    }

    window.posthog.capture('portfolio_page_view', {
      page_path: window.location.pathname,
      page_title: document.title,
      page_url: window.location.href
    });

    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('.card-portfolio-one a, .card-portfolio-two a, .card-portfolio-three a, .card-portfolio-four a, .card-portfolio-one button, .card-portfolio-two button, .card-portfolio-three button, .card-portfolio-four button');

      if (!trigger) {
        return;
      }

      var card = trigger.closest('[class*="card-portfolio"]');
      var link = trigger.closest('a') || trigger.querySelector('a');

      window.posthog.capture('card_portfolio_click', {
        card_class: card ? card.className : null,
        card_text: trigger.textContent ? trigger.textContent.trim().slice(0, 120) : null,
        destination: link ? link.getAttribute('href') : null,
        page_path: window.location.pathname,
        page_title: document.title
      });
    });
  });
})();
