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
    message: function(){
        alert("my message");
    },
    childContextTypes: {
        messsage: React.PropTypes.func
    },
    render: function(){
        var user = this.state.user;
        var username = user.vc_Nombre + ", " +  user.vc_ApePaterno + " "+ user.vc_ApeMaterno;
        return (
            React.createElement("div", {className: "user", ref: "user", id: user.in_UsuarioID, onClick: this.openChatViewer.bind(this), title:  username }, 
                React.createElement("div", {title:  username }, 
                    React.createElement("span", {className: "userAvatar"}, " ", React.createElement("p", {className: user.avatar}, " ",  user.avatar, " "), " "), 
                    React.createElement("span", {className: "userSpan", title:  username }, 
                         this.props.truncateString(username ,28) 
                    )
                )
            )
        );
    }
});

var BtnAll = React.createClass({displayName: "BtnAll",
    openChatViewer: function(event){
        this.props.onClick(this.props.id);
    },
    render: function(){
        return (
            React.createElement("div", {className: "sendToAllWrapper"}, 
                React.createElement("span", {className: "sendToAll", onClick:  this.openChatViewer.bind(this)}, " ", React.createElement("p", null, "ENVIAR  "), React.createElement("p", null, "A "), React.createElement("p", null, " TODOS"), " ")
            )
        );
    }
});

var UserList = React.createClass({displayName: "UserList",
    statics: {
        setConnectedState: function (id){
            alert(id);
        }
    },
    getInitialState: function(){
        return { users: [], usersDict: {}, allUsers: []};
    },
    componentWillMount: function(){
        this.setState({users: this.props.users});
    },
    userClickHandler: function(id){
        this.props.onClick(id);
    },
    updateState: function(user, id){
        var u = [];
        u[id] = user;
        u = this.state.allUsers.concat(u);
    },
    componentDidMount: function(){
    },
    render: function(){
        var btnSendToAll = null;
        var allUsers = [];
        var users = this.state.users.map(function(user){
            if(user.in_UsuarioID == 0){
                btnSendToAll = [React.createElement(BtnAll, {onClick:  this.userClickHandler, key:  user.in_UsuarioID, id: user.in_UsuarioID})];
                return;
            }
            var u = React.createElement(User, {user: user, onClick:  this.userClickHandler, key:  user.in_UsuarioID, truncateString:  this.props.owner.truncateString, id: user.in_UsuarioID, ref: ref => this.updateState(ref, user.in_UsuarioID)});
            allUsers[user.in_UsuarioID] = u;
            return u;
        }, this);
        return (
            React.createElement("div", null, " ", btnSendToAll, " ", React.createElement("div", {className: "userListWrapper"}, " ", users, " "), " ")
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
        var div = this.refs.chatHistory;
        div.scrollTop = div.scrollHeight - div.clientHeight;
    },
    componentDidMount: function(){
        this.scrollToBottom();
    },
    componentDidUpdate: function(){
        this.scrollToBottom();
    },
    resizeChatHistory: function(){
        const cH = ReactDOM.findDOMNode(this.refs.chatHistory);
        cH.style.height = cH.style.height - 20;
        const cM = ReactDOM.findDOMNode(this.refs.chatMessage);
        cM.style.height = cM.style.height + 20;
    },
    render: function (){
        var truncatedUserName = this.props.owner.truncateString(this.state.userName, 28);
        return(
                    React.createElement("div", {className: ["chatViewer", ( this.state.id != 0 ? "broadcast" : "" )].join(" ")}, 
                        React.createElement("div", {title:  this.state.userName, className: ["userUser", ( this.state.id == 0 ? "broadcastUser" : "" )].join(" ")}, 
                            React.createElement("span", {className: "userName"},  truncatedUserName ), " ", React.createElement("span", {className: "closeChat", onClick: this.hideCurrentChat}, "✖")
                        ), 
                        React.createElement("div", {className: "chatContainner"}, 
                            React.createElement("div", {className: "chatHistory", ref: "chatHistory"}, 
                                React.createElement(ChatList, {messages:  this.state.messages})
                            ), 
                            React.createElement("div", {className: "chatMessage", ref: "chatMessage"}, 
                                React.createElement("input", {type: "text", id: "txtMessage", placeholder: "Ingresar mensaje y presionar ENTER", onKeyPress:  this.sendMessage})
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
            , toggleHideChatPanel: false
            , step:1
            , messages:[]
            , haveAdminPanel: false
            , users: []
            , currentChats: []
            , chatViewers: []
            , chatViewersDict: {}
            , hiddeToggleChatManager: true
            , owner: this
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
            this.activateChatPanel();

            var state = Object.assign({}, this.state);
            var newChat = state.chatViewersDict[data.userIDDST].state.messages.concat(data);
            state.chatViewersDict[data.userIDDST].state.messages = newChat;

            var userName = "aux";
            var nCV = state.chatViewers.map(function (v){
                if (v.props.id == data.userIDDST){
                    return React.createElement(ChatViewer, {id:  data.userIDDST, key:  data.userIDDST, onClick: this.sendMessage.bind(this), owner: this.state.owner, ref: (ref) => this.updateState(ref, data.userIDDST), data: "rawData", messages: newChat, userName: userName, onDropChatViewer:  this.dropChatViewer})
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
        }else if(event == "set user connection state"){
        }
    },
    emit: function (message, data ){
        var json = JSON.stringify({0:message, 1: data})
        this.state.ws.send(json);
    },
    onOpen: function(event,a){
        return;
    },
    notifier: function(){
        console.log("CLEAN websockets");
    },
    componentWillMount: function(){
        var prevWS = this.state.ws;
        if(prevWS != null){
            prevWS.removeEventListener("onopen", this.notifier);
            prevWS.removeEventListener("onerror", this.notifier);
            prevWS.removeEventListener("onclose", this.notifier);
        }

        var ws = new WebSocket("ws" + this.state.separator + document.domain + this.state.port + this.state.namespace);
        ws.onmessage = this.onMessage;
        ws.onopen = this.onOpen;
        ws.onclose = this.onClose;
        ws.onerror = this.onError;
        this.setState({ws:ws});
    },
    reconnectSocket: function(e){
        that = this;
        setTimeout(function(){
            console.log("WebSocketClient: reconnecting...");
            that.componentWillMount();
        },2*1000);
    },
    onClose: function(e){
        this.reconnectSocket(e);
    },
    onError: function(e){

        this.reconnectSocket(e);
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
        if(nCV.length == 0){
            state.hiddeToggleChatManager = true;
        }

        this.setState(state);
    },
    activateChatPanel(){
        this.setState({toggleHideChatPanel:false});
    },
    addChatViewer: function (messages, id){
        this.activateChatPanel();
        if(this.state.currentChats.indexOf(id) === -1){

            var userName = "";
            this.state.users.map(function(user){
                if(user.in_UsuarioID == id){
                    userName =  user.vc_Nombre + " " + user.vc_ApePaterno +" "+ user.vc_ApeMaterno;
                }
            }, this);
            var currentChatViewers = this.state.chatViewers;
            var deletedChatViewer = null;
            var newCurrentsChats = this.state.currentChats;

            if(currentChatViewers.length > 3){
                deletedChatViewer = currentChatViewers.pop();
                newCurrentsChats = newCurrentsChats.filter(n => n != deletedChatViewer.props.id );
                console.log("deleting: " + deletedChatViewer.props.id + " - length: " + currentChatViewers.length );
            }

            this.setState({
                chatViewers:  [React.createElement(ChatViewer, {id:  id, key: id, onClick: this.sendMessage.bind(this), ref: (ref) => this.updateState(ref, id), owner: this.state.owner, data: "rawData", messages: messages, userName: userName, onDropChatViewer:  this.dropChatViewer})].concat(currentChatViewers),
                hiddeToggleChatManager: false,
                currentChats: newCurrentsChats.concat(id)
            });
        }
    },
    scrollSmoothToBottom: function  (id) {
        var div = document.getElementById(id);
    },
    hideAdminPanel: function(){
        this.setState({toggleHide:!this.state.toggleHide});
    },
    toggleChatPanel: function (event){

        this.setState({toggleHideChatPanel:!this.state.toggleHideChatPanel});
    },
    truncateString: function (str, num) {
        if (str.length < num) return str;

        var truncStr = str.slice(0, num);
        var truncStrArr = truncStr.split(' ');
        var truncStrArrLen=truncStrArr.length;

        if(truncStrArrLen > 1 && truncStrArr[truncStrArrLen - 1] !== str.split(' ')[truncStrArrLen - 1]) {
            truncStrArr.pop();
            truncStr = truncStrArr.join(' ');
        }
        return str.length > num ? truncStr + '...' : truncStr;
    },
    render: function(){
        return (
            React.createElement("div", {className: "chatMain"}, 
                React.createElement("div", {className: "hideAdminPanel", onClick:  this.hideAdminPanel.bind(this) }, " ", React.createElement("span", null, " ",  this.state.toggleHide ? "MOSTRAR" : "OCULTAR"), " ", React.createElement("span", null, "PANEL"), " "), 
                React.createElement("div", {id: "divMiniPanel", className:  this.state.hiddeToggleChatManager ? "hiddden": "", onClick: this.toggleChatPanel.bind(this)}, " ", React.createElement("div", {className: "togglePanelContainner"}, 
                        React.createElement("span", {id: "spanToggleHeader", className:  !this.state.toggleHideChatPanel ? "hiddden": ""}), 
                        React.createElement("span", {id: "spanToggleText"},  this.state.toggleHideChatPanel ? "MOSTRAR" : "OCULTAR", " chat"), 
                        React.createElement("span", {id: "spanToggleFooter", className:  this.state.toggleHideChatPanel ? "hiddden": ""})
                ), " "), 
                React.createElement("div", {id: "divChatPanel", ref: "myChatPanel", className:  this.state.toggleHideChatPanel ? "hiddden": ""}, 
                     this.state.chatViewers
                ), 
                 this.state.haveAdminPanel ?
                React.createElement("div", {id: "divAdminPanel", className:  this.state.toggleHide ? "hiddden": "", ref: "adminPanel"}, 
                    React.createElement(UserList, {users: this.state.users, onClick:  this.receiveUserAction, onHideAdminPanel: this.hideAdminPanel, owner: this.state.owner})
                )
                : ''
            )
        );
    }
});



var Child = React.createClass({displayName: "Child",
  handleClick: function(){
    this.props.owner.setState({
      count: this.props.count + 1,
    });
  },
  render: function(){
    return React.createElement("div", {onClick: this.handleClick}, this.props.count);
  }
});

var Parent = React.createClass({displayName: "Parent",
  getInitialState: function(){
    return {
      count: 0,
      owner: this
    };
  },
  render: function(){
    return React.createElement(Child, React.__spread({},  this.state))
  }
});

ReactDOM.render(
    React.createElement(ChatContainer, null),
    document.getElementById('divChatWrapper')
);

},{}]},{},[1]);
