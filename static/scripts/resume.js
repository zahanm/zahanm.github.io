
(function (global) {
  "use strict";

  var fetches = [
    { loc: "/api/education.json", dest: "#education" },
    { loc: "/api/workexp.json", dest: "#workexp" },
    { loc: "/api/teachlead.json", dest: "#teachlead" },
    { loc: "/api/achieve.json", dest: "#achieve" }
  ];

  fetches.forEach(function (f) {
    zz.json(f.loc, function (err, data) {
      if (err) {
        console.error("Call to " + f.loc + " failed"); return;
      }
      var destination = document.querySelector(f.dest);
      destination.innerHTML = Mustache.render(destination.innerHTML, data);
    });
  });

}(window));
