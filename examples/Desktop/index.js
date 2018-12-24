var domTree = new HtmlNode({
    id : 'desktop-01',
    class : 'desktop',
    childs : [
        {
           class : 'workspace',
           childs : [

           ]
        },
        {
            class : 'taskbar',
            childs : [
                {
                    class : 'starticon',
                    childs : [
                        {
                            class : 'starticon-label',
                            content : '< />'
                        },
                    ],
                    events : {
                        click : function(){

                            

                        }
                    }
                },
                {
                    class : 'startmenu',
                    childs : [

                    ]
                },
                {
                    class : 'tasks',
                    childs : [

                    ]
                }
            ]
        }
    ]
}).render();




