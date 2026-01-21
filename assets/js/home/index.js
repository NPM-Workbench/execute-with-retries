(function ($mainRoot, w, d) {
  /* top level vars */
  var hasWebpSupport = false;

  function pageControl() {
    console.log("Hello World - Home Page Loaded.");
  }

  $(d).ready(function() {
    pageControl();
  });
})($("#homePage"), window, document);
