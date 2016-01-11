$(document).ready(function() {

  function detectLanguage() {
    console.log("detected language: " + i18n.lng());
    return i18n.lng();
  }


  function lengthOfResource(operation) {
    console.log("amount of tips: " + Object.keys(i18n.getResourceBundle(detectLanguage()).hints[operation]).length);
    return Object.keys(i18n.getResourceBundle(detectLanguage()).hints[operation]).length;
  }


  function addKeys(operation) {
    var tips = i18n.getResourceBundle(detectLanguage());
    console.dir(tips);

    var hintMenu = $('#hintSelect');

    for (var i = 0; i < tips.hints[operation].length; i++) {
      appendToMenu(hintMenu, tips.hints[operation][i][0]);

    }


    //for (var key in tips.hints[operation]) {
    //  if (tips.hints[operation].hasOwnProperty(key)) {
    //    console.dir(key);
    //    appendToMenu(hintMenu, key);
    //  }
    //}
  }


  /**
   * appends a key as <option> to a given <select> menu
   * @param menu the menu to append to
   * @param key the key to append
   */
  function appendToMenu(menu, key) {
    menu.append('<option value="/">' + key + '</option>');
  }



  /**
   * *global*
   * generates a <select> menu containing the tips for a given operation
   * @param operation the operation to generate the menu for
   */
  makeTipsSelect = function(operation) {
    addKeys(operation);
    selectCurrent();
  };

  function selectCurrent() {
    var loc = ((window.location.pathname).split('/'));
    loc.pop();
    var tipNumber = loc.pop();
    console.dir(tipNumber);
    console.dir($('#hintSelect option').eq(tipNumber)[0]);
    if ($('#hintSelect option').eq(tipNumber)[0] !== undefined) {
      $('#hintSelect option').eq(tipNumber)[0].selected = true;
    }

  }



  $('#hintSelect').unbind().on("change", function() {
    console.dir($(this).prop('selectedIndex'));
    window.location = '../' + ($(this).prop('selectedIndex'));
  });

  $('#nextTipButton').unbind().on("click", function() {
    console.dir($('#hintSelect option:selected'));

    var $select = $('#hintSelect');
    var index = ++$select[0].selectedIndex;
    console.log('length ' + $select.find('option').length);
    $select[0].selectedIndex = index % $select.find('option').length;
    $select.trigger('change');
  });

  $('#prevTipButton').unbind().on("click", function() {
    var $select = $('#hintSelect');
    var index = --$select[0].selectedIndex;
    if (index < 0) {
      $select[0].selectedIndex = $select.find('option').length - 1;
    } else {
      $select[0].selectedIndex = index % $select.find('option').length -1;
    }
    $select.trigger('change')
  });


});
