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
        console.log(wordList);
        var words = $("#words-list");
        var str = "";
        for (var i=0; i<wordList.length; i++) {
            str += "<div>" + wordList[i] + "</div>"; 
            console.log(wordList[i]);
        }
        console.log(str);
        words.html(str);
    }

    //gerencia a adição e armazenamento de palavras
    function addWords(word) {
        console.log(word);
        //define o estado atual como o estado inicial
        analyzer.current_state = analyzer.initial_state;
        //for para percorrer cada letra da palavra 
        for (var i = 0; i < word.length; i++) {
            console.log(word[i]);
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
        console.log(analyzer.final_states);
        console.log(analyzer.matrix);
        //adiciona a palavra ao dicionário no html
        updateDictionary();
    }

    //evento ao clicar no botão para adicionar palavras 
    $("button").click(function () {
        var text = $("#words").val();
        //verifica se o input está vazio 
        if (text.trim() != "") {
            addWords(text);
        } else {
            alert("Escreve algo aí seu bananão!");
        }
        //apaga a palavra do campo de input 
        $("#words").val("");
    })

    

});

