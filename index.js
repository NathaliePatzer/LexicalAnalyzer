$(document).ready(function () {

    var wordList = []; //lista para armazenas as palavras 
    var states = 0; //contador de estados utilizados 

    //cria o objeto que irá analisar a palavra e armazenar a matriz
    var analyzer = new function () {
        this.initial_state = "q0";
        this.final_states = [];
        this.token_stack = [];
        this.state_stack = [];
        this.current_state = "q0";

        this.matrix = new Map();

        this.matrix.set("q0", new Map());
    };

    function updateDictionary() {
        var words = $("#words-list");
        var str = "";
        for (var i = 0; i < wordList.length; i++) {
            str += "<div>" + wordList[i] + "</div>";
        }
        words.html(str);
    }

    function clearDictionary() {
        wordList = [];
        $("#words-list").html("");
    }

    function updateTable() {
        //gerar tabela em html
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        //cabeçalho da tabela
        result += `<table><thead><tr><th scope="col" class="column_state">δ</th>`;
        for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            result += `<th scope="col" class="column_${letter}">${letter}</th>\n`;
        }
        //finaliza o cabeçalho da tabela
        result += `</tr></thead>`;

        //inicia a construção das linhas da tabela 
        result += `<tbody>\n`;
        for (let j = 0; j < analyzer.matrix.size; j++) {
            if (analyzer.final_states.includes(`q${j}`)) {
                result += `<tr class="row_q${j}">\n`;
                result += `<td class="column_state">*q${j}</td>\n`;
            } else {
                result += `<tr class="row_q${j}">\n`;
                result += `<td class="column_state">q${j}</td>\n`;
            }

            for (let i = 0; i < letters.length; i++) {
                const letter = letters[i];
                $symbol = '-';
                if (analyzer.matrix.get('q' + j).has(letter)) {
                    $symbol = analyzer.matrix.get('q' + j).get(letter);
                }
                result += `<td class="column_${letter}">${$symbol}</td>\n`;
            }
            result += `</tr>\n`;
        }
        //finaliza a construção das linhas da tabela 
        result += `</tbody></table>\n`;
        $(".table").html(result);
    }

    function clearTable() {
        analyzer.matrix = new Map();
        analyzer.matrix.set("q0", new Map());
        analyzer.initial_state = "q0";
        analyzer.final_states = [];
        analyzer.token_stack = [];
        analyzer.state_stack = [];
        analyzer.current_state = "q0";
        states = 0;
        var str = `<table>
          <thead>
            <tr>
              <th scope="col" class="column_state">δ</th>
              <th scope="col" class="column_a">a</th>
              <th scope="col" class="column_b">b</th>
              <th scope="col" class="column_c">c</th>
              <th scope="col" class="column_d">d</th>
              <th scope="col" class="column_e">e</th>
              <th scope="col" class="column_f">f</th>
              <th scope="col" class="column_g">g</th>
              <th scope="col" class="column_h">h</th>
              <th scope="col" class="column_i">i</th>
              <th scope="col" class="column_j">j</th>
              <th scope="col" class="column_k">k</th>
              <th scope="col" class="column_l">l</th>
              <th scope="col" class="column_m">m</th>
              <th scope="col" class="column_n">n</th>
              <th scope="col" class="column_o">o</th>
              <th scope="col" class="column_p">p</th>
              <th scope="col" class="column_q">q</th>
              <th scope="col" class="column_r">r</th>
              <th scope="col" class="column_s">s</th>
              <th scope="col" class="column_t">t</th>
              <th scope="col" class="column_u">u</th>
              <th scope="col" class="column_v">v</th>
              <th scope="col" class="column_w">w</th>
              <th scope="col" class="column_x">x</th>
              <th scope="col" class="column_y">y</th>
              <th scope="col" class="column_z">z</th>
            </tr>
          </thead>
          <tbody>
            <tr class="row_q0">
              <td class="column_state">q0</td>
              <td class="column_a">-</td>
              <td class="column_b">-</td>
              <td class="column_c">-</td>
              <td class="column_d">-</td>
              <td class="column_e">-</td>
              <td class="column_f">-</td>
              <td class="column_g">-</td>
              <td class="column_h">-</td>
              <td class="column_i">-</td>
              <td class="column_j">-</td>
              <td class="column_k">-</td>
              <td class="column_l">-</td>
              <td class="column_m">-</td>
              <td class="column_n">-</td>
              <td class="column_o">-</td>
              <td class="column_p">-</td>
              <td class="column_q">-</td>
              <td class="column_r">-</td>
              <td class="column_s">-</td>
              <td class="column_t">-</td>
              <td class="column_u">-</td>
              <td class="column_v">-</td>
              <td class="column_w">-</td>
              <td class="column_x">-</td>
              <td class="column_y">-</td>
              <td class="column_z">-</td>
            </tr>
          </tbody>
        </table>`;
        $(".table").html(str);
    }

    //gerencia a adição e armazenamento de palavras
    function addWords(word) {
        $("#search").val("");
        //define o estado atual como o estado inicial
        analyzer.current_state = analyzer.initial_state;
        //for para percorrer cada letra da palavra 
        for (var i = 0; i < word.length; i++) {
            //executa se a matriz já possui o estado atual
            if (analyzer.matrix.has(analyzer.current_state)) {
                //se o estado atual já possui o token analisado, o valor do mesmo é definido como o estado atual (se o token já existe, não é necessário adicioná-lo novamente)
                if (analyzer.matrix.get(analyzer.current_state).has(word[i])) {
                    analyzer.current_state = analyzer.matrix.get(analyzer.current_state).get(word[i]);
                } else {
                    //se o estado atual não possui o token analisado, a chave para o token é adicionado ao estado, e também é adicionado um estado como valor do token 
                    states++;
                    //mapa que retorna tudo o que já estiver no estado atual
                    var line = analyzer.matrix.get(analyzer.current_state);
                    //adiciona o token e o próximo estado ao estado atual 
                    line.set(word[i], "q" + states);
                    //limpa o estado atual para garantir que não existam registros duplicados
                    analyzer.matrix.delete(analyzer.current_state);
                    //adiciona o mapa atualizado ao estado atual 
                    analyzer.matrix.set(analyzer.current_state, new Map(line));
                    //atualiza o estado atual para o próximo estado
                    analyzer.current_state = "q" + states;
                }
                //executa caso a matriz ainda não possua o estado atual 
            } else {
                //cria um estado vazio 
                analyzer.matrix.set(analyzer.current_state, new Map());
                if (analyzer.matrix.get(analyzer.current_state).has(word[i])) {
                    analyzer.current_state = analyzer.matrix.get(analyzer.current_state).get(word[i]);
                } else {
                    states++;
                    var line = analyzer.matrix.get(analyzer.current_state);
                    line.set(word[i], "q" + states);
                    analyzer.matrix.delete(analyzer.current_state);
                    analyzer.matrix.set(analyzer.current_state, new Map(line));
                    analyzer.current_state = "q" + states;
                }
            }
        }
        //cria o estado terminal (após analisar todos os tokens da palavra)
        analyzer.matrix.set(analyzer.current_state, new Map());
        //adiciona o estado à lista de estados terminais 
        analyzer.final_states.push(analyzer.current_state);

        //adiciona a palavra ao dicionário 
        wordList.push(word);
        //adiciona a palavra ao dicionário no html
        updateDictionary();
        updateTable();
        //volta o current state para o inicial (q0)
        analyzer.current_state = analyzer.initial_state;
    }

    function searchWord(token) {
        if (analyzer.matrix.has(analyzer.current_state)) {
            if (analyzer.matrix.get(analyzer.current_state).has(token)) {
                //colore de verde 
                $(".row_" + analyzer.current_state + " .column_" + token).addClass("success");
                analyzer.state_stack.push(analyzer.current_state);
                analyzer.current_state = analyzer.matrix.get(analyzer.current_state).get(token);
                analyzer.token_stack.push(token);
            } else {
                //colore de vermelho 
                $(".row_" + analyzer.current_state + " .column_" + token).addClass("fail");
                analyzer.state_stack.push(analyzer.current_state);
                analyzer.current_state = "error";
                analyzer.token_stack.push(token);
            }
        } else {
            analyzer.state_stack.push(analyzer.current_state);
            analyzer.current_state = "error";
            analyzer.token_stack.push(token);
        }
    }

    //evento ao clicar no botão para adicionar palavras 
    $(".button").click(function () {
        var text = $("#words").val();
        //verifica se o input está vazio 
        if (text.trim() != "") {
            if (text.match(/\d|\W|[_]/g)) {
                $("#char-popup p").html("Caractere inválido: " + text.match(/\d|\W|[_]/g)[0]);
                $.magnificPopup.open({
                    items: {
                        src: '#char-popup',
                        type: 'inline'
                    },
                    callbacks: {
                        open: function () {
                            setTimeout(function () {
                                $.magnificPopup.close();
                            }, 4000);
                        }
                    },
                    removalDelay: 300,
                    mainClass: 'mfp-fade'
                });

            } else {
                addWords(text.toLowerCase());
                $("#words").val("");
            }
        } else {
            $.magnificPopup.open({
                items: {
                    src: '#empty-popup',
                    type: 'inline'
                },
                callbacks: {
                    open: function () {
                        setTimeout(function () {
                            $.magnificPopup.close();
                        }, 4000);
                    }
                },
                removalDelay: 300,
                mainClass: 'mfp-fade'
            });
        }
    });

    //evento ao clicar no botão para limpar
    $(".button-clear").click(function () {
        clearDictionary();
        clearTable();
        $("#search").val("");
        $("#words").val("");
    });

    $("#words").keydown(function (event) {
        var text = $("#words").val();
        if (event.key === ' ' || event.keyCode === 13) {
            event.preventDefault();
            //verifica se o input está vazio 
            if (text.trim() != "") {
                if (text.match(/\d|\W|[_]/g)) {
                    $("#char-popup p").html("Caractere inválido: " + text.match(/\d|\W|[_]/g)[0]);
                    $.magnificPopup.open({
                        items: {
                            src: '#char-popup',
                            type: 'inline'
                        },
                        callbacks: {
                            open: function () {
                                setTimeout(function () {
                                    $.magnificPopup.close();
                                }, 4000);
                            }
                        },
                        removalDelay: 300,
                        mainClass: 'mfp-fade'
                    });
                } else {
                    addWords(text.toLowerCase());
                    $("#words").val("");
                }
            } else {
                $.magnificPopup.open({
                    items: {
                        src: '#empty-popup',
                        type: 'inline'
                    },
                    callbacks: {
                        open: function () {
                            setTimeout(function () {
                                $.magnificPopup.close();
                            }, 4000);
                        }
                    },
                    removalDelay: 300,
                    mainClass: 'mfp-fade'
                });
            }
        }
    });

    $("#search").keydown(function (event) {
        var text = $("#search").val();
        //verifica o backspace 
        if (event.keyCode === 8) {
            if (text.trim() != "") {
                analyzer.current_state = analyzer.state_stack.pop();
                var token = analyzer.token_stack.pop();
                $(".row_" + analyzer.current_state + " .column_" + token).removeClass("fail");
                $(".row_" + analyzer.current_state + " .column_" + token).removeClass("success");
            }
            //verifica o espaço e enter
        } else if (event.key === ' ' || event.keyCode === 13) {
            event.preventDefault();
            //verifica se o input está vazio 
            if (text.trim() != "") {
                if (analyzer.final_states.includes(analyzer.current_state)) {
                    $.magnificPopup.open({
                        items: {
                            src: '#success-popup',
                            type: 'inline'
                        },
                        callbacks: {
                            open: function () {
                                setTimeout(function () {
                                    $.magnificPopup.close();
                                }, 4000);
                            }
                        },
                        removalDelay: 300,
                        mainClass: 'mfp-fade'
                    });
                } else {
                    $.magnificPopup.open({
                        items: {
                            src: '#fail-popup',
                            type: 'inline'
                        },
                        callbacks: {
                            open: function () {
                                setTimeout(function () {
                                    $.magnificPopup.close();
                                }, 4000);
                            }
                        },
                        removalDelay: 300,
                        mainClass: 'mfp-fade'
                    });
                }
                $("#search").val("");
                analyzer.current_state = analyzer.initial_state;
                analyzer.token_stack = [];
                analyzer.state_stack = [];
                updateTable();
            } else {
                $.magnificPopup.open({
                    items: {
                        src: '#empty-popup',
                        type: 'inline'
                    },
                    callbacks: {
                        open: function () {
                            setTimeout(function () {
                                $.magnificPopup.close();
                            }, 4000);
                        }
                    },
                    removalDelay: 300,
                    mainClass: 'mfp-fade'
                });
            }
        } else if (event.key.match(/\d|\W|[_]/g)) {
            event.preventDefault();
            $("#char-popup p").html("Caractere inválido: " + event.key);
            $.magnificPopup.open({
                items: {
                    src: '#char-popup',
                    type: 'inline'
                },
                callbacks: {
                    open: function () {
                        setTimeout(function () {
                            $.magnificPopup.close();
                        }, 4000);
                    }
                },
                removalDelay: 300,
                mainClass: 'mfp-fade'
            });
        } else if (!(event.keyCode < 65 || event.keyCode > 90)) {
            searchWord(event.key)
        }
    });

});

