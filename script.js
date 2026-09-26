/* =========================================
   CHENMAN GORDEN
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   1. COLOR SWITCHER
========================================= */

document.querySelectorAll(".color-options").forEach(function (container) {

  const product = container.dataset.product;

  if (!product) return;

  const image = document.getElementById("image-" + product);

  const card = container.closest(".product-card");

  const titleBar = card
    ? card.querySelector(".color-title b")
    : null;


  container.querySelectorAll(".color-option").forEach(function (button) {

    button.addEventListener("click", function () {

      const newImage = this.dataset.image;
      const color = this.dataset.color;


      /* ACTIVE SWATCH */

      container
        .querySelectorAll(".color-option")
        .forEach(function (item) {

          item.classList.remove("active");

        });

      this.classList.add("active");


      /* UPDATE COLOR NAME */

      if (titleBar && color) {

        titleBar.textContent = "- " + color;

      }


      /* CHANGE MAIN PRODUCT IMAGE */

      if (image && newImage) {

        image.classList.add("changing");


        setTimeout(function () {

          image.src = newImage;

          image.alt =
            "Chenman " +
            product.toUpperCase() +
            " " +
            (color || "");


          image.onload = function () {

            image.classList.remove("changing");

          };


          /* CACHE FALLBACK */

          if (image.complete) {

            image.classList.remove("changing");

          }

        }, 150);

      }

    });

  });

});


/* =========================================
   2. PRELOAD PRODUCT IMAGES
========================================= */

document.querySelectorAll(".color-option").forEach(function (button) {

  const image = button.dataset.image;

  if (!image) return;

  const preload = new Image();

  preload.src = image;

});


/* =========================================
   3. MOBILE MENU
========================================= */

const menuButton =
  document.querySelector(".menu-btn");

const mobileMenu =
  document.querySelector(".mobile-menu");


if (menuButton && mobileMenu) {

  menuButton.addEventListener("click", function () {

    menuButton.classList.toggle("active");

    mobileMenu.classList.toggle("active");

  });


  /* CLOSE MENU AFTER CLICK */

  mobileMenu
    .querySelectorAll("a")
    .forEach(function (link) {

      link.addEventListener("click", function () {

        menuButton.classList.remove("active");

        mobileMenu.classList.remove("active");

      });

    });

}


/* =========================================
   4. SMOOTH SCROLL
========================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(function (link) {

    link.addEventListener("click", function (e) {

      const targetId =
        this.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) return;


      const target =
        document.querySelector(targetId);

      if (!target) return;


      e.preventDefault();


      const header =
        document.querySelector(".site-header");

      const headerHeight =
        header
          ? header.offsetHeight
          : 0;


      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;


      window.scrollTo({

        top: targetPosition,

        behavior: "smooth"

      });

    });

  });


/* =========================================
   5. HEADER SCROLL EFFECT
========================================= */

const header =
  document.querySelector(".site-header");


function updateHeader() {

  if (!header) return;


  if (window.scrollY > 40) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

}


window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive: true
  }
);


updateHeader();


/* =========================================
   6. ABOUT CARD MOUSE EFFECT
========================================= */

document
  .querySelectorAll(".about-card")
  .forEach(function (card) {

    card.addEventListener(
      "mousemove",
      function (e) {

        const rect =
          card.getBoundingClientRect();


        const x =
          e.clientX - rect.left;

        const y =
          e.clientY - rect.top;


        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;


        const moveX =
          (x - centerX) / 15;

        const moveY =
          (y - centerY) / 15;


        card.style.transform =
          "translate(" +
          moveX +
          "px, " +
          moveY +
          "px)";

      }
    );


    card.addEventListener(
      "mouseleave",
      function () {

        card.style.transform =
          "translate(0, 0)";

      }
    );

  });


/* =========================================
   7. ABOUT TEXT
   WRAP WORDS TANPA MERUSAK <em>
========================================= */

function wrapWords(element, className) {

  if (!element) return [];


  const walker =
    document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT
    );


  const textNodes = [];


  while (walker.nextNode()) {

    textNodes.push(
      walker.currentNode
    );

  }


  textNodes.forEach(function (node) {

    const text =
      node.textContent;


    if (!text.trim()) {

      return;

    }


    const fragment =
      document.createDocumentFragment();


    text
      .split(/(\s+)/)
      .forEach(function (part) {


        /* SPASI */

        if (/^\s+$/.test(part)) {

          fragment.appendChild(
            document.createTextNode(part)
          );

          return;

        }


        /* KATA */

        if (part) {

          const span =
            document.createElement("span");


          span.className =
            className;


          span.textContent =
            part;


          fragment.appendChild(
            span
          );

        }

      });


    node.parentNode.replaceChild(
      fragment,
      node
    );

  });


  return Array.from(
    element.querySelectorAll(
      "." + className
    )
  );

}


