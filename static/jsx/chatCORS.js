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

var User = React.createClass({
    render: function(){
        return (
            <div className="user">
                <div>
                    <span>
                        {this.props.user}
                    </span>
                </div>
            </div>
        );
    }
});

var UserList = React.createClass({
    render: function(){
        var users = this.props.users.map(function(user){
            return <User user={user} />;
        });
        return (
            <div> {users} </div>
        );
    }
});

var AdminPanel = React.createClass({
    render: function(){
        return (
            <div>
                <div className="adminPanel">
                    <h1>in Admin Panel</h1>
                    <UserList users={this.props.users} />
                </div>
            </div>
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
            chatList.innerHTML = chatList.innerHTML +  "<li class='chat'>" + data.name + " - " + data.message + "</li>";
        }else if (event == "only for admins"){

            var users = ["a","b","c"];
            ReactDOM.render(
                <AdminPanel users={users} />,
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
            <div className="chatPanel">
                <div>
                <div>
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
                <div id="divAdminPanel">
                </div>
            </div>
        )
    }
});

ReactDOM.render(
    <ChatContainer />,
    document.getElementById('divChatWrapper')
);
