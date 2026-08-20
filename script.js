const $ = (id) =>
  document.getElementById(id);


/* =========================
   STAR BACKGROUND
========================= */

const canvas = $("stars");
const ctx = canvas.getContext("2d");

let stars = [];


function resizeCanvas() {

  const dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );

  canvas.width =
    window.innerWidth * dpr;

  canvas.height =
    window.innerHeight * dpr;

  canvas.style.width =
    window.innerWidth + "px";

  canvas.style.height =
    window.innerHeight + "px";

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );
}


function createStars() {

  stars = [];

  for (
    let i = 0;
    i < 130;
    i++
  ) {

    stars.push({

      x:
        Math.random() *
        window.innerWidth,

      y:
        Math.random() *
        window.innerHeight,

      r:
        Math.random() *
        1.3 + .2,

      speed:
        Math.random() *
        .18 + .025,

      opacity:
        Math.random() *
        .5 + .15,

      phase:
        Math.random() *
        Math.PI * 2

    });

  }

}


function animateStars() {

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );

  const time =
    performance.now() / 1000;


  stars.forEach((star) => {

    star.y -= star.speed;


    if (star.y < -4) {

      star.y =
        window.innerHeight + 4;

    }


    const opacity =
      Math.max(
        .04,
        star.opacity +
        Math.sin(
          time +
          star.phase
        ) * .12
      );


    ctx.beginPath();

    ctx.arc(
      star.x,
      star.y,
      star.r,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(255,255,255,${opacity})`;

    ctx.fill();

  });


  requestAnimationFrame(
    animateStars
  );
}


resizeCanvas();
createStars();
animateStars();


window.addEventListener(
  "resize",
  () => {

    resizeCanvas();
    createStars();

  }
);


/* =========================
   SECTION REVEAL
========================= */

function showSection(id) {

  const element =
    $(id);

  if (!element) return;

  element.classList.add("show");

  element.classList.remove("hidden");

}


/* =========================
   ENTER
========================= */

$("enterBtn").addEventListener(
  "click",
  () => {

    showSection("universe");

    showSection("littleThings");

    showSection("letterSection");

    showSection("duaSection");

    showSection("ending");


    $("universe").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


    sparkleBurst(35);

  }
);


/* =========================
   STAR MESSAGES
========================= */

const starsButtons =
  document.querySelectorAll(".star");


const messageText =
  $("messageText");


starsButtons.forEach((star) => {

  star.addEventListener(
    "click",
    () => {

      messageText.textContent =
        star.dataset.message;

      star.animate(
        [
          {
            transform: "scale(1)"
          },
          {
            transform: "scale(1.45)"
          },
          {
            transform: "scale(1)"
          }
        ],
        {
          duration: 450
        }
      );

      smallSparkle(
        star
      );

    }
  );

});


/* =========================
   ENVELOPE
========================= */

$("envelope").addEventListener(
  "click",
  () => {

    const letter =
      $("letter");

    letter.classList.remove(
      "hidden"
    );

    letter.classList.add(
      "show"
    );

    $("envelope").style.display =
      "none";

    letter.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    sparkleBurst(25);

  }
);


/* =========================
   FINAL MAGIC
========================= */

$("magicBtn").addEventListener(
  "click",
  () => {

    sparkleBurst(90);

    showPopup(
      "Bas itna hi tha. 😂🤍\n\nHappy Birthday once again, Zainab.\nKhush rehna, smile karte rehna. 🌙"
    );

  }
);


/* =========================
   POPUP
========================= */

const popup =
  $("popup");

const popupText =
  $("popupText");


function showPopup(text) {

  popupText.innerText =
    text;

  popup.classList.remove(
    "hidden"
  );

}


$("closePopup").addEventListener(
  "click",
  () => {

    popup.classList.add(
      "hidden"
    );

  }
);


popup.addEventListener(
  "click",
  (event) => {

    if (
      event.target === popup
    ) {

      popup.classList.add(
        "hidden"
      );

    }

  }
);


/* =========================
   SPARKLE EFFECT
========================= */

function sparkleBurst(amount) {

  const icons = [
    "✦",
    "✧",
    "✨",
    "🤍",
    "🌸"
  ];


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    setTimeout(() => {

      const spark =
        document.createElement(
          "div"
        );

      spark.textContent =
        icons[
          Math.floor(
            Math.random() *
            icons.length
          )
        ];

      spark.style.position =
        "fixed";

      spark.style.left =
        Math.random() * 100 + "vw";

      spark.style.top =
        Math.random() * 100 + "vh";

      spark.style.zIndex =
        "200";

      spark.style.pointerEvents =
        "none";

      spark.style.fontSize =
        12 +
        Math.random() * 18 +
        "px";

      spark.style.transition =
        "1.4s ease-out";

      document.body.appendChild(
        spark
      );


      requestAnimationFrame(() => {

        spark.style.transform =
          `translate(
            ${(Math.random() - .5) * 120}px,
            ${(Math.random() - .5) * 140}px
          ) scale(.2)`;

        spark.style.opacity =
          "0";

      });


      setTimeout(() => {

        spark.remove();

      }, 1500);

    }, i * 15);

  }

}


/* =========================
   SMALL STAR EFFECT
========================= */

function smallSparkle(element) {

  const rect =
    element.getBoundingClientRect();


  for (
    let i = 0;
    i < 8;
    i++
  ) {

    const spark =
      document.createElement(
        "div"
      );

    spark.textContent =
      "✦";

    spark.style.position =
      "fixed";

    spark.style.left =
      rect.left +
      rect.width / 2 +
      "px";

    spark.style.top =
      rect.top +
      rect.height / 2 +
      "px";

    spark.style.color =
      "#f5dda0";

    spark.style.zIndex =
      "300";

    spark.style.pointerEvents =
      "none";

    spark.style.fontSize =
      "13px";

    spark.style.transition =
      "900ms ease-out";

    document.body.appendChild(
      spark
    );


    requestAnimationFrame(() => {

      spark.style.transform =
        `translate(
          ${(Math.random() - .5) * 80}px,
          ${(Math.random() - .5) * 80}px
        )`;

      spark.style.opacity =
        "0";

    });


    setTimeout(() => {

      spark.remove();

    }, 950);

  }

}


/* =========================
   CLICK SPARKLES
========================= */

let lastClick =
  0;


document.addEventListener(
  "pointerdown",
  (event) => {

    const now =
      Date.now();


    if (
      now - lastClick <
      500
    ) return;


    lastClick =
      now;


    const spark =
      document.createElement(
        "div"
      );

    spark.textContent =
      "✦";

    spark.style.position =
      "fixed";

    spark.style.left =
      event.clientX + "px";

    spark.style.top =
      event.clientY + "px";

    spark.style.color =
      "#d8c8ff";

    spark.style.fontSize =
      "14px";

    spark.style.pointerEvents =
      "none";

    spark.style.zIndex =
      "500";

    spark.style.transition =
      "800ms ease-out";

    document.body.appendChild(
      spark
    );


    requestAnimationFrame(() => {

      spark.style.transform =
        "translateY(-30px) scale(.2)";

      spark.style.opacity =
        "0";

    });


    setTimeout(() => {

      spark.remove();

    }, 850);

  }
);
