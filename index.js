$(document).ready(function () {

    var wordList = [];
    var states = 0;

    var analyzer = new function () {
        this.initial_state = "q0";
        this.final_states = [];
        this.token_stack = [];
        this.state_stack = [];
        this.current_state = "q0";

        this.matrix = new Map();

        this.matrix.set("q0", new Map());
    };

    function addWords(word) {
        console.log(word);
        analyzer.current_state = analyzer.initial_state;
        for (var i = 0; i < word.length; i++) {
            console.log(word[i]);
            if (analyzer.matrix.has(analyzer.current_state)) {
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
            } else {
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
        analyzer.matrix.set(analyzer.current_state, new Map());
        analyzer.final_states.push(analyzer.current_state);

        wordList.push(word);
        console.log(analyzer.final_states);
        console.log(analyzer.matrix);
    }

    $("button").click(function () {
        var text = $("#words").val();
        if (text.trim() != "") {
            addWords(text);
        } else {
            alert("Escreve algo aí seu bananão!");
        }
        $("#words").val("");
    })


});

