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

  // One orchestrated hero reveal on page load (not per-section scroll spam)
  var reveal = document.querySelectorAll("[data-reveal]");
  if (reveal.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    reveal.forEach(function(el, i){
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      el.style.transition = "opacity .6s ease " + (i * 0.09) + "s, transform .6s ease " + (i * 0.09) + "s";
    });
    window.requestAnimationFrame(function(){
      window.requestAnimationFrame(function(){
        reveal.forEach(function(el){
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      });
    });
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