/* =========================================
   8. ABOUT TITLE
========================================= */

const aboutTitle =
  document.querySelector(".about-title");


const titleWords =
  wrapWords(
    aboutTitle,
    "title-word"
  );


/* =========================================
   9. ABOUT DESCRIPTION
========================================= */

const aboutDescription =
  document.querySelector(".about-description");


const descriptionWords =
  wrapWords(
    aboutDescription,
    "desc-word"
  );


/* =========================================
   10. ABOUT SCROLL REVEAL
========================================= */

function revealAboutText() {

  const viewportHeight =
    window.innerHeight;


  /* TITLE */

  if (
    aboutTitle &&
    titleWords.length
  ) {

    const rect =
      aboutTitle.getBoundingClientRect();


    const start =
      viewportHeight * 0.90;


    const end =
      viewportHeight * 0.25;


    const progress =
      Math.min(
        1,
        Math.max(
          0,
          (start - rect.top) /
          (start - end)
        )
      );


    titleWords.forEach(
      function (word, index) {

        const wordProgress =
          Math.min(
            1,
            Math.max(
              0,
              progress *
              titleWords.length -
              index
            )
          );


        word.style.opacity =
          0.12 +
          wordProgress * 0.88;


        word.style.transform =
          "translateY(" +
          (
            (1 - wordProgress) *
            35
          ) +
          "px)";

      }
    );

  }


  /* DESCRIPTION */

  if (
    aboutDescription &&
    descriptionWords.length
  ) {

    const rect =
      aboutDescription.getBoundingClientRect();


    const start =
      viewportHeight * 0.85;


    const end =
      viewportHeight * 0.25;


    const progress =
      Math.min(
        1,
        Math.max(
          0,
          (start - rect.top) /
          (start - end)
        )
      );


    descriptionWords.forEach(
      function (word, index) {

        const wordProgress =
          Math.min(
            1,
            Math.max(
              0,
              progress *
              descriptionWords.length -
              index
            )
          );


        word.style.opacity =
          0.15 +
          wordProgress * 0.85;


        word.style.transform =
          "translateY(" +
          (
            (1 - wordProgress) *
            22
          ) +
          "px)";

      }
    );

  }

}


/* =========================================
   11. GENERAL SECTION REVEAL
========================================= */

const revealElements =
  document.querySelectorAll(
    ".section-head, " +
    ".vision-mission-intro, " +
    ".vision-card, " +
    ".team-photo, " +
    ".consultation-feature img, " +
    ".consultation-grid img, " +
    ".product-card, " +
    ".about-card, " +
    ".project, " +
    ".contact-box"
  );


revealElements.forEach(function (element) {

  element.classList.add("reveal");

});


if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      function (entries, obs) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            obs.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(
    function (element) {

      observer.observe(element);

    }
  );

} else {

  revealElements.forEach(
    function (element) {

      element.classList.add("visible");

    }
  );

}


/* =========================================
   12. FOOTER YEAR
========================================= */

const year =
  document.getElementById("year");


if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* =========================================
   13. IMAGE ERROR HANDLING
========================================= */

document
  .querySelectorAll("img")
  .forEach(function (image) {

    image.addEventListener(
      "error",
      function () {

        this.classList.add(
          "image-error"
        );

        console.warn(
          "Gambar gagal dimuat:",
          this.src
        );

      }
    );

  });


/* =========================================
   14. SCROLL + RESIZE
========================================= */

window.addEventListener(
  "scroll",
  revealAboutText,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  revealAboutText
);


/* =========================================
   15. INITIALIZE
========================================= */

revealAboutText();


/* =========================================
   VISION / MISSION CARD INTERACTION
========================================= */

const visionCards =
  document.querySelectorAll(".vision-card");

visionCards.forEach(function (card) {

  card.addEventListener("click", function () {

    const alreadyActive =
      card.classList.contains("active");

    visionCards.forEach(function (item) {
      item.classList.remove("active");
    });

    if (!alreadyActive) {
      card.classList.add("active");
    }

  });

});