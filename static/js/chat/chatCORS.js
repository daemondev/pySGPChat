(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ChatMessage = React.createClass({displayName: "ChatMessage",
    render: function (){
        var message = this.props.message;
        return(
            React.createElement("div", {className: message.type}, 
                React.createElement("p", null, "HORA: ",  message.ins, " - Mensaje: ",  message.message)
            )
        );
    }
});

var ChatList = React.createClass({displayName: "ChatList",
    render: function(){
        var messages = this.props.messages.map(function(message){
            return React.createElement(ChatMessage, {message: message});
        });
        return (
            React.createElement("div", null, messages)
        );
    }
});

var User = React.createClass({displayName: "User",
    getInitialState: function(){
        return {user:{}};
    },
    componentWillMount: function(){
        this.setState({ user: this.props.user });
    },
    setIDchat: function (){

    },
    openChatViewer: function(event){
        //alert(this.state.user.in_UsuarioID);
        this.props.onClick(this.state.user.in_UsuarioID);
        //alert(event.target.className);
        //alert(this.props.uuid);
    },
    render: function(){
        var user = this.state.user;
        return (
            React.createElement("div", {className: "user", ref: "user", id: user.in_UsuarioID}, 
                React.createElement("div", null, 
                    React.createElement("span", {onClick: this.openChatViewer.bind(this), className: "userSpan"}, 
                        user.vc_Nombre, " - ", user.vc_ApePaterno, " - ", user.vc_ApeMaterno
                    )
                )
            )
        );
    }
});

var UserList = React.createClass({displayName: "UserList",
    getInitialState: function(){
        return { users: [] };
    },
    componentWillMount: function(){
        this.setState({users: this.props.users});
        //this. setState({users: [{"vc_Nombre":"name","vc_ApePaterno":"pat","vc_ApeMaterno":"mat","in_UsuarioID":1}]});
    },
    userClickHandler: function(id){
        //alert("prev + id: [" + id + "]");
        this.props.onClick(id);
    },
    render: function(){
        var users = [];
        var f = this.userClickHandler;
        this.state.users.forEach(function(user){
            //return <User user={user} onClick={ this.userClickHandler } key={ user.in_UsuarioID }/>;
            users.push(React.createElement(User, {user: user, onClick:  f, key:  user.in_UsuarioID}));
        });
        return (
            React.createElement("div", null, " ", users, " ")
            //<User user={this.state.users[0]} onClick={ this.userClickHandler } uuid={ 5 }/>
        );
    }
});

var ChatViewer = React.createClass({displayName: "ChatViewer",
    getInitialState: function(){
        return {
              id: null
            , toggleHide:true
            , messages: []
        };
    },
    hideCurrentChat: function(event){
        this.setState({toggleHide:!this.state.toggleHide});
        console.log("clicked: " + this.state.toggleHide);
        //event.target.parentNode.style.display = 'none';
        //alert(event.target.parentNode.nodeName);
    },
    componentWillMount: function(){
        this.setState({ id: this.props.id, messages: this.props.messages });
    },
    sendMessage: function(event){
        if(event.key == "Enter"){
            this.props.onClick(event.target.value, this.state.id);
            event.target.value = "";
        }
    },
    render: function (){
        return(
                    React.createElement("div", {className: "chatViewer", style: this.state.toggleHide ? {}:{display:'none'}}, 
                        React.createElement("div", {className: "closeChat", onClick: this.hideCurrentChat}, 
                            React.createElement("span", null, "×")
                        ), 
                        React.createElement("div", {className: "chatContainner"}, 
                            React.createElement("div", {className: "chatHistory", id: "divChatHistory"}, 
                                React.createElement(ChatList, {messages:  this.state.messages})
                            ), 
                            React.createElement("div", {className: "chatMessage"}, 
                                React.createElement("input", {type: "text", id: "txtMessage", placeholder: "Ingresar mensaje, presionar ENTER", onKeyPress:  this.sendMessage})
                            )
                        )
                    )
        );
    }
});

var MyComponent = React.createClass({displayName: "MyComponent",
  handleClick: function() {
    // Explicitly focus the text input using the raw DOM API.
    if (this.myTextInput !== null) {
      this.myTextInput.focus();
    }
  },
  render: function() {
    // The ref attribute is a callback that saves a reference to the
    // component to this.myTextInput when the component is mounted.
    return (
      React.createElement("div", null, 
        React.createElement("input", {type: "text", ref: (ref) => this.myTextInput = ref}), 
        React.createElement("input", {
          type: "button", 
          value: "Focus the text input", 
          onClick: this.handleClick}
        )
      )
    );
  }
});

var AdminPanel = React.createClass({displayName: "AdminPanel",
    getInitialState: function(){
        return { users:[] };
    },
    render: function(){
        var users = this.props.users;
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "innerAdminPanel"}, 
                    React.createElement("h1", null, "in Admin Panel"), 
                    React.createElement(UserList, {users: users})
                )
            )
        );
    }
});

