var ChatMessage = React.createClass({
    render: function (){
        return(
            <div>
                <p>paragraph-mode {this.props.message}</p>
            </div>
        );
    }
});

var MessageList = React.createClass({
    render: function(){
        var messages = this.props.messages.map(function(message){
            return <ChatMessage message={message} />;
        });
        return (
            <div>{messages}</div>
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
            <div id="divChatContainner" className="chatContainner">

                <div className="chatHistory">
                    <ul id="ulChatList">
                        <ChatMessage message={"test"} />
                    </ul>
                </div>
                <div className="chatMessage">
                    <input type="text" id="txtMessage" placeholder="Ingresar mensaje, presionar ENTER" onKeyPress={ this.sendMessage } />
                </div>
            </div>
        )
    }
});

ReactDOM.render(
    <ChatContainer />,
    document.getElementById('divChatWrapper')
);
