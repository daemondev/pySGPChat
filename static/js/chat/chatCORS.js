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

var User = React.createClass({displayName: "User",
    render: function(){
        return (
            React.createElement("div", {className: "user"}, 
                React.createElement("div", null, 
                    React.createElement("span", null, 
                        this.props.user
                    )
                )
            )
        );
    }
});

var UserList = React.createClass({displayName: "UserList",
    render: function(){
        var users = this.props.users.map(function(user){
            return React.createElement(User, {user: user});
        });
        return (
            React.createElement("div", null, " ", users, " ")
        );
    }
});

var AdminPanel = React.createClass({displayName: "AdminPanel",
    render: function(){
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "adminPanel"}, 
                    React.createElement("h1", null, "in Admin Panel"), 
                    React.createElement(UserList, {users: this.props.users})
                )
            )
        );
    }
});

var url = "Frm_usuarios.aspx/";
function GetGridUsuario(pgnum) {
    var objData = {};
    objData["in_opc"] = 2;
    objData["tamPagina"] = 20;
    objData["nroPagina"] = pgnum;
    objData["in_UsuarioID"] = 0;
    objData["vc_DNI"] = "%";
    objData["vc_Nombre"] = "";
    objData["vc_ApePaterno"] = "";
    objData["vc_ApeMaterno"] = "";
    objData["vc_Usuario"] = "";
    objData["vc_Clave"] = "";
    objData["in_PerfilID"] = 0;
    objData["in_SedeID"] = 0;
    objData["in_CampaniaID"] = 0;

    $.ajax({
        async: false,
        type: "POST",
        url: url + "mantUsuarios",
        data: JSON.stringify(objData),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            var data = (typeof response.d) == "string" ? eval("(" + response.d + ")") : response.d;
            var pageCount = 0;
            var StrPager; var strRows;
            $('#tb_usuarios tr:not(:first)').remove();
            if (data.length > 0) {
                for (var i = 0; i <= data.length; i++) {
                    user = data[i].vc_ApePaterno
                }

            }
        }//Fin Success
    }); //Fin Ajax
};

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
            chatList.innerHTML = chatList.innerHTML +  "<li class='chat'>" + data.name + " - " + data.message + "</li>";
        }else if (event == "only for admins"){

            var users = ["a","b","c"];
            ReactDOM.render(
                React.createElement(AdminPanel, {users: users}),
                document.getElementById("divAdminPanel")
            );
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

            var obj = {"name":name, "message": message};
            this.emit("new message", obj);
        }
    },
    render: function(){
        return (
            React.createElement("div", {className: "chatPanel"}, 
                React.createElement("div", null, 
                    React.createElement("div", {id: "divChatContainner", className: "chatContainner"}, 
                        React.createElement("div", {className: "chatHistory"}, 
                            React.createElement("ul", {id: "ulChatList"}, 
                                React.createElement(ChatMessage, {message: "test"})
                            )
                        ), 
                        React.createElement("div", {className: "chatMessage"}, 
                            React.createElement("input", {type: "text", id: "txtMessage", placeholder: "Ingresar mensaje, presionar ENTER", onKeyPress:  this.sendMessage})
                        )
                    ), 
                    React.createElement("div", {id: "divAdminPanel"}
                    )
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