var ChatContainer = React.createClass({displayName: "ChatContainer",
    getInitialState: function(){
        return {
            myProps: {}
            , data:[]
            , ws : null
            , domain : ""
            , separator : "://"
            , port : ""
            , protocol : "ws" + "://"
            , namespace : "/websocket"
            , toggleHide: true
            , step:1
            , messages:[]
            , haveAdminPanel: false
            , users: []
            , currentChats: []
            , chatViewers: []
            , chatViewersDict: {}
        };
    },
    onMessage: function(e){
        var data = eval('(' + e.data + ')');
        this.on(data["event"], data["data"]);
    },
    on: function(event, data){
        if (event == "new chat"){
            /*
            var chatList = document.getElementById("ulChatList");
            var messageBox = document.getElementById("txtMessage");
            messageBox.value = "";
            chatList.innerHTML = chatList.innerHTML +  "<li class='chat'>" + data.name + " - " + data.message + "</li>";  /**/
            //debugger;
            //
            if(!this.state.currentChats.indexOf(data.userIDDST) !== -1){
                this.addChatViewer([data], data.userIDDST);
            }
            var state = Object.assign({}, this.state);
            //state.chatViewersDict[id].messages.concat(data);
            console.log( state.chatViewersDict[data.userIDDST].state.messages);
            state.chatViewersDict[data.userIDDST].state.messages.concat([ data ]);
            //var m = state.chatViewersDict[data.userIDDST].state.messages.concat(data);
            console.log( state.chatViewersDict[data.userIDDST].state.messages);
            state.chatViewersDict[data.userIDDST].state.messages.map(function (m){
                //alert(m);
            } );
            console.log("data: " + data.ins + " - " + data.message + " - " + data.userIDDST);
            this.setState(state);
        }else if (event == "only for admins"){
            if(!this.state.haveAdminPanel){
                this.setState({haveAdminPanel:true, users: data});
            }
        }else if(event == "populate chat-list"){
            this.setState({messages:data});
        }else if(event == "chat for user"){
            this.addChatViewer(data.messages, data.userIDDST);
        }
    },
    emit: function (message, data ){
        var json = JSON.stringify({0:message, 1: data})
        this.state.ws.send(json);
    },
    onOpen: function(event,a){
        return;
    },
    componentWillMount: function(){
        var ws = new WebSocket("ws" + this.state.separator + document.domain + this.state.port + this.state.namespace);
        ws.onmessage = this.onMessage;
        ws.onopen = this.onOpen;
        this.setState({ws:ws});
    },
    componentDidMount: function(){
        var user = document.getElementById("lbl_linea").innerHTML;
        var profile = document.getElementById("lblPerfil").innerHTML;

        var state = Object.assign({}, this.state);
        state.myProps["user"] = user;
        state.myProps["profile"] = profile;
        this.setState(state);
    },
    updateState: function(chatViewer, id){
        var state = Object.assign({}, this.state);
        state.chatViewersDict[id] = chatViewer;
        this.setState(state);
    },
    sendMessage: function(message, userIDDST){
        //var u = this.refs.chatPanel.className;
        //var u = this.chatViewer.props.data;
        //alert(u);
        //alert(message + " - " + userIDDST);
        var name = this.state.myProps["user"];
        var obj = {"name":name, "message": message, "userIDDST":userIDDST};
        console.log(obj);
        this.emit("new message", obj);
    },
    receiveUserAction: function(id){
        //alert("received from User: id :["+ id +"]");
        var payload = {"userIDDST":id};
        this.emit("get chat for this user", payload);
    },
    addChatViewer: function (messages, id){
        if(this.state.currentChats.indexOf(id) === -1){
            this.setState({
                chatViewers: this.state.chatViewers.concat(
                    React.createElement(ChatViewer, {id:  id, onClick: this.sendMessage.bind(this), ref: (ref) => this.updateState(ref, id), data: "rawData", messages: messages})
                ),
                currentChats:this.state.currentChats.concat(id)
            });
        }
    },
    render: function(){
        return (
            React.createElement("div", {className: "chatMain"}, 
                React.createElement("div", {className: "chatPanel", ref: "chatPanel"}, 
                     this.state.chatViewers
                ), 
                 this.state.haveAdminPanel ?
                React.createElement("div", {id: "divAdminPanel", className: "adminPanel", ref: "adminPanel"}, 
                    React.createElement(UserList, {users: this.state.users, onClick:  this.receiveUserAction})
                )
                : ''

            )
        );
    }
});

ReactDOM.render(
    React.createElement(ChatContainer, null),
    document.getElementById('divChatWrapper')
);
},{}]},{},[1]);
