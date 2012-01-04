
$(document).ready(function() {
  $(".meta_section").click(function(e) {
    if (e.target.tagName !== 'A') {
      $(this).find(".secondary_info").slideToggle();
      $(this).find(".time").fadeToggle();
    }
  });
  $(".expand_all").each(function() {
    $(this).html("Click to expand");
  });
  $(".meta_section").mouseover(function(e) {
    $(this).children(".expand_all").show();
  });
  $(".meta_section").mouseout(function(e) {
    $(this).children(".expand_all").hide();
  });
});
