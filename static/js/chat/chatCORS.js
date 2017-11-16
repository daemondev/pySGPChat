(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ChatMessage = React.createClass({displayName: "ChatMessage",
    render: function (){
        return(
            React.createElement("div", null, 
                React.createElement("p", null, "paragraph-mode ", this.props.message)
            )
        );
    }
});

var MessageList = React.createClass({displayName: "MessageList",
    render: function(){
        var messages = this.props.messages.map(function(message){
            return React.createElement(ChatMessage, {message: message});
        });
        return (
            React.createElement("div", null, messages)
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
            chatList.innerHTML = chatList.innerHTML +  "<li class='collection-item'>" + data.name + " - " + data.message + "</li>";
        }
    },
    emit: function (message, data ){
        var json = JSON.stringify({0:message, 1: data})
        this.state.ws.send(json);
    },
    onOpen: function(){
        //alert("opening");
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

            var obj = {"name":name, "message": message};
            this.emit("new message", obj);
        }
    },
    render: function(){
        return (
            React.createElement("div", {id: "divChatContainner", className: "chatContainner"}, 

                React.createElement("div", {className: "chatHistory"}, 
                    React.createElement("ul", {id: "ulChatList"}, 
                        React.createElement(ChatMessage, {message: "test"})
                    )
                ), 
                React.createElement("div", {className: "chatMessage"}, 
                    React.createElement("input", {type: "text", id: "txtMessage", placeholder: "Ingresar mensaje, presionar ENTER", onKeyPress:  this.sendMessage})
                )
            )
        )
    }
});

ReactDOM.render(
    React.createElement(ChatContainer, null),
    document.getElementById('divChatWrapper')
);
},{}]},{},[1]);
