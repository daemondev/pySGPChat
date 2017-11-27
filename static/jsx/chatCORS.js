var ChatMessage = React.createClass({
    render: function (){
        var message = this.props.message;
        return(
            <div className={message.type}>
                <p>HORA: { message.ins } - Mensaje: { message.message }</p>
            </div>
        );
    }
});

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
        //alert(this.state.user.in_UsuarioID);
        this.props.onClick(this.state.user.in_UsuarioID);
        //alert(event.target.className);
        //alert(this.props.uuid);
    },
    render: function(){
        var user = this.state.user;
        return (
            <div className="user" ref="user" id={user.in_UsuarioID}>
                <div>
                    <span onClick={this.openChatViewer.bind(this)} className="userSpan">
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
        //this. setState({users: [{"vc_Nombre":"name","vc_ApePaterno":"pat","vc_ApeMaterno":"mat","in_UsuarioID":1}]});
    },
    userClickHandler: function(id){
        this.props.onClick(id);
    },
    render: function(){
        var users = this.state.users.map(function(user){
            return <User user={user} onClick={ this.userClickHandler } key={ user.in_UsuarioID }/>;
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
        console.log("clicked: " + this.state.toggleHide);
        this.props.onDropChatViewer(this.state.id);
        //event.target.parentNode.style.display = 'none';
        //alert(event.target.parentNode.nodeName);
    },
    componentWillMount: function(){
        this.setState({ id: this.props.id, messages: this.props.messages, userName:this.props.userName });
    },
    sendMessage: function(event){
        if(event.key == "Enter"){
            this.props.onClick(event.target.value, this.state.id);
            /*
            var newMessage = this.state.messages.concat(
                {"message":event.target.value, "ins":"fecha", "type":"out"}
            );
            this.setState({messages:newMessage}); /**/
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
                    <div className="chatViewer" style={this.state.toggleHide ? {}:{display:'none'}} >
                        <div className="closeChat" onClick={this.hideCurrentChat}>
                            <span className="userName">{ this.state.userName }</span> <span>&times;</span>
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
    // Explicitly focus the text input using the raw DOM API.
    if (this.myTextInput !== null) {
      this.myTextInput.focus();
    }
  },
  render: function() {
    // The ref attribute is a callback that saves a reference to the
    // component to this.myTextInput when the component is mounted.
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
            , port : "8888"
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
                //this.addChatViewer([data], data.userIDDST);
                this.receiveUserAction(data.userIDDST);
                return;
            }
            var state = Object.assign({}, this.state);
            //state.chatViewersDict[id].messages.concat(data);
            //console.log( state.chatViewersDict[data.userIDDST].state.messages);
            var newChat = state.chatViewersDict[data.userIDDST].state.messages.concat(data);
            //var m = state.chatViewersDict[data.userIDDST].state.messages.concat(data);
            //console.log( state.chatViewersDict[data.userIDDST].state.messages);

            state.chatViewersDict[data.userIDDST].state.messages = newChat;

            var userName = "aux";
            //state.chatViewersDict[data.userIDDST].state.messages.map(function (m){
            var nCV = state.chatViewers.map(function (v){
                if (v.props.id == data.userIDDST){
                    return <ChatViewer id={ data.userIDDST } onClick={this.sendMessage.bind(this)} ref={(ref) => this.updateState(ref, data.userIDDST)} data="rawData" messages={newChat} userName={userName}/>
                }else{
                    return v
                }
                console.log(v.props.id);
            }, this);

            state.chatViewers = nCV;

            console.log("data: ins: [" + data.ins + "] - message [" + data.message + "] - userIDDST [" + data.userIDDST + "]");
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
    dropChatViewer: function(id){
        //alert("RUN!! " + id);
        var state = Object.assign({}, this.state);
        //debugger;
        var nCV = state.chatViewers.map(function (v){
            if (v.props.id == id){
                return;
            }else{
                if (variable !== undefined || variable !== null) {
                    return v;
                }

            }
        }, this);

        state.chatViewers = nCV;
        var newIds = state.currentChats.map(function(currentID){
            //alert(currentID);
            if(id != currentID){
                return currentID;
            }

        });
        state.currentChats = newIds;
        this.setState(state);

    },
    emit: function (message, data ){
        var json = JSON.stringify({0:message, 1: data})
        this.state.ws.send(json);
    },
    onOpen: function(event,a){
        return;
    },
    componentWillMount: function(){
        var url = "ws" + this.state.separator + document.domain +":"+ this.state.port + this.state.namespace;
        var ws = new WebSocket(url);
        //alert(url);
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
        //debugger;
        var state = Object.assign({}, this.state);
        state.chatViewersDict[id] = chatViewer;
        this.setState(state);

        //for(let cv in this.state.chatViewersDict){
            //alert(cv[id] + " - " + cv);
        //}

        //this.state.chatViewersDict.map(function(cv){
            //alert(cv.props.id + " - " + cv.props.userName);
        //});

    },
    sendMessage: function(message, userIDDST){
        //var u = this.refs.chatPanel.className;
        //var u = this.chatViewer.props.data;
        //alert(u);
        //alert(message + " - " + userIDDST);
        var name = this.state.myProps["user"];
        var obj = {"name":name, "message": message, "userIDDST":userIDDST};
        //console.log(obj);
        this.emit("new message", obj);
    },
    receiveUserAction: function(id){
        var payload = {"userIDDST":id};
        this.emit("get chat for this user", payload);
    },
    addChatViewer: function (messages, id){
        var userName = "";
        this.state.users.map(function(user){
            if(user.in_UsuarioID == id){
                userName =  user.vc_Nombre + " " + user.vc_ApePaterno +" "+ user.vc_ApeMaterno;
            }
        });

        if(this.state.currentChats.indexOf(id) === -1){
            this.setState({
                chatViewers: this.state.chatViewers.concat(
                    <ChatViewer id={ id } onClick={this.sendMessage.bind(this)} ref={(ref) => this.updateState(ref, id)} data="rawData" messages={messages} userName={userName} onDropChatViewer={ this.dropChatViewer }/>
                ),
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
