var ChatMessage = React.createClass({
    render: function (){
        var message = this.props.message;
        return(
            <div className={[message.type, "message"].join(" ")} title={ message.ins } >
                { message.type == "in" ? <div className="dleft"></div> : '' }
                <div className="trueMessage">
                    <div className="messageDate">{ message.ins }</div>
                    <div className="messageMessage">{ message.message }</div>
                </div>
                { message.type == "out" ? <div className="dright"></div> : '' }
            </div>
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

var ChatList = React.createClass({
    render: function(){
        var messages = this.props.messages.map(function(message){
            return <ChatMessage message={message} />;
        });
        return (
            <div className="rootChat" ref={(ref) => this.rootChat = ref}>{messages}</div>
        );
    }
});

var User = React.createClass({
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
            <div className="user" ref="user" id={user.in_UsuarioID} onClick={this.openChatViewer.bind(this)} title={ username } >
                <div title={ username } >
                    <span className="userAvatar"> <p className={user.avatar} > { user.avatar } </p> </span>
                    <span className="userSpan" title={ username } >
                        { this.props.truncateString(username ,28) }
                    </span>
                </div>
            </div>
        );
    }
});

var BtnAll = React.createClass({
    openChatViewer: function(event){
        this.props.onClick(this.props.id);
    },
    render: function(){
        return (
            <div className="sendToAllWrapper">
                <span className="sendToAll" onClick={ this.openChatViewer.bind(this)} > <p>ENVIAR  </p><p>A </p><p> TODOS</p> </span>
            </div>
        );
    }
});

var UserList = React.createClass({
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
        //this.setState({allUsers:u});
    },
    componentDidMount: function(){
        //this.state.all
        //alert("rendered");
    },
    render: function(){
        var btnSendToAll = null;
        var allUsers = [];
        var users = this.state.users.map(function(user){
            if(user.in_UsuarioID == 0){
                btnSendToAll = [<BtnAll onClick={ this.userClickHandler } key={ user.in_UsuarioID } id={user.in_UsuarioID} />];
                return;
            }
            var u = <User user={user} onClick={ this.userClickHandler } key={ user.in_UsuarioID } truncateString={ this.props.owner.truncateString } id={user.in_UsuarioID} ref={ref => this.updateState(ref, user.in_UsuarioID)} />;
            allUsers[user.in_UsuarioID] = u;
            return u;
        }, this);
        //this.setState({allUsers: allUsers});
        return (
            <div> {btnSendToAll} <div className="userListWrapper"> {users} </div> </div>
        );
    }
});

var ChatViewer = React.createClass({
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
            , contentEditable: <ContentEditable key={ Math.random() }  onKeyDown={this.sendMessage} reizeChatHistory={ this.resizeChatHistory } />
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
        this.setState({ contentEditable: <ContentEditable  key={ Math.random() } onKeyDown={this.sendMessage} reizeChatHistory={ this.resizeChatHistory } /> });
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
        //<ContentEditable rnd={ this.randomValue } ref={(ref) => this.theContentEditable = ref}  onKeyDown={this.sendMessage} reizeChatHistory={ this.resizeChatHistory } />
    },
    resizeChatHistory: function(){
        const cH = ReactDOM.findDOMNode(this.refs.chatHistory);
        cH.style.height = cH.style.height - 20;
        //this.refs.chatMessage.style.height = this.refs.chatMessage.style.height + 20;
        const cM = ReactDOM.findDOMNode(this.refs.chatMessage);
        cM.style.height = cM.style.height + 20;
    },
    render: function (){
        var truncatedUserName = this.props.owner.truncateString(this.state.userName, 28);
        return(
                    <div className={["chatViewer", ( this.state.id != 0 ? "broadcast" : "" )].join(" ")}>
                        <div  title={ this.state.userName } className={["userUser", ( this.state.id == 0 ? "broadcastUser" : "" )].join(" ")}>
                            <span className="userName">{ truncatedUserName }</span> <span className="closeChat" onClick={this.hideCurrentChat}>&#10006;</span>
                        </div>
                        <div className="chatContainner">
                            <div className="chatHistory" ref="chatHistory">
                                <ChatList messages={ this.state.messages } />
                            </div>
                            <div className="chatMessage" ref="chatMessage">
                                <input type="text" id="txtMessage" placeholder="Ingresar mensaje y presionar ENTER" onKeyPress={ this.sendMessage } />
                            </div>
                        </div>
                    </div>
        );
    }
});
var ContentEditable = React.createClass({
    render: function(){
        return <div className="text-box" ref="textBox"
            onKeyPress={this.myKeyPress}
            contentEditable
            placeholder="Ingresar Mensaje y Presionar ENTER"
            ></div>;
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


var MyComponent = React.createClass({
  handleClick: function() {
    if (this.myTextInput !== null) {
      this.myTextInput.focus();
    }
  },
  render: function() {
    return (
      <div>
        <input type="text" ref={(ref) => this.myTextInput = ref} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.handleClick}
        />
      </div>
    );
  }
});

var ChatContainer = React.createClass({
    getInitialState: function(){
        return {
            myProps: {}
            , data:[]
            , ws : null
            , domain : "xxIPxx"
            , separator : "/"
            , dot2 : ":"
            //, port : ":8888"
            , port : "xxPORTxx"
            , protocol : "ws"
            , namespace : "websocket"
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

    /*
    handleClick() {
      this.setState(prevState => ({
        words: [...prevState.words, 'marklar'],
      }));
    }, /**/

    on: function(event, data){
        if (event == "new chat"){
            if(this.state.currentChats.indexOf(data.userIDDST) === -1){
                this.receiveUserAction(data.userIDDST);
                return;
            }
            this.activateChatPanel();
            /*
            var player = {score: 1, name: 'Jeff'};
            var newPlayer = Object.assign({}, player, {score: 2});
            var newPlayer = {...player, score: 2}; /**/

            var state = Object.assign({}, this.state);
            var newChat = state.chatViewersDict[data.userIDDST].state.messages.concat(data);
            state.chatViewersDict[data.userIDDST].state.messages = newChat;

            var userName = "aux";
            var nCV = state.chatViewers.map(function (v){
                if (v.props.id == data.userIDDST){
                    return <ChatViewer id={ data.userIDDST }  key={ data.userIDDST } onClick={this.sendMessage.bind(this)}  owner={this.state.owner} ref={(ref) => this.updateState(ref, data.userIDDST)} data="rawData" messages={newChat} userName={userName} onDropChatViewer={ this.dropChatViewer }/>
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
            //alert("userIDDST: " + data.userIDDST + "state: " + data.state);
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
    connect: function(){
        var prevWS = this.state.ws;
        if(prevWS != null){
            prevWS.removeEventListener("onopen", this.notifier);
            prevWS.removeEventListener("onerror", this.notifier);
            prevWS.removeEventListener("onclose", this.notifier);
        }
        //var url = this.state.protocol + this.state.dot2 + this.state.separator + this.state.separator + this.state.domain + this.state.dot2 + this.state.port + this.state.separator + this.state.namespace;
        //alert(url);
        console.log(this.state.protocol + this.state.dot2 + this.state.separator + this.state.separator + this.state.domain + this.state.dot2 + this.state.port + this.state.separator + this.state.namespace);
        var ws = new WebSocket(this.state.protocol + this.state.dot2 + this.state.separator + this.state.separator + this.state.domain + this.state.dot2 + this.state.port + this.state.separator + this.state.namespace);
        ws.onmessage = this.onMessage;
        ws.onopen = this.onOpen;
        ws.onclose = this.onClose;
        //ws.onerror = this.onError;
        this.setState({ws:ws});
    },
    componentWillMount: function(){
        this.connect();
    },
    reconnectSocket: function(e){
        //this.componentWillMount();
        that = this;
        setTimeout(function(){
            console.log("WebSocketClient: reconnecting...");
            that.connect();
        },2*1000);
    },
    onClose: function(e){
        console.log("onClose: ["+e.code+"]");
        ///*
        switch (e.code){
            case 1000:	// CLOSE_NORMAL
                    console.log("WebSocket: closed");
                break;
            case 1006:
                    this.reconnectSocket(e);
                break;
            default:	// Abnormal closure
                    this.reconnectSocket(e);
                    break;
        }
        //this.onClose(e); /**/
        //this.reconnectSocket(e);
    },
    onError: function(e){
        console.log("onError: ["+e+"]");
        ///*
        switch (e.code){
            case 'ECONNREFUSED':
                    this.reconnectSocket(e);
                    break;
            default:
                    //this.onError(e);
                    break;
        }/**/
        //this.reconnectSocket(e);
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
    //getChildContext: function(){
        //return { message:""  }
    //},
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
                    //userName =  this.truncateString(user.vc_Nombre + " " + user.vc_ApePaterno +" "+ user.vc_ApeMaterno, 28);
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
                chatViewers:  [<ChatViewer id={ id }  key={id} onClick={this.sendMessage.bind(this)} ref={(ref) => this.updateState(ref, id)} owner={this.state.owner}  data="rawData" messages={messages} userName={userName} onDropChatViewer={ this.dropChatViewer }/>].concat(currentChatViewers),
                hiddeToggleChatManager: false,
                currentChats: newCurrentsChats.concat(id)
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
    hideAdminPanel: function(){
        this.setState({toggleHide:!this.state.toggleHide});
    },
    toggleChatPanel: function (event){
        /*
        var classNamesTop = [];
        var classNamesDown = [];

        if(this.state.toggleHideChatPanel){
            classNamesDown = ["toggleFooter", "arrowDown", "hiddden"];
            classNamesTop = ["toggleHeader", "arrowTop"];
        }else{
            classNamesDown = ["toggleFooter", "arrowDown" ];
            classNamesTop = ["toggleHeader", "arrowTop", "hiddden"];
        } /**/

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
            <div className="chatMain">
                <div className="hideAdminPanel" onClick={ this.hideAdminPanel.bind(this) } > <span> { this.state.toggleHide ? "MOSTRAR" : "OCULTAR" }</span> <span>PANEL</span> </div>
                <div id="divMiniPanel" className={ this.state.hiddeToggleChatManager ? "hiddden": "" }  onClick={this.toggleChatPanel.bind(this)}> <div className="togglePanelContainner">
                        <span id="spanToggleHeader" className={ !this.state.toggleHideChatPanel ? "hiddden": "" }></span>
                        <span id="spanToggleText">{ this.state.toggleHideChatPanel ? "MOSTRAR" : "OCULTAR" } chat</span>
                        <span id="spanToggleFooter" className={ this.state.toggleHideChatPanel ? "hiddden": "" }></span>
                </div> </div>
                <div id="divChatPanel" ref="myChatPanel" className={ this.state.toggleHideChatPanel ? "hiddden": "" } >
                    { this.state.chatViewers }
                </div>
                { this.state.haveAdminPanel ?
                <div id="divAdminPanel" className={ this.state.toggleHide ? "hiddden": "" } ref="adminPanel">
                    <UserList users={this.state.users} onClick={ this.receiveUserAction } onHideAdminPanel={this.hideAdminPanel} owner={this.state.owner} />
                </div>
                : '' }
            </div>
        );
    }
});



var Child = React.createClass({
    handleClick: function(){
        this.props.owner.setState({
            count: this.props.count + 1,
        });
    },
    render: function(){
        return <div onClick={this.handleClick}>{this.props.count}</div>;
    }
});

var Parent = React.createClass({
    getInitialState: function(){
        return {
          count: 0,
          owner: this
        };
    },
    render: function(){
        return <Child {...this.state}/>
    }
});

ReactDOM.render(
    <ChatContainer />,
    document.getElementById('divChatWrapper')
);
