import '../styles/default.scss';

console.log('initted');

var all = 4;
var completed = 1;
var count = 0;
var mode = 'all';


document.addEventListener("DOMContentLoaded", function () {
    Count(count);
    var todoInput = document.getElementsByClassName('todos-creator_text-input')[0];
    var list = document.getElementsByClassName('todos-list')[0];
    var clear = document.getElementsByClassName('todos-toolbar_clear-completed')[0];
    var buttons = document.getElementsByClassName('filters todos-toolbar_filters')[0];
    var checkbut = document.getElementsByClassName('todos-creator_check-all')[0];
    var form = document.getElementsByClassName('todos-creator')[0];

    todoInput.addEventListener('keyup', function (e) {
        e.preventDefault();
        if (e.keyCode === 13) {
            var text = document.getElementsByClassName('todos-creator_text-input')[0];
            if (text.value !== '') {
                add(text.value);
                text.value = '';
            }
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
    });


    list.addEventListener('click', function (e) {
        if (e.target.className === 'todos-list_item_remove') {
            var element = e.target.parentElement;
            if (element.classList.contains('__completed')) {
                completed--;
            }
            all--;
            element.parentNode.removeChild(element);
            // for (var i = 0; i < document.getElementsByClassName('todos-list_item').length; i++) {
            //         document.getElementsByClassName('todos-list_linear')[i].parentNode.removeChild(document.getElementsByClassName('todos-list_linear')[i]);
            //         i--;
            //         Count();
            //
            // }

        }
        else if (e.target.className === 'custom-checkbox_target') {
            var parent = e.target.parentElement.parentElement;
            if (e.target.checked) {
                parent.classList.add('__completed');
                completed++;
                if (mode === 'active')
                    parent.classList.add('__hidden');
            }
            else {
                completed--;
                parent.classList.remove('__completed');
                if (mode === 'completed')
                    parent.classList.add('__hidden');
            }
        }
        Count();
    });

    clear.addEventListener('mouseup', function (e) {

        for (var i = 0; i < document.getElementsByClassName('todos-list_item').length; i++) {
            var checkbox = document.getElementsByClassName('custom-checkbox_target')[i];
            if (checkbox.checked) {
                document.getElementsByClassName('todos-list_item')[i].parentNode.removeChild(document.getElementsByClassName('todos-list_item')[i]);
                document.getElementsByClassName('todos-list_linear')[i].parentNode.removeChild(document.getElementsByClassName('todos-list_linear')[i]);
                i--;
                completed--;
                all--;
                Count();
            }
        }
    });

    buttons.addEventListener('click', function (e) {
        var button = e.target;
        if (button.className === 'filters-item') {
            changeMode(button.id);
        }
    });

    checkbut.addEventListener('mouseup', function (e) {
        for (var i = 0; i < document.getElementsByClassName('todos-list_item').length; i++) {
            var checkbox = document.getElementsByClassName('custom-checkbox_target')[i];
            document.getElementsByClassName('todos-list_item')[i].classList.add('__completed');
            if (mode === 'active')
                document.getElementsByClassName('todos-list_item')[i].classList.add('__hidden');
            else if (mode === 'completed')
                document.getElementsByClassName('todos-list_item')[i].classList.remove('__hidden');
            checkbox.checked = true;
            completed = all;
            Count();
        }

    });

    list.addEventListener('keydown', function (e) {
        if(e.target.className === 'todos-list_item_text'){
            var hard_lines = 1;
            var last = 0;
            while ( true ) {
                last = e.target.value.toString().indexOf("\n", last+1);
                hard_lines ++;
                if ( last == -1 ) break;
            }
            if(e.keyCode === 13){
                e.target.rows = hard_lines;
            }
            else {
                e.target.rows = hard_lines - 1;
            }
        }

    });


});
function add(text) {
    var header = '<div class="todos-list_item' + (mode === 'completed' ? ' __hidden' : '') + '">';

    var html = header + '\n' +
        '                <div class="custom-checkbox todos-list_item_ready-marker">\n' +
        '                    <input type="checkbox" class="custom-checkbox_target" aria-label="Mark todo as ready"/>\n' +
        '                    <div class="custom-checkbox_visual">\n' +
        '                        <div class="custom-checkbox_visual_icon"></div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <button class="todos-list_item_remove" aria-label="Delete todo"></button>\n' +
        '                <div class="todos-list_item_text-w">\n' +
        '                    <text class="todos-list_item_text">' + text + '</text>\n' +
        '                </div>\n' +
        '            </div>' + '<div class="todos-list_linear"></div>\n';
    var list = document.getElementsByClassName('todos-list')[0];
    list.insertAdjacentHTML("beforeEnd", html);
    all++;
    Count();
}

function Count() {
    count = all - completed;
    if (all > 0) {
        document.getElementsByClassName('todos-board')[0].classList.add('__has-content');
    }
    var counter = document.getElementsByClassName('todos-toolbar_unready-counter')[0];
    counter.innerHTML = count + ' items left';
    if (all === 0) {
        document.getElementsByClassName('todos-board')[0].classList.remove('__has-content');
    }
    updateBoard();
}

function clearButtons() {
    for (var j = 0; j < document.getElementsByClassName('filters-item').length; j++) {
        document.getElementsByClassName('filters-item')[j].classList.remove('__selected');
    }
}

function changeMode(value) {
    if (mode !== value) {
        mode = value;
        clearButtons();
        document.getElementById(mode).classList.add('__selected');

        for (var i = 0; i < document.getElementsByClassName('todos-list_item').length; i++) {
            var checkbox = document.getElementsByClassName('custom-checkbox_target')[i];
            switch (mode) {
                case 'active':
                    if (checkbox.checked)
                        document.getElementsByClassName('todos-list_item')[i].classList.add('__hidden');
                    else
                        document.getElementsByClassName('todos-list_item')[i].classList.remove('__hidden');
                    break;
                case 'completed':
                    if (!checkbox.checked)
                        document.getElementsByClassName('todos-list_item')[i].classList.add('__hidden');
                    else
                        document.getElementsByClassName('todos-list_item')[i].classList.remove('__hidden');
                    break;
                case 'all':
                    document.getElementsByClassName('todos-list_item')[i].classList.remove('__hidden');
                    break;
            }
        }
    }
    updateBoard();
}

function updateBoard() {
    if (all > 4 && mode === 'all') {
        document.getElementsByClassName('todos-toolbar')[0].classList.add('__no-border');
    }
    else if (completed > 4 && mode === 'completed') {
        document.getElementsByClassName('todos-toolbar')[0].classList.add('__no-border');
    }
    else if (count > 4 && mode === 'active') {
        document.getElementsByClassName('todos-toolbar')[0].classList.add('__no-border');
    }
    else {
        document.getElementsByClassName('todos-toolbar')[0].classList.remove('__no-border');
    }
    //alert(all+' '+completed+' '+count);
}