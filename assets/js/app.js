window.addEventListener('load', () => {
  window.sr = ScrollReveal({ mobile: true });
  sr.reveal(".headings, .card, .section-one, .about-break-img, .section-two", {
    duration: 1000,
    origin: "bottom",
    distance: "150px"
  })
})