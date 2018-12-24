/**
 * Creates a HTML Node with given parameters
 * @param {*} definition 
 * @param {*} callback 
 * @returns Object HtmlNode
 */
function HtmlNode( definition , callback ){
  
    // Parameters
    definition.tag = typeof definition.tag === 'undefined' ? 'div' : definition.tag;
    callback = typeof callback !== 'function' ? function(){} : callback;
      
    // The given Namespace from the definition
    this.namespace = null;
  
      // Supported Namespaces
    this.namespaces = {
        svg : "http://www.w3.org/2000/svg"
        
    };
  
    // Support Namespaces
    if(typeof definition.namespace !== 'undefined' && definition.namespace !== null){ 
    
        var regex_http = new RegExp( "http://"  , "ig");
        var regex_https = new RegExp( "https://"  , "ig");
        if( regex_http.test(definition.namespace) || regex_https.test(definition.namespace) )
            this.namespace = definition.namespace;
        else if(typeof this.namespaces[ definition.namespace ] !== 'undefined')
            this.namespace = this.namespaces[definition.namespace];
        else throw ('Unsupported Namespace for HTMLElement! --> ' + definition.namespace );
        
        // Element created from Namespace
        this.element = document.createElementNS( this.namespace , definition.tag );
    
    } else {
    
        // HtmlElement itself
        this.element = document.createElement( definition.tag );
    
    }
    
    // Child Nodes as HtmlNode
    this.childnodes = [];
    
    // Definition Blueprint
    this.definition = definition;
  
    // Unique GUI ID  
    this.guiid = Date.now().toString(16) +
      '-' +
      (Math.ceil((1+Math.random())*0x10000000)).toString(16) +
      '-' +
      (Math.ceil((1+Math.random())*0x10000000)).toString(16) +
      '-' +
      (Math.ceil((1+Math.random())*0x10000000)).toString(16);
  
    //
    // Check definition attributes
    //
    
    // Set some attributes that not included as main key
    if( typeof definition.attributes !== 'undefined' )
        for(var attribute in definition.attributes)
            this.element.setAttribute( attribute , definition.attributes[attribute] );

    // Attribute ID
    if( typeof definition.id !== 'undefined' )
        this.element.setAttribute( 'id' , definition.id );
      
    // Attribute Class
    if( typeof definition.class !== 'undefined' )
          this.element.setAttribute( 'class' , definition.class );
      
    // Attribute Style
    if( typeof definition.style !== 'undefined' )
          this.element.setAttribute( 'style' , definition.style );
      
    // Set Content
    if( typeof definition.content !== 'undefined' )
          this.element.innerHTML =  definition.content ;
      
    // Attribute Events ( without on )
    if(typeof definition.events !== 'undefined')
      for(var eventname in definition.events)
        this.element.addEventListener( eventname , definition.events[eventname] );
  
    // Data Attribute ( for simple data like numbers or strings )
    if(typeof definition.data !== 'undefined')
      for(var datakey in definition.data)
        this.element.setAttribute( "data-"+datakey , definition.data[datakey] );
  
    // Child Nodes whcih will be created as a seperate HtmlNode object
    if(typeof definition.childs !== 'undefined')
      for(var child_number in definition.childs){
          var _node = new HtmlNode( definition.childs[child_number] );
        this.element.appendChild( _node.element );
        this.childnodes.push(_node);
      }
      
    //
    // Functions
    //
    
    // Render HtmlElement to selector target
    this.render = function( selector , callback ){
        callback = typeof callback !== 'function' ? function(){} : callback;
        selector = typeof selector !== 'string' ? 'body' : selector;
        document.querySelector( selector ).appendChild( this.element );
        callback(this);
    }
    
    // Get Node by ID
    this.get_node = function( id ){
        var nodes = [];
        for(var i in this.childnodes){
          var subchild = this.childnodes[i].get_node( id );
          if(this.childnodes[i].definition.id === id) nodes.push(this.childnodes[i]);
        if(subchild !== null) nodes.push( subchild );
      }
      if(nodes.length === 0) return null;
      else if(nodes.length === 1) return nodes[0];
      else if(nodes.length > 1) throw {'error':'ID is not unique. Multiple results found!' , 'nodes' : nodes};
    };
    
    // Get Nodes by Classname
    this.get_nodes = function( classname ){
        var nodes = [];
        for(var i in this.childnodes){
          var subchilds = this.childnodes[i].get_nodes( classname );
          var regex = new RegExp(classname);
          if( regex.test( this.childnodes[i].definition.class ) ) nodes.push(this.childnodes[i]);
        nodes = nodes.concat( subchilds );
      }
      return nodes;
    };
    
    // Set Data Attribute ( for simple data like numbers or strings )
    this.set_data = function( datakey , value ){
         this.element.setAttribute( "data-"+datakey , value );
    };
    
    // Set Event Listener ( Override )
    this.set_event = function( eventname , func ){
            this.element["on"+eventname] = func;
    };
    
    // Add Eventlistener ( Add to existing events )
    this.add_event = function( eventname , func ){
            this.element.addEventListener(eventname , func);
    };
    
    // Add HtmlNode as Child
    this.add_child = function( htmlnode ){
        this.childnodes.push(htmlnode);
        this.element.appendChild(htmlnode.element);
    };
  
    // Remove a given Node from the childs ( recursive )
    this.remove_child = function( htmlnode ){
        for(var i in this.childnodes){
        var _node = this.childnodes[i];
        if( _node.guiid === htmlnode.guiid ){
            this.element.removeChild( _node.element )
            this.childnodes.splice(i,1);
        } else {
            _node.remove_child( htmlnode );
        }
      }
    };
        
    // Callback
    callback(this);

    // Give the HtmlNode back to caller
    return this;
  
  }