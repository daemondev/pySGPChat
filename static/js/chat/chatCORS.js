(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ChatMessage = React.createClass({displayName: "ChatMessage",
    render: function (){
        var message = this.props.message;
        return(
            React.createElement("div", null, 
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
    render: function(){
        var user = this.state.user;
        return (
            React.createElement("div", {className: "user"}, 
                React.createElement("div", null, 
                    React.createElement("span", null, 
                        user.in_UsuarioID, " - ", user.vc_Nombre, " - ", user.vc_ApePaterno, " - ", user.vc_ApeMaterno
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
        this. setState({users: this.props.users});
    },
    render: function(){
        var users = this.state.users.map(function(user){
            return React.createElement(User, {user: user});
        });
        return (
            React.createElement("div", null, " ", users, " ")
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
        };
    },
    onMessage: function(e){
        var data = eval('(' + e.data + ')');
        this.on(data["event"], data["data"]);
    },
    on: function(event, data){
        if (event == "new chat"){
            var chatList = document.getElementById("ulChatList");
            var messageBox = document.getElementById("txtMessage");
            messageBox.value = "";
            chatList.innerHTML = chatList.innerHTML +  "<li class='chat'>" + data.name + " - " + data.message + "</li>";
        }else if (event == "only for admins"){
            if(!this.state.haveAdminPanel){
                this.setState({haveAdminPanel:true, users: data});
            }
        }else if(event == "populate chat-list"){
            this.setState({messages:data});
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
    sendMessage: function(event){
        if(event.key == "Enter"){
            var name = this.state.myProps["user"];
            var message = event.target.value;

            var obj = {"name":name, "message": message, "userIDDST":1};
            this.emit("new message", obj);
        }
    },
    hideCurrentChat: function(event){
        this.setState({toggleHide:!this.state.toggleHide});
        console.log("clicked: " + this.state.toggleHide);
        //event.target.parentNode.style.display = 'none';
        //alert(event.target.parentNode.nodeName);
    },
    getMessages: function(){

    },
    render: function(){
        return (
            React.createElement("div", {className: "chatMain"}, 
                React.createElement("div", {className: "chatPanel"}, 
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
                ), 
                 this.state.haveAdminPanel ?
                React.createElement("div", {id: "divAdminPanel", className: "adminPanel"}, 
                    React.createElement(UserList, {users: this.state.users})
                )
                : ''

            )
        )
    }
});

ReactDOM.render(
    React.createElement(ChatContainer, null),
    document.getElementById('divChatWrapper')
);
},{}]},{},[1]);
