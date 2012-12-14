
(function (global) {

  zz.json("/api/education.json", function (err, edu) {
    if (err) {
      console.error("Call to /api/education.json failed"); return;
    }
    var destination = document.querySelector("#education");
    destination.innerHTML = Mustache.render(destination.innerHTML, edu);
  });

}(window));
