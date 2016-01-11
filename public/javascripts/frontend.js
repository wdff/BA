$(document).ready(function() {

    // ========================== TRANSLATION ===================== //


    var toTranslate = 'p, a, h1, h2, h3, label, button, input, span';
    var checkSolutionURL = "./checkSolution";

    var hints = [];


    $.i18n.init({
        //debug: true,
        detectLngQS: 'lang',
        //cookieName: 'lang',
        fallbackLng: 'en',
        //preload: 'de',
        load: 'unspecific',
        lowerCaseLng: true,
        resGetPath: '/locales/__lng__-__ns__.json',
        //dynamicLoad: true
    }, function() {

        makeTips();


       //var currentLanguage = i18n.lng();
        //console.log(currentLanguage);

        //console.dir(Object.keys(i18n.getResourceBundle(currentLanguage).hints['+']).length);

        $.t('markup.login');
        $(toTranslate).i18n();
    });



    function makeTips() {

        var pathname = (window.location.pathname).split('/');

        var operation;
        if (pathname[1] === 'tips' && (pathname[2] !== "")) {  // only on "tips/xxxx/", not "tips/"
            switch (pathname[2]) {
                case 'addition': {
                    operation = '+';
                    break;
                }
                case 'subtraction': {
                    operation = '-';
                    break;
                }
                case 'multiplication': {
                    operation = '*';
                    break;
                }
                case 'division': {
                    operation = '/';
                    break;
                }
                case 'fraction': {
                    operation = 'frac';
                    break;
                }
                case 'sqrt': {
                    operation = 'sqrt';
                    break;
                }
            }

            console.log('operation is ' + operation);
            makeTipsSelect(operation);
        }

    }

    $('.langButton').on('click', function(event) {
        var setLangTo = $(event.target).attr('name');
        $.i18n.setLng(setLangTo, function() {
            $(toTranslate).i18n();
            clearMenu();
            makeTips();
        })
    });


    function clearMenu() {
        $('#hintSelect').find('option').remove();
    }




    // ========================== TRAINING ===================== //


    var levelButtons = $('.trainingLevelButton');
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
                addSpinner.call($('button#next'));
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
        addSpinner.call($(this));
        location.reload(true);
    });

    function addSpinner() {
        if (!$(this).eq(0).hasClass("spinning")) {
            $(this).eq(0).html('<span class="glyphicon glyphicon-refresh spinning"></span>');
        }
    }

    function sendAjax(data, url) {

        //first, stop timer
        clearInterval(timer);

        //disable submit button
        $('button#submit').prop('disabled', true).removeClass("btn-success");

        $('button#next').addClass("btn-success");


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

                    //show correct solution as overlay
                    $('p.realSolution').text(correctSolution).fadeToggle('slow').on('click', function() {
                        $(this).fadeToggle("slow");
                    });

                    $('#solution').addClass('incorrectSolution');
                    console.log("Solution " + data.solution + " was wrong. Correct solution is " + correctSolution);
                }
            })
    }


    var sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    function colorByTime(time) {
        $('#time').css('opacity', function() {
            return time / 60;
        });
    }

    var timer = setInterval( function(){
        var seconds = $("#seconds");
        seconds.html(pad(++sec%60));
        if (sec == 59) {
            clearInterval(timer);
            seconds.html('60');
            seconds.css('color', 'red');
        }
        colorByTime(sec);
    }, 1000);

    // builds an answer object to send to the server. contains Oid of the problem, the user's solution and the time taken.
    function buildAnswer(solution, time, Oid) {

        // replace "," with "." for evaluation with mathjs
        // (mathjs only accepts "." as decimal point)
        solution = solution.replace(/,/g, '.');

        return {
            Oid         : Oid,
            solution    : solution,
            time        : time
        }
    }




});