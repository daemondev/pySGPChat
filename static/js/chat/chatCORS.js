(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ChatMessage = React.createClass({displayName: "ChatMessage",
    render: function (){
        var message = this.props.message;
        return(
            React.createElement("div", {className: [message.type, "message"].join(" "), title:  message.ins}, 
                 message.type == "in" ? React.createElement("div", {className: "dleft"}) : '', 
                React.createElement("div", {className: "trueMessage"}, 
                    React.createElement("div", {className: "messageDate"},  message.ins), 
                    React.createElement("div", {className: "messageMessage"},  message.message)
                ), 
                 message.type == "out" ? React.createElement("div", {className: "dright"}) : ''
            )
        );
    }
});

Array.prototype.remByVal = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
}

var ChatList = React.createClass({displayName: "ChatList",
    render: function(){
        var messages = this.props.messages.map(function(message){
            return React.createElement(ChatMessage, {message: message});
        });
        return (
            React.createElement("div", {className: "rootChat", ref: (ref) => this.rootChat = ref}, messages)
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
        this.props.onClick(this.props.id);
    },
    render: function(){
        var user = this.state.user;
        return (
            React.createElement("div", {className: "user", ref: "user", id: user.in_UsuarioID, onClick: this.openChatViewer.bind(this)}, 
                React.createElement("div", null, 
                    React.createElement("span", {className: "userSpan"}, 
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
    },
    userClickHandler: function(id){
        this.props.onClick(id);
    },
    render: function(){
        var users = this.state.users.map(function(user){
            return React.createElement(User, {user: user, onClick:  this.userClickHandler, key:  user.in_UsuarioID, id: user.in_UsuarioID});
        }, this);
        return (
            React.createElement("div", null, " ", users, " ")
        );
    }
});

var ChatViewer = React.createClass({displayName: "ChatViewer",
    statics: function(){
        alert("RUN!!!");
    },
    getInitialState: function(){
        return {
              id: null
            , userName:""
            , toggleHide:true
            , messages: []
            , randomValue:  Math.random()
            , contentEditable: React.createElement(ContentEditable, {key:  Math.random(), onKeyDown: this.sendMessage, reizeChatHistory:  this.resizeChatHistory})
        };
    },
    hideCurrentChat: function(event){
        this.setState({toggleHide:!this.state.toggleHide});
        this.props.onDropChatViewer(this.state.id);
    },
    componentWillMount: function(){
        this.setState({ id: this.props.id, messages: this.props.messages, userName:this.props.userName });
    },
    setContentEditable: function (){
        this.setState({ contentEditable: React.createElement(ContentEditable, {key:  Math.random(), onKeyDown: this.sendMessage, reizeChatHistory:  this.resizeChatHistory}) });
    },
    sendMessage: function(event){
        if(event.target.nodeName === "DIV"){
            this.props.onClick(event.target.textContent, this.state.id);
            this.setContentEditable();
            return;
        }

        if(event.key == "Enter"){
            if(event.target.value.trim().length > 0){
                this.props.onClick(event.target.value, this.state.id);
            }
            event.target.value = "";
        }

    },
    scrollToBottom: function (id){
        //const tesNode = ReactDOM.findDOMNode(this.refs.chatHistory)
        //window.scrollTo(0, tesNode.offsetTop);
        var div = this.refs.chatHistory;
        div.scrollTop = div.scrollHeight - div.clientHeight;
    },
    componentDidMount: function(){
        this.scrollToBottom();
    },
    componentDidUpdate: function(){
        this.scrollToBottom();
        //<input type="text" id="txtMessage" placeholder="Ingresar mensaje y presionar ENTER" onKeyPress={ this.sendMessage } />
    },
    resizeChatHistory: function(){
        const cH = ReactDOM.findDOMNode(this.refs.chatHistory);
        cH.style.height = cH.style.height - 20;
        //this.refs.chatMessage.style.height = this.refs.chatMessage.style.height + 20;
        const cM = ReactDOM.findDOMNode(this.refs.chatMessage);
        cM.style.height = cM.style.height + 20;
    },
    render: function (){
        return(
                    React.createElement("div", {className: "chatViewer"}, 
                        React.createElement("div", {className: "userUser"}, 
                            React.createElement("span", {className: "userName"},  this.state.userName), " ", React.createElement("span", {className: "closeChat", onClick: this.hideCurrentChat}, "✖")
                        ), 
                        React.createElement("div", {className: "chatContainner"}, 
                            React.createElement("div", {className: "chatHistory", ref: "chatHistory"}, 
                                React.createElement(ChatList, {messages:  this.state.messages})
                            ), 
                            React.createElement("div", {className: "chatMessage", ref: "chatMessage"}, 
                                React.createElement(ContentEditable, {rnd:  this.randomValue, ref: (ref) => this.theContentEditable = ref, onKeyDown: this.sendMessage, reizeChatHistory:  this.resizeChatHistory})
                            )
                        )
                    )
        );
    }
});
var ContentEditable = React.createClass({displayName: "ContentEditable",
    render: function(){
        return React.createElement("div", {className: "text-box", ref: "textBox", 
            onKeyPress: this.myKeyPress, 
            contentEditable: true, 
            placeholder: "Ingresar Mensaje y Presionar ENTER"
            });
    },
    myKeyPress: function (e){
        console.log(this.refs.textBox.clientHeight);
        if(this.refs.textBox.clientHeight > 25){
            this.props.reizeChatHistory(25);
        }

        if(e.key == "Enter"){
            if(e.target.textContent.trim().length > 0){
                this.props.onKeyDown(e);
            }
            e.target.innerHTML = "";
            /*
            e.target.textContent = "";
            while (e.target.lastChild) {
                alert("deleting");
                e.target.removeChild(e.target.lastChild);
            } //**/
        }
    }
});

function getLastTextNodeIn(node) {
    while (node) {
        if (node.nodeType == 3) {
            return node;
        } else {
            node = node.lastChild;
        }
    }
}

function isRangeAfterNode(range, node) {
    var nodeRange, lastTextNode;
    if (range.compareBoundaryPoints) {
        nodeRange = document.createRange();
        lastTextNode = getLastTextNodeIn(node);
        nodeRange.selectNodeContents(lastTextNode);
        nodeRange.collapse(false);
        return range.compareBoundaryPoints(range.START_TO_END, nodeRange) > -1;
    } else if (range.compareEndPoints) {
        if (node.nodeType == 1) {
            nodeRange = document.body.createTextRange();
            nodeRange.moveToElementText(node);
            nodeRange.collapse(false);
            return range.compareEndPoints("StartToEnd", nodeRange) > -1;
        } else {
            return false;
        }
    }
}


var MyComponent = React.createClass({displayName: "MyComponent",
  handleClick: function() {
    if (this.myTextInput !== null) {
      this.myTextInput.focus();
    }
  },
  render: function() {
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
            , port : ":8888"
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
            if(this.state.currentChats.indexOf(data.userIDDST) === -1){
                this.receiveUserAction(data.userIDDST);
                return;
            }
            var state = Object.assign({}, this.state);
            var newChat = state.chatViewersDict[data.userIDDST].state.messages.concat(data);
            state.chatViewersDict[data.userIDDST].state.messages = newChat;

            var userName = "aux";
            var nCV = state.chatViewers.map(function (v){
                if (v.props.id == data.userIDDST){
                    return React.createElement(ChatViewer, {id:  data.userIDDST, key:  data.userIDDST, onClick: this.sendMessage.bind(this), ref: (ref) => this.updateState(ref, data.userIDDST), data: "rawData", messages: newChat, userName: userName, onDropChatViewer:  this.dropChatViewer})
                }else{
                    return v
                }
            }, this);

            state.chatViewers = nCV;

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
        var state = Object.assign({}, this.state);
        state.myProps["user"] = "@daemonDEV";
        state.myProps["profile"] = "root";
        this.setState(state);
    },
    updateState: function(chatViewer, id){
        var state = Object.assign({}, this.state);
        state.chatViewersDict[id] = chatViewer;
        this.setState(state);
    },
    sendMessage: function(message, userIDDST){
        var name = this.state.myProps["user"];
        var obj = {"name":name, "message": message, "userIDDST":userIDDST};
        this.emit("new message", obj);
    },
    receiveUserAction: function(id){
        var payload = {"userIDDST":id};
        this.emit("get chat for this user", payload);
    },
    dropChatViewer: function(id){
        var state = Object.assign({}, this.state);

        var newIds = state.currentChats.filter(n => n != id );
        state.currentChats = newIds;
        var nCV = state.chatViewers.filter(cv => cv.props.id != id);
        state.chatViewers = nCV;

        this.setState(state);
    },
    addChatViewer: function (messages, id){
        if(this.state.currentChats.indexOf(id) === -1){
            var userName = "";
            this.state.users.map(function(user){
                if(user.in_UsuarioID == id){
                    userName =  user.vc_Nombre + " " + user.vc_ApePaterno +" "+ user.vc_ApeMaterno;
                }
            });
            this.setState({
                chatViewers:  [React.createElement(ChatViewer, {id:  id, key: id, onClick: this.sendMessage.bind(this), ref: (ref) => this.updateState(ref, id), data: "rawData", messages: messages, userName: userName, onDropChatViewer:  this.dropChatViewer})].concat(this.state.chatViewers),
                currentChats:this.state.currentChats.concat(id)
            });
        }
    },
    scrollSmoothToBottom: function  (id) {
        var div = document.getElementById(id);
        /*
        $('#' + id).animate({
            scrollTop: div.scrollHeight - div.clientHeight
        }, 500); /**/
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
