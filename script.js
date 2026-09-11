// Service Excellence Edge — shared behaviour
(function(){
  "use strict";

  // Mobile nav toggle
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (toggle && header){
    toggle.addEventListener("click", function(){
      var isOpen = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    document.querySelectorAll(".nav-links a").forEach(function(link){
      link.addEventListener("click", function(){
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Scroll-triggered reveal for [data-reveal] elements.
  // Uses IntersectionObserver so elements reveal as they enter the
  // viewport, instead of a single page-load stagger (which left
  // below-the-fold content stuck at opacity:0 on longer pages).
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length){
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)){
      // No animation: content is visible by default (no class needed).
    } else {
      revealEls.forEach(function(el){ el.classList.add("reveal-init"); });
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting){
            entry.target.classList.add("reveal-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -10% 0px" });
      revealEls.forEach(function(el){ io.observe(el); });

      // Safety net: if anything is somehow never observed as
      // intersecting (fast programmatic scrolls, older engines,
      // edge-case viewport states), force it visible after a short
      // delay so content can never be stuck permanently hidden.
      window.setTimeout(function(){
        document.querySelectorAll(".reveal-init:not(.reveal-visible)").forEach(function(el){
          el.classList.add("reveal-visible");
        });
      }, 1800);
    }
  }

  // Contact form: basic client-side handling for static hosting.
  // No backend is included — wire ACTION_ENDPOINT below to a form
  // service (e.g. Formspree, Netlify Forms) to receive submissions.
  var form = document.getElementById("contact-form");
  if (form){
    form.addEventListener("submit", function(e){
      var endpoint = form.getAttribute("data-endpoint");
      var status = document.getElementById("form-status");
      if (!endpoint || endpoint.indexOf("REPLACE_WITH") === 0){
        e.preventDefault();
        var name = encodeURIComponent(form.name.value || "");
        var email = encodeURIComponent(form.email.value || "");
        var company = encodeURIComponent(form.company.value || "");
        var message = encodeURIComponent(form.message.value || "");
        var body = "Name: " + decodeURIComponent(name) +
          "%0ACompany: " + decodeURIComponent(company) +
          "%0AEmail: " + decodeURIComponent(email) +
          "%0A%0A" + decodeURIComponent(message);
        window.location.href = "mailto:hello@serviceexcellenceedge.com?subject=Website%20enquiry&body=" + body;
        if (status){
          status.textContent = "Opening your email client to send this enquiry…";
        }
      }
    });
  }
})();
