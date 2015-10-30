$(document).ready(function() {

    // ========================== TRANSLATION ===================== //


    var toTranslate = 'p, a, h1, label, button, input, span';
    var checkSolutionURL = "./checkSolution";

    $.i18n.init({
        //debug: true,
        detectLngQS: 'lang',
        //cookieName: 'lang',
        fallbackLng: 'en',
        //preload: 'de',
        load: 'unspecific',
        lowerCaseLng: true,
        resGetPath: '/locales/__lng__-__ns__.json'
        //dynamicLoad: true
    }, function() {
        $.t('markup.login');
        $(toTranslate).i18n();
    });


    $('.langButton').on('click', function(event) {
        var setLangTo = $(event.target).attr('name');
        $.i18n.setLng(setLangTo, function() {
            $(toTranslate).i18n();
        })
    });



    // ========================== TRAINING ===================== //


    var levelButtons = $('.trainingLevelButton');
    console.dir(levelButtons);
    var levelButtonsAmount = levelButtons.length;
    var step = 255 / levelButtonsAmount - 1;

    levelButtons.each(function(index) {
        var value1 = Math.round(step * index);
        var value2 = Math.round(255 - step * index);
        //var formattedColor1 = ('0' + hexValue1).split('.')[0].slice(-2);
        //var formattedColor2 = ('0' + hexValue2).split('.')[0].slice(-2);
        //console.log(formattedColor1 + ' ' + formattedColor2);
        $(this).css('background-color', 'rgba(' + value1 + ', ' + value2 + ', 0, 0.3)');
        console.log('rgba(' + value1 + ', ' + value2 + ', 0 , 0.4)');

    });





    // first, send answer. then, load new problem on enter key
    $('input#solution').bind('keydown', function(e) {
        if (e.keyCode === 13) {
            if ($('button#submit').prop('disabled')) {
                location.reload(true);
            } else {
                var solution = $('#solution').val();
                sendAjax(buildAnswer(solution, sec, problemOid), checkSolutionURL);
            }
        }
    });

    $('button#help').on('click', function expandHelp() {
        $('#helpDiv').slideToggle();
    });

    $('button#submit').on('click', function submitButton() {
        var solution = $('#solution').val();
        sendAjax(buildAnswer(solution, sec, problemOid), checkSolutionURL);
    });

    $('button#next').on('click', function nextProblem() {
        location.reload(true);
    });

    function sendAjax(data, url) {

        //first, stop timer
        clearInterval(timer);

        //disable submit button
        $('button#submit').prop('disabled', true);
        //disable keydown
        //$('input#solution').unbind('keydown');

        $.ajax({
            url: url,
            method: "POST",
            data: data
        })
            .done(function(result) {
                if (result === "OK") {
                    $('#solution').addClass('correctSolution');
                    console.log("Solution " + data.solution + " was correct");
                } else {
                    var correctSolution = result.correctSolution;
                    $('#solution').addClass('incorrectSolution');
                    console.log("Solution " + data.solution + " was wrong. Correct solution is " + correctSolution);
                }
            })
    }


    var sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    var timer = setInterval( function(){
        $("#seconds").html(pad(++sec%60));
        if (sec == 59) {
            clearInterval(timer);
            $('#seconds').html('60');
        }
    }, 1000);

    function buildAnswer(solution, time, Oid) {
        return {
            Oid         : Oid,
            solution    : solution,
            time        : time
        }
    }



});