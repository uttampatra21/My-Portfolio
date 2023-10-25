const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// SMALL ANIMITION
{
  Shery.mouseFollower();
  Shery.makeMagnet(".magnet");
  // Shery.hoverWithMediaCircle("#videoAnimation", {
  //   videos: ["./image/re.mp4"],
  // });
}

// NAVBAR
{
  /** @format */
  let menuOpen = new gsap.timeline({
    paused: true,
  });

  menuOpen.to(".menu-container", {
    zIndex: 30,
    duration: 0.1,
  });
  menuOpen
    .to(".menu-container", {
      opacity: 1,
    })
    .from(
      ".menu-close-section, .inner-menu-close h1",
      {
        y: "100%",
        duration: 0.8,
        stagger: {
          amount: 0.2,
        },
      },
      "<"
    )
    .from(
      ".menu-about-section, .menu-blogs-section, .menu-contact-section",
      {
        x: "100%",
        duration: 0.8,
        stagger: {
          amount: 0.4,
          from: "end",
        },
      },
      "<"
    );

  function menuopen() {
    menuOpen.play() ? menuOpen.restart() : menuOpen.play();
  }
  function menuclose() {
    gsap
      .timeline()
      .to(".menu-container", {
        opacity: 0,
      })
      .to(".menu-container", {
        zIndex: -10,
      });
  }
}
// TEXT ANIMMITION
{
  // GSAP
  gsap.from([".navLink", ".mainTitle"], {
    stagger: 0.2,
    y: 20,
    duration: 1,
    ease: Power2,
    opacity: 0,
  });

  // TEXT ANIMITION
  function textAnimition() {
    // Variables
    const el = document.querySelector(".textClass");

    // Variables ~ Widths
    let elWidth = el.offsetWidth;
    let windowWidth = window.innerWidth;

    // Variables ~ Mouse
    let mouseX = 0;
    let prevMouseX = 0;

    // Target: value we want to animate to
    let skewTarget = 0;
    let translateTarget = 0;

    // WithEasing: value we use to animate
    let skewWithEasing = 0;
    let translateWithEasing = 0;

    // EasingFactor: determines how quick the animation/interpolation goes
    let skewEasingFactor = 0.1;
    let translateEasingFactor = 0.05;

    // Events
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleWindowResize);

    // Functions
    function handleMouseMove(e) {
      mouseX = e.pageX;
    }

    function handleWindowResize(e) {
      elWidth = el.offsetWidth;
      windowWidth = window.innerWidth;
    }

    function lerp(start, end, factor) {
      return (1 - factor) * start + factor * end;
    }

    function animateMe() {
      // Get difference between current and previous mouse position
      skewTarget = mouseX - prevMouseX;
      prevMouseX = mouseX;

      // Calc how much we need to translate our el
      translateTarget = ((elWidth - windowWidth) / windowWidth) * mouseX * -1;

      // Ease between start and target values (skew)
      skewWithEasing = lerp(skewWithEasing, skewTarget, skewEasingFactor);

      // Limit our skew to a range of 75 degrees so it doesn't "over-skew"
      skewWithEasing = Math.min(Math.max(parseInt(skewWithEasing), -75), 75);

      // Ease between start and target values (translate)
      translateWithEasing = lerp(
        translateWithEasing,
        translateTarget,
        translateEasingFactor
      );

      el.style.transform = `
    translateX(${translateWithEasing}px)
    skewX(${skewWithEasing}deg)
  `;

      // RAF
      window.requestAnimationFrame(animateMe);
    }

    window.requestAnimationFrame(animateMe);
  }
  textAnimition();
}

//! FOLLOW ME

{
  // const follow = () => {
  //   function horizontalLoop(items, config) {
  //     items = gsap.utils.toArray(items);
  //     config = config || {};
  //     let tl = gsap.timeline({
  //         repeat: config.repeat,
  //         paused: config.paused,
  //         defaults: { ease: "none" },
  //         onReverseComplete: () =>
  //           tl.totalTime(tl.rawTime() + tl.duration() * 100),
  //       }),
  //       length = items.length,
  //       startX = items[0].offsetLeft,
  //       times = [],
  //       widths = [],
  //       xPercents = [],
  //       curIndex = 0,
  //       pixelsPerSecond = (config.speed || 1) * 60,
  //       snap =
  //         config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
  //       totalWidth,
  //       curX,
  //       distanceToStart,
  //       distanceToLoop,
  //       item,
  //       i;
  //     gsap.set(items, {
  //       // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
  //       xPercent: (i, el) => {
  //         let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
  //         xPercents[i] = snap(
  //           (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
  //             gsap.getProperty(el, "xPercent")
  //         );
  //         return xPercents[i];
  //       },
  //     });
  //     gsap.set(items, { x: 0 });
  //     totalWidth =
  //       items[length - 1].offsetLeft +
  //       (xPercents[length - 1] / 100) * widths[length - 1] -
  //       startX +
  //       items[length - 1].offsetWidth *
  //         gsap.getProperty(items[length - 1], "scaleX") +
  //       (parseFloat(config.paddingRight) || 0);
  //     for (i = 0; i < length; i++) {
  //       item = items[i];
  //       curX = (xPercents[i] / 100) * widths[i];
  //       distanceToStart = item.offsetLeft + curX - startX;
  //       distanceToLoop =
  //         distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
  //       tl.to(
  //         item,
  //         {
  //           xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
  //           duration: distanceToLoop / pixelsPerSecond,
  //         },
  //         0
  //       )
  //         .fromTo(
  //           item,
  //           {
  //             xPercent: snap(
  //               ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
  //             ),
  //           },
  //           {
  //             xPercent: xPercents[i],
  //             duration:
  //               (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
  //             immediateRender: false,
  //           },
  //           distanceToLoop / pixelsPerSecond
  //         )
  //         .add("label" + i, distanceToStart / pixelsPerSecond);
  //       times[i] = distanceToStart / pixelsPerSecond;
  //     }
  //     function toIndex(index, vars) {
  //       vars = vars || {};
  //       Math.abs(index - curIndex) > length / 2 &&
  //         (index += index > curIndex ? -length : length); // always go in the shortest direction
  //       let newIndex = gsap.utils.wrap(0, length, index),
  //         time = times[newIndex];
  //       if (time > tl.time() !== index > curIndex) {
  //         // if we're wrapping the timeline's playhead, make the proper adjustments
  //         vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
  //         time += tl.duration() * (index > curIndex ? 1 : -1);
  //       }
  //       curIndex = newIndex;
  //       vars.overwrite = true;
  //       return tl.tweenTo(time, vars);
  //     }
  //     tl.next = (vars) => toIndex(curIndex + 1, vars);
  //     tl.previous = (vars) => toIndex(curIndex - 1, vars);
  //     tl.current = () => curIndex;
  //     tl.toIndex = (index, vars) => toIndex(index, vars);
  //     tl.times = times;
  //     tl.progress(1, true).progress(0, true); // pre-render for performance
  //     if (config.reversed) {
  //       tl.vars.onReverseComplete();
  //       tl.reverse();
  //     }
  //     return tl;
  //   }
  //   const elem = gsap.utils.toArray(".elem");
  //   const loop = horizontalLoop(elem, { paused: false, repeat: -1 });
  //   document.querySelectorAll("#follow").forEach((stripe) => {
  //     stripe.addEventListener("mousemove", () => {
  //       gsap.to(stripe.children[0], {
  //         height: "100%",
  //         ease: Expo,
  //         duration: 0.3,
  //       });
  //       gsap.to(stripe.children[1], {
  //         opacity: 1,
  //         ease: Expo,
  //         duration: 0.3,
  //         delay: 0.3,
  //       });
  //       gsap.to(".elem a", {
  //         color: "#000",
  //         ease: Expo,
  //         duration: 0.3,
  //       });
  //     });
  //     stripe.addEventListener("mouseleave", () => {
  //       gsap.to(stripe.children[0], {
  //         height: "0%",
  //         opacity: 1,
  //         ease: Expo,
  //         duration: 0.3,
  //         delay: 0.3,
  //       });
  //       gsap.to(stripe.children[1].children[0], {
  //         opacity: 0,
  //         ease: Expo,
  //         duration: 0.3,
  //         color: "#000",
  //       });
  //       gsap.to(".elem a", {
  //         color: "#fff",
  //         ease: Expo,
  //         duration: 0.3,
  //       });
  //     });
  //   });
  // };
  // follow();
  // TEXT CIRCLE
}

// ROUND TEXT CIRCLE
{
  const circleText = document.querySelector("#circleText");
  // circleText.innerHTML = circleText.te
  // .split("")
  // .map(
  //   (char, i) => `<span style="transform:rotate(${i * 8.3}deg)">${char}</span>`
  // )
  // .join("");
  // PROJECTS SHERY JS
  // ScrollTrigger.create({
  // 	trigger:".fimages",
  // 	start:"top top",
  // 	end:"bottom bottom",
  // 	pin:"#flemem"
  // })
}

// PROJEXTS SCROLL TRIGGER
{
  // gsap.to("#flemem", {
  //   scrollTigger: {
  //     trigger: ".fimages",
  //     pin: true,
  //     start: "top top",
  //     end: "bottom bottom",
  //     endTrigger: ".last",
  //     scrub: 1,
  //   },
  //   y: "-300%",
  //   ease: Power1,
  // });
  // Shery.imageEffect("", {
  //   style: 5,
  //   slideStyle: (setScroll) => {
  //     window.addEventListener("scroll", () => {
  //       setScroll(window.scrollY / innerHeight); //Updating the scroll
  //     });
  //   },
  // });
}

// MARQUE ANIMITION

{
  let currentScroll = 0;
  let currentScrollingDown = true;
  let video = document.querySelectorAll("#videoMargue");

  let tween = gsap
    .to("#text-part", {
      xPercent: -100,
      repeat: -1,
      duration: 5,
      ease: "linear",
    })
    .totalProgess(0.5);
  gsap.set("#marqueinner", {
    sPercent: -50,
  });
}
