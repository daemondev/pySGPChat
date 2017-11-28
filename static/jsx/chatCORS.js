var ChatMessage = React.createClass({
    render: function (){
        var message = this.props.message;
        return(
            <div className={[message.type, "message"].join(" ")} title={ message.ins } >
                <div className="messageDate">{ message.ins }</div>
                <div className="messageMessage">{ message.message }</div>
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
    render: function(){
        var user = this.state.user;
        return (
            <div className="user" ref="user" id={user.in_UsuarioID} onClick={this.openChatViewer.bind(this)}>
                <div>
                    <span className="userSpan">
                        {user.vc_Nombre} - {user.vc_ApePaterno} - {user.vc_ApeMaterno}
                    </span>
                </div>
            </div>
        );
    }
});

var UserList = React.createClass({
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
            return <User user={user} onClick={ this.userClickHandler } key={ user.in_UsuarioID } id={user.in_UsuarioID}/>;
        }, this);
        return (
            <div> {users} </div>
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
        };
    },
    hideCurrentChat: function(event){
        this.setState({toggleHide:!this.state.toggleHide});
        this.props.onDropChatViewer(this.state.id);
    },
    componentWillMount: function(){
        this.setState({ id: this.props.id, messages: this.props.messages, userName:this.props.userName });
    },
    sendMessage: function(event){
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
    },
    render: function (){
        return(
                    <div className="chatViewer">
                        <div className="userUser">
                            <span className="userName">{ this.state.userName }</span> <span className="closeChat" onClick={this.hideCurrentChat}>&#10006;</span>
                        </div>
                        <div className="chatContainner">
                            <div className="chatHistory" id="divChatHistory" ref="chatHistory">
                                <ChatList messages={ this.state.messages } />
                            </div>
                            <div className="chatMessage">
                                <input type="text" id="txtMessage" placeholder="Ingresar mensaje, presionar ENTER" onKeyPress={ this.sendMessage } />
                            </div>
                        </div>
                    </div>
        );
    }
});

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

var AdminPanel = React.createClass({
    getInitialState: function(){
        return { users:[] };
    },
    render: function(){
        var users = this.props.users;
        return (
            <div>
                <div className="innerAdminPanel">
                    <h1>in Admin Panel</h1>
                    <UserList users={users} />
                </div>
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
                    return <ChatViewer id={ data.userIDDST }  key={ data.userIDDST } onClick={this.sendMessage.bind(this)} ref={(ref) => this.updateState(ref, data.userIDDST)} data="rawData" messages={newChat} userName={userName} onDropChatViewer={ this.dropChatViewer }/>
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
                chatViewers:  [<ChatViewer id={ id }  key={id} onClick={this.sendMessage.bind(this)} ref={(ref) => this.updateState(ref, id)} data="rawData" messages={messages} userName={userName} onDropChatViewer={ this.dropChatViewer }/>].concat(this.state.chatViewers),
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
            <div className="chatMain">
                <div className="chatPanel" ref="chatPanel">
                    { this.state.chatViewers }
                </div>
                { this.state.haveAdminPanel ?
                <div id="divAdminPanel" className="adminPanel" ref="adminPanel">
                    <UserList users={this.state.users} onClick={ this.receiveUserAction } />
                </div>
                : '' }

            </div>
        );
    }
});

ReactDOM.render(
    <ChatContainer />,
    document.getElementById('divChatWrapper')
);
