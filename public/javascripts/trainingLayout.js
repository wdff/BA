$(document).ready(function() {


  var path = window.location.pathname;
  //console.log(path);

//console.log(typeof problemObj);
//console.dir(problemObj);

  var problemField = $('p.problem');


// adds an operation or value to the field, if space = true, adds a space afterward
  function addToField(input, addSpace) {
    problemField.append(input);
    if (addSpace) {
      problemField.append(" ");
    }
  }

  function addBreak() {
    console.log('adding break');
    problemField.append("<br/>");
  }

  function addSpace() {
    console.log('adding space');
    problemField.append("&nbsp;");
  }

  switch (path) {
    case '/training/1/':
    case '/training/2/':
    case '/training/3/':
    case '/training/4/':
    case '/training/14/':
    case '/training/15/':
    {
      addToField(problemObj[0].value, 1);
      addToField(problemObj[1].operation, 1);
      addToField(problemObj[1].value, 0);
      break;
    }
    case '/training/5/':
    case '/training/7/':
    {
      addToField(problemObj[0].value, 1);
      addToField(problemObj[1].operation, 1);
      addToField(problemObj[1].value, 1);
      addToField(problemObj[2].operation, 1);
      addToField(problemObj[2].value, 0);
      break;
    }
    case '/training/6/':
    case '/training/8/':
    {
      addToField(problemObj[0].value, 1);
      addToField(problemObj[1].operation, 1);
      addToField(problemObj[1].value, 1);
      addToField(problemObj[2].operation, 1);
      addToField(problemObj[2].value, 1);
      addToField(problemObj[3].operation, 1);
      addToField(problemObj[3].value, 0);
      break;
    }
    case '/training/9/':
    case '/training/11/':
    case '/training/12/':
    {
      addSpace();
      addSpace();
      addToField(problemObj[0].value, 0);
      addBreak();
      addToField(problemObj[1].operation, 1);
      addToField(problemObj[1].value, 0);
      addBreak();
      addToField(problemObj[2].operation, 1);
      addToField(problemObj[2].value, 0);
      break;
    }

    case '/training/10/':
    { // square roots
      addToField(problemObj[0].operation, 0);
      addToField("(");
      addToField(problemObj[0].value, 0);
      addToField(") ");
      addToField(problemObj[1].operation, 1);
      addToField(problemObj[2].operation, 0);
      addToField("(");
      addToField(problemObj[2].value, 0);
      addToField(")");
      replaceRoots();
      break;
    }

    case '/training/13/':
    {
      addToField(problemObj[0].operation, 0);
      addToField("(");
      addToField(problemObj[0].value, 0);
      addToField(")");
      //replaceRoots();
      break;
    }

    case '/training/16/':
    {
      addSpace();
      addSpace();
      addToField(problemObj[0].value, 1);
      addToField(problemObj[1].operation, 1);
      addToField(problemObj[1].value, 0);
      addBreak();
      addToField(problemObj[2].operation, 1);
      addToField(problemObj[2].value, 1);
      addToField(problemObj[3].operation, 1);
      addToField(problemObj[3].value, 0);
      break;
    }

    default:
    {
      console.log('default');
    }
  }







});