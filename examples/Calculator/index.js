var domTree = new HtmlNode({
    class : 'container',
    childs : [
        {
            class : 'hint',
            childs : [
                {
                    class : 'hint-txt',
                    content : "Welcome to HtmlNodes!"
                }
            ]
        },{
            class: "btn-line",
            childs : [
                {
                    class : 'btn',
                    events: {
                        click : function(){ alert("It works on Button One!") }
                    },
                    childs : [
                        {
                            class : 'btn-txt',
                            content : "I´m button One!"
                        }
                    ]
                },
                {
                    class : 'btn',
                    events: {
                        click : function(){ alert("It works on Button Two!") }
                    },
                    childs : [
                        {
                            class : 'btn-txt',
                            content : "I´m button Two!"
                        }
                    ]
                }
            ]
        }
    ]
}).render();




