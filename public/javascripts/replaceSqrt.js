$(document).ready(function() {


// replaces all "*" in problem strings with HTML entities
  $('.example, p.problem').each(
    function replaceRoots() {
      console.log('replacing roots');
      $(this).html($(this).html().replace(/sqrt\((\d+)\)/gm, "&radic;<span class='root'>$1</span>"));
    }
  );

});