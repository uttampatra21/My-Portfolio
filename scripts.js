const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

Shery.mouseFollower();
// Shery.makeMagnet(".magnet");

// GSAP
gsap.from(".navLink", {
  stagger: 0.2,
  y: 20,
  duration: 1,
  ease: Power2,
  opacity: 0,
});

Shery.imageEffect([".profile-image img"], {
  style: 3,
  config: {
    uFrequencyX: { value: 11.79, range: [0, 100] },
    uFrequencyY: { value: 11.61, range: [0, 100] },
    uFrequencyZ: { value: 11.61, range: [0, 100] },
    geoVertex: { range: [1, 64], value: 15.06 },
    zindex: { value: -9996999, range: [-9999999, 9999999] },
    aspect: { value: 1 },
    gooey: { value: false },
    infiniteGooey: { value: false },
    growSize: { value: 4, range: [1, 15] },
    durationOut: { value: 1, range: [0.1, 5] },
    durationIn: { value: 1.5, range: [0.1, 5] },
    displaceAmount: { value: 0.5 },
    masker: { value: false },
    maskVal: { value: 1, range: [1, 5] },
    scrollType: { value: 0 },
    noEffectGooey: { value: true },
    onMouse: { value: 0 },
    noise_speed: { value: 0.2, range: [0, 10] },
    metaball: { value: 0.2, range: [0, 2] },
    discard_threshold: { value: 0.5, range: [0, 1] },
    antialias_threshold: { value: 0.002, range: [0, 0.1] },
    noise_height: { value: 0.5, range: [0, 2] },
    noise_scale: { value: 10, range: [0, 100] },
  },
});
