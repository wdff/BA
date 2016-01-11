$(document).ready(function() {


// replaces all "*" in problem strings with HTML entities
  $('.example, p.problem').each(
    function replaceStars() {
      console.log('replacing stars');
      $(this).html($(this).html().replace(/\*/gm, "&times;"));
    }
  );
});