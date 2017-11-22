var ChatMessage = React.createClass({
    render: function (){
        var message = this.props.message;
        return(
            <div>
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
            <div>{messages}</div>
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
    render: function(){
        var user = this.state.user;
        return (
            <div className="user">
                <div>
                    <span>
                        {user.in_UsuarioID} - {user.vc_Nombre} - {user.vc_ApePaterno} - {user.vc_ApeMaterno}
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
        this. setState({users: this.props.users});
    },
    render: function(){
        var users = this.state.users.map(function(user){
            return <User user={user} />;
        });
        return (
            <div> {users} </div>
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
            <div className="chatMain">
                <div className="chatPanel">
                    <div className="chatViewer" style={this.state.toggleHide ? {}:{display:'none'}} >
                        <div className="closeChat" onClick={this.hideCurrentChat}>
                            <span>&times;</span>
                        </div>
                        <div className="chatContainner">
                            <div className="chatHistory" id="divChatHistory">
                                <ChatList messages={ this.state.messages } />
                            </div>
                            <div className="chatMessage">
                                <input type="text" id="txtMessage" placeholder="Ingresar mensaje, presionar ENTER" onKeyPress={ this.sendMessage } />
                            </div>
                        </div>
                    </div>
                </div>
                { this.state.haveAdminPanel ?
                <div id="divAdminPanel" className="adminPanel">
                    <UserList users={this.state.users} />
                </div>
                : '' }

            </div>
        )
    }
});

ReactDOM.render(
    <ChatContainer />,
    document.getElementById('divChatWrapper')
);
