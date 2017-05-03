requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {
        var $tryit;
        var io = new extIO({
            animation: function($expl, data){
                var checkioInput = data.in;
                if (!checkioInput){
                    return;
                }

                var explanation = data.ext.explanation;

                var strNumber = explanation[0],
                    strBinary = explanation[1],
                    command = explanation[2],
                    dlForm = explanation[3],
                    compForm = explanation[4];

                var $table = $("<table></table>");
                var firstRow = $("<tr></tr>"),
                    secondRow = $("<tr></tr>"),
                    thirdRow = $("<tr></tr>"),
                    fourthRow = $("<tr></tr>");

                var createTd = function(letter) {
                    return $("<td></td>").text(letter);
                };

                for (var i = 0; i < strNumber.length; i++) {
                    firstRow.append(createTd(strNumber[i]));
                    secondRow.append(createTd(command[i]));
                    thirdRow.append(createTd("="));
                    fourthRow.append(createTd("?"));
                }
                $table.append(firstRow, secondRow, thirdRow, fourthRow);
                $expl.append($table);

                i = 0;
                var chInterval = setInterval(function() {
                    if (i >= strNumber.length) {
                        clearInterval(chInterval);
                        console.log("all");
                    }
                    firstRow.find("td").eq(i).text(strBinary[i]).addClass(strBinary[i] === "0" ? "zero" : "one");
                    secondRow.find("td").eq(i).text(dlForm[i]).addClass(dlForm[i] === "D" ? "zero" : "one");
                    fourthRow.find("td").eq(i).text(compForm[i]).addClass(compForm[i] === "V" ? "right" : "wrong");

                    i++;
                }, 200);
            },
            animationTemplateName: 'animation',
            multipleArguments: true,
            tryit: function(){
                var this_e = this;
                $tryit = $(this_e.extSetHtmlTryIt(this_e.getTemplate('tryit')));

                var tryitDataInput = $tryit.find('.tryit-content');
                tryitDataInput.focus();

                $tryit.find('.bn-check').click(function (e) {
                    var password = passwordInput.val();
                    var tryitData = tryitDataInput.val();
                    this_e.extSendToConsoleCheckiO(tryitData);
                    e.stopPropagation();
                    return false;
                });
            },
            retConsole: function (ret) {
                $tryit.find('.checkio_result').html("Your result:<br>" + ret);
            },
            functions: {
                js: 'checkCommand',
                python: 'check_command'
            }
        });
        io.start();
    }
);
