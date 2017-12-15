#https://www.lfd.uci.edu/%7Egohlke/pythonlibs/#pymssql
#https://github.com/cybergrind/pymssql/releases/tag/2.2.0.dev0
#https://github.com/ramiro/freetds/releases
import tornado.web
import tornado.websocket
import tornado.httpserver
import tornado.ioloop
from tornado import gen
#from tornado.options import define, options, parse_command_line

#define("--setup", default="True")

import json
from datetime import datetime
import os, sys,logging
#from logHandler import BufferingSMTPHandler

#log.basicConfig(filename='log.txt', level=log.DEBUG, format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p')
#formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
#log.info("SERVER STARTING")

#from logHandler import BufferingSMTPHandler
#logMailer = logging.getLogger('pySGPChat-MailLogger')
#logMailer.setLevel(logging.DEBUG)
#logMailer.addHandler(BufferingSMTPHandler())
"""
def setup_logger(logger_name="pySGPChat-Logger", log_file="log.txt", level=logging.DEBUG, theType=0):
    if theType == 1:
        from logHandler import BufferingSMTPHandler
        l = logging.getLogger(logger_name)
        l.setLevel(logging.DEBUG)
        l.addHandler(BufferingSMTPHandler())
        return

    l = logging.getLogger(logger_name)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    fileHandler = logging.FileHandler(log_file, mode='w')
    fileHandler.setFormatter(formatter)

    l.setLevel(level)
    l.addHandler(fileHandler)
#"""

"""
logger = logging.getLogger('pySGPChat-Logger')
logger.setLevel(logging.DEBUG)

ch = logging.FileHandler(filename="log.txt")
ch.setLevel(logging.DEBUG)

formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)

logger.addHandler(ch)

logger.info("SERVER STARTING!!! and sending Email") #"""
"""
setup_logger()
setup_logger("pySGPChat-MailLogger", theType=1)

logger = logging.getLogger("pySGPChat-Logger")
logMailer = logging.getLogger("pySGPChat-MailLogger")

logger.info("latest SERVER STARTING!!! and sending Email")
logMailer.info("latest BOTH LOGGER RUN!!!")
#"""


pySGPChatMSSQLHost = os.environ.get("pySGPChatMSSQLHost")
pySGPChatMSSQLUsr = os.environ.get("pySGPChatMSSQLUsr")
pySGPChatMSSQLPwd = os.environ.get("pySGPChatMSSQLPwd")
pySGPChatPORT = os.environ.get("pySGPChatPORT")
pySGPChatIP = os.environ.get("pySGPChatIP")
pySGPChatMSSQLDB = os.environ.get("pySGPChatMSSQLDB")

#-------------------------------------------------- BEGIN [DEV MODE] - (19-10-2017 - 11:00:51) {{
#import tornado.wsgi
import argparse
#-------------------------------------------------- END   [DEV MODE] - (19-10-2017 - 11:00:51) }}

#-------------------------------------------------- BEGIN [support for MSSQL] - (20-11-2017 - 10:41:12) {{
import pymssql
#import _mssql
#import uuid
#import decimal
#-------------------------------------------------- END   [support for MSSQL] - (20-11-2017 - 10:41:12) }}

#-------------------------------------------------- BEGIN [producction] - (04-12-2017 - 14:21:01) {{
"""
from tornado.platform.twisted import TwistedIOLoop
from twisted.internet import reactor
TwistedIOLoop().install() #"""
#-------------------------------------------------- END   [producction] - (04-12-2017 - 14:21:01) }}



class User(dict):
    def __init__(self):
        #dict.__init__(self)
        in_UsuarioID = 0
        vc_DNI = ""
        vc_Nombre = ""
        vc_ApePaterno = ""
        vc_ApeMaterno = ""
        vc_Usuario = ""
        vc_Clave = ""
        in_PerfilID = 0
        in_SedeID = 0
        in_CampaniaID = 0
        dt_FecRegistro = ""
        in_UsuRegistroID = 0
        in_Estado = 0
        vc_Correo = ""
        vc_ClaveCorreo = ""
        EstadoConexion = False
        avatar = ""

    #def __repr__(self):
        #return json.dumps(self.__dict__)

"""
try:
    if len(sys.argv) > 1:
        pySGPChatMSSQLHost = sys.argv[1]
        pySGPChatMSSQLUsr = sys.argv[2]
        pySGPChatMSSQLPwd = sys.argv[3]
        pySGPChatMSSQLDB = sys.argv[4]
        pySGPChatPORT = sys.argv[5]
        print("success retrieve args from cli")
        print("pySGPChatMSSQLHost: %s" % pySGPChatMSSQLHost,"pySGPChatMSSQLUsr: %s" %pySGPChatMSSQLUsr, "pySGPChatMSSQLPwd: %s " % pySGPChatMSSQLPwd,"pySGPChatMSSQLDB: %\n\ns " % pySGPChatMSSQLDB, "pySGPChatPORT: %s" % pySGPChatPORT)
except Exception as e:
    print("fail retrieving cli args")

#"""

global cnx
cnx = None
config = dict(
            DEBUG=True,
            #DEBUG=False,
            SECRET_KEY="MyTrueSecretAppKey",
            DB_HOST="localhost",
            DB_PORT=28015,
            DB_NAME="pyBOT",
            DB_TABLES=["botChat", "botActions", "botConfig", "botScripts", "botUsers"],
        )

try:
    print("TRY CONNECT AT STARTUP!!!")
    cnx = pymssql.connect(pySGPChatMSSQLHost,pySGPChatMSSQLUsr,pySGPChatMSSQLPwd,pySGPChatMSSQLDB, as_dict=True)
    print("CONNECTED AT STARTUP!!!",cnx)
except Exception as e:
    print("FAIL TRY CONNECTION AT STARTUP!!!\n")
    pass

users = []
supervisors = []
allPerss = []

@gen.coroutine
def getUsers():
    cur = cnx.cursor()
    cur.execute("select *, case in_PerfilID when 1 then 'Adm' when 2 then 'Ase' when 3 then 'Sup' when 4 then 'Cli' end as [avatar] from TB_USUARIO union  select 0, '', 'ENVIAR A TODOS', '','','','',0,0,0,'',0,0,'','',1, ''")
    rows = cur.fetchall()

    for u in rows:
        user = User()
        user.in_UsuarioID = u["in_UsuarioID"]
        user.vc_DNI = u["vc_DNI"]
        user.vc_Nombre = u["vc_Nombre"]
        user.vc_ApePaterno = u["vc_ApePaterno"]
        user.vc_ApeMaterno = u["vc_ApeMaterno"]
        user.vc_Usuario = u["vc_Usuario"]
        user.vc_Clave = u["vc_Clave"]
        user.in_PerfilID = u["in_PerfilID"]
        user.in_SedeID = u["in_SedeID"]
        user.in_CampaniaID = u["in_CampaniaID"]
        user.dt_FecRegistro = u["dt_FecRegistro"].isoformat()
        user.in_UsuRegistroID = u["in_UsuRegistroID"]
        user.in_Estado = u["in_Estado"]
        user.vc_Correo = u["vc_Correo"]
        user.vc_ClaveCorreo = u["vc_ClaveCorreo"]
        user.EstadoConexion = u["EstadoConexion"]
        user.avatar = u["avatar"]
        allPerss.append(user)
        if u["in_PerfilID"] == 1 or u["in_UsuarioID"] == 0:
            supervisors.append(user)
        else:
            users.append(user)

@gen.coroutine
def tryCreateChatTable():
    sql = """
                create table tChat(
                        id int primary key identity,
                        userIDSRC int foreign key references TB_USUARIO(in_UsuarioID),
                        userIDDST int foreign key references TB_USUARIO(in_UsuarioID),
                        [message] varchar(max),
                        [type] varchar(3),
                        ins datetime default getdate(),
                    ) """
    try:
        cur = cnx.cursor()
        cur.execute(sql)
        cnx.commit()
        print("Table tChat created!!!")
    except Exception as e:
        print("Table tChat already exists!!!")
        #print(str(e))

@gen.engine
def func(*args, **kwargs):
    for _ in range(5):
        yield gen.Task(async_function_call, arg1, arg2)

    return

class BaseHandler(tornado.web.RequestHandler):
    def write_error(self, status_code, **kwargs):
        if status_code in [403, 404, 500, 503]:
            self.write('Error %s' % status_code)
        else:
            self.write('BOOM!')

#class My404Handler(tornado.web.ErrorHandler, BaseHandler):
class My404Handler(tornado.web.RequestHandler):
    """
    def prepare(self):
        #self.set_status(404)
        #self.render("404.html")
        pass #"""
    #"""
    def write_error(self, status_code, **kwargs):
        print('In get_error_html. status_code: %d ' % status_code)
        if status_code in [403, 404, 500, 503]:
            self.write('Error %s' % status_code)
        else:
            self.write('BOOM!') #"""
    #"""
    def prepare(self):
        print ('In prepare...')
        raise Exception('Error!') #"""
    #pass

@gen.coroutine
def websocketManager(self, request):
    data = json.loads(request)

    action = data['0']

    if action == "new message":
        data = data["1"]

        sql = ""
        auxArrayToSendMessages = []
        if data["userIDDST"] == 0:
            sql = """insert into tChat(userIDSRC, userIDDST, message, [type]) values """
            for u in allPerss:
                if u.in_UsuarioID != int(self.session["in_UsuarioID"]) and u.in_UsuarioID != 0:
                    auxArrayToSendMessages.append(u.in_UsuarioID)
                    sql +=  """ (%(in_UsuarioID)s, %(userIDDST)s, '%(message)s', 'out'), (%(userIDDST)s, %(in_UsuarioID)s, '%(message)s', 'in'),""" % {"in_UsuarioID":self.session["in_UsuarioID"], "userIDDST": u.in_UsuarioID, "message": data["message"].replace('"','\\"').replace("'","''")}
            sql = sql[:-1]

        else:
            auxArrayToSendMessages.append(data["userIDDST"])
            sql = """ insert into tChat(userIDSRC, userIDDST, message, [type]) values (%(in_UsuarioID)s, %(userIDDST)s, '%(message)s', 'out'), (%(userIDDST)s, %(in_UsuarioID)s, '%(message)s', 'in') """ % {"in_UsuarioID":self.session["in_UsuarioID"], "userIDDST": data["userIDDST"], "message": data["message"].replace('"','\\"').replace("'","''")}

        cur = cnx.cursor()

        print("\nsql: [%s]\n" % sql)
        cur.execute(sql)
        try:
            cnx.commit()
        except Exception as e:
            pass


        chatMessage = {"message":data["message"], "ins":str(datetime.now().strftime("%H:%M:%S")) , "userIDDST":data["userIDDST"], "type":"out"}
        payload = {"event":"new chat","data": chatMessage}
        self.write_message(payload)



        chatMessage["type"] = "in"

        try:
            for u in auxArrayToSendMessages:
                chatMessage["userIDDST"] = int(self.session["in_UsuarioID"])
                payload = {"event":"new chat","data": chatMessage}
                connectionsDict[u].write_message(payload)
        except Exception as e:
            print(str(e))

        """"

        chatMessage = {"message":data["message"], "ins":str(datetime.now().strftime("%H:%M:%S")) , "userIDDST":data["userIDDST"], "type":"out"}

        payload = {"event":"new chat","data": chatMessage}
        self.write_message(payload)

        chatMessage["type"] = "in"
        chatMessage["userIDDST"] = int(self.session["in_UsuarioID"])
        payload = {"event":"new chat","data": chatMessage}
        connectionsDict[data["userIDDST"]].write_message(payload)
        """


        #"""
        print(">>> end create_chat")
    elif action == "get chat for this user":
        data = data["1"]
        sql = """ select id, userIDSRC as [src], userIDDST as [dst], [message] as [message], convert(varchar(10),ins, 108) as [ins], [type] as [type] from tChat where userIDSRC = %d and userIDDST = %d and convert(char(8),ins,112) = convert(char(8), getdate(), 112) """ % (int(self.session["in_UsuarioID"]), int(data["userIDDST"]))
        print("sql: [%s]" % sql)
        cur = cnx.cursor()
        cur.execute(sql)
        chats = cur.fetchall()
        auxChats = []
        auxObj = []
        for chat in chats:
            auxChats.append(chat)
        auxObj = {"messages":auxChats, "userIDDST":int(data["userIDDST"])}
        payload = {"event":"chat for user", "data": auxObj }
        self.write_message(payload)

connectionsDict = {}

class Serializer(object):
    @staticmethod
    def serialize(object):
        return json.dumps(object, default=lambda o: o.__dict__.values()[0])

def serialize(obj):
    if isinstance(obj, date):
        serial = obj.isoformat()
        return serial

    if isinstance(obj, time):
        serial = obj.isoformat()
        return serial

    return obj.__dict__

class WebSocketHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        """ in_UsuarioID vc_Nombre vc_Apellidos vc_Usuario in_PerfilID vc_Perfil """

        cookie = ""
        try:
            for c in self.request.headers.get("Cookie","").split("; "):
                if not c.strip().startswith("ASP.NET"):
                    cookie = c.strip()

            cookie = cookie[cookie.find("=")+1:]

            self.session = {x.split('=')[0]:x.split('=')[1] for x in cookie.split("&")}

            auxUsers = []
            if self.session["in_PerfilID"] == "1":
                auxUsers = [ u.__dict__ for u in allPerss if u.in_UsuarioID != int(self.session["in_UsuarioID"])]
            elif self.session["in_PerfilID"] == "2":
                auxUsers = [ u.__dict__ for u in supervisors ]

            for u in allPerss:
                print(u.in_UsuarioID, u.vc_Nombre)

            payload = {"event":"only for admins","data": auxUsers}
            self.write_message(payload)
        except Exception as e:
            print(str(e))

        setUserConnectionState(int(self.session["in_UsuarioID"]), "connected")

        connectionsDict.update({int(self.session["in_UsuarioID"]): self})
        print(len(connectionsDict))

    def on_message(self, request):
        print(request)
        websocketManager(self, request)

    def on_close(self):
        try:
            print("onClose [%s]" % self.session["in_UsuarioID"])
            connectionsDict.pop(int(self.session["in_UsuarioID"]))
            setUserConnectionState(int(self.session["in_UsuarioID"]), "disconnected")
        except Exception as e:
            print(str(e))
            pass

    def check_origin(self, origin):
        #parsed_origin = urllib.parse.urlparse(origin)
        #return parsed_origin.netloc.endswith(".mydomain.com")
        return True

@gen.coroutine
def setUserConnectionState(id, state):
    data = { "userIDDST":  id, "state": state}
    payload = {"event":"set user connection state","data": data}

    for i,c in connectionsDict.items():
        if i != id:
            c.write_message(payload)

def obj_dict(obj):
    return obj.__dict__

#json_string = json.dumps(userList, default=obj_dict)

class SendJavascript(tornado.web.RequestHandler):
    @gen.coroutine
    def get(self):
        try:
            with open('lib/static/js/chat/chatCORS.js', 'rb') as jsFile:
            #with open('lib/static/js/chat/chatCORS.min.js', 'rb') as jsFile:
                auxDomain = pySGPChatIP
                if auxDomain == "0.0.0.0":
                    auxDomain = "localhost"
                data = jsFile.read().replace(b"xxPORTxx", bytes(pySGPChatPORT.encode("utf8"))).replace(b"xxIPxx",bytes(auxDomain.encode("utf8")))
                self.write(data)
            self.finish()
        except Exception as e:
            raise e
#&#x274C; and &#x274E;
#&#10006;
class SendCSS(tornado.web.RequestHandler):
    @gen.coroutine
    def get(self):
        try:
            self.set_header('Content-type', 'text/css')
            with open('lib/static/css/chat/chatCORS.min.css', 'rb') as cssFile:
                data = cssFile.read()
                self.write(data)
            self.finish()
        except Exception as e:
            raise e

@gen.coroutine
def get(self):
    file_name = 'file.dat'
    buf_size = 4096
    self.set_header('Content-Type', 'application/octet-stream')
    self.set_header('Content-Disposition', 'attachment; filename=' + file_name)
    with open(file_name, 'r') as f:
        while True:
            data = f.read(buf_size)
            if not data:
                break
            self.write(data)
    self.finish()

class Application(tornado.web.Application):
    def __init__(self):
        """
        import tornado.autoreload
        tornado.autoreload.start()
        for dir, _, files in os.walk('static'):
            print(files)
            [tornado.autoreload.watch(dir + '/' + f) for f in files if not f.startswith('.')] #"""

        current_dir = os.path.dirname(os.path.abspath('__file__'))
        static_folder = os.path.join(current_dir, "static")

        settings = {
            "cookie_secret": "__myKEY:_MDY_BPO_pySGPChat_APP__",
            "login_url": "/login",
            "xsrf_cookies": True,
            "static_path": os.path.join(os.path.dirname('__file__'), "static"),
            'template_path': 'templates'
            ,'debug': True,
            'autorealod': True,
            'default_handler_class':My404Handler,
            'default_handler_Args':dict(status_code=404)
        }

        handlers = [
            (r'/initChat', SendJavascript),
            (r'/preloadChat', SendCSS),
            (r'/websocket', WebSocketHandler),
        ]

        tornado.web.Application.__init__(self, handlers, **settings)

@gen.coroutine
def connectToDB():
    try:
        data = "pySGPChatMSSQLHost: %s" % pySGPChatMSSQLHost,"pySGPChatMSSQLUsr: %s" %pySGPChatMSSQLUsr, "pySGPChatMSSQLPwd: %s " % "*********","pySGPChatMSSQLDB: %s " % pySGPChatMSSQLDB
        print("\n(connectToDB) TRY CONNECTION!!!","\nwith params:\n", data, "\n")
        with open("debug.txt", 'a') as f:
            f.write(str(data))
        global cnx
        try:
            #cnx = pymssql.connect(pySGPChatMSSQLHost+"\\SQLEXPRESS",pySGPChatMSSQLUsr,pySGPChatMSSQLPwd,pySGPChatMSSQLDB, as_dict=True)
            cnx = pymssql.connect(pySGPChatMSSQLHost,pySGPChatMSSQLUsr,pySGPChatMSSQLPwd,pySGPChatMSSQLDB, as_dict=True)
        except Exception as e:
            cnx = pymssql.connect(pySGPChatMSSQLHost,pySGPChatMSSQLUsr,pySGPChatMSSQLPwd,pySGPChatMSSQLDB, as_dict=True)
        print("CONNECTED!!!",cnx)

    except Exception as e:
        print("FAIL CONNECTION\n")

#@gen.coroutine
def runserver(serviceMode=False, debugMode=False, autoloadMode=False, args=None):
    global cnx
    if serviceMode:
        connectToDB()
    elif autoloadMode:
        pass
    elif debugMode:
        cnx = pymssql.connect("localhost\\SQLEXPRESS","sa","123456","BD_DESCARTE_AT_18102017", as_dict=True)

    print("\n\nHERE", cnx,"\n")
    if cnx is not None:
        print("CNX IS NOT NONE", cnx)
        tryCreateChatTable()
        getUsers()

        ws_app = Application()

        print("\n\n Server LISTEN IN THE ->  IP/PORT: [%s]:[%s]\n\n" % (pySGPChatIP, pySGPChatPORT))

        #""" ### Ready work
        server = tornado.httpserver.HTTPServer(ws_app)
        #server.listen(pySGPChatPORT, address="0.0.0.0") ### omit address """
        #server.listen(pySGPChatPORT, address="10.200.37.124") ### omit address """
        server.listen(pySGPChatPORT, address=pySGPChatIP) ### omit address """

        """
        server = tornado.httpserver.HTTPServer(ws_app, ssl_options={"certfile": "domain.crt", "keyfile": "domain.key",})
        server.listen(443, address="0.0.0.0") #"""

        tornado.ioloop.IOLoop.instance().start() #"""
        #reactor.run()
    else:
        print("\n\nNEVER RUN  PASS!!!\n\n")

def main():
    #parse_command_line()
    parser = argparse.ArgumentParser(description="pySGPChat Configurator")
    parser.add_argument("--setup", dest="run_setup", action="store_true")
    parser.add_argument("--host", dest="pySGPChatMSSQLHost")
    parser.add_argument("--db", dest="pySGPChatMSSQLDB")
    parser.add_argument("--usr", dest="pySGPChatMSSQLUsr")
    parser.add_argument("--pwd", dest="pySGPChatMSSQLPwd")
    parser.add_argument("--port", dest="pySGPChatPORT")
    parser.add_argument("--ip", dest="pySGPChatIP")
    args = parser.parse_args()
    globals().update(vars(args))

    if args.run_setup:
        try:
            print("RUN SERVICE MODE\n")
            print("SETUP: >>>>>>>>>>>>>>>>>>>",args.run_setup)
            print("HOST: >>>>>>>>>>>>>>>>>>>",args.pySGPChatMSSQLHost)
            print("DB: >>>>>>>>>>>>>>>>>>>",args.pySGPChatMSSQLDB)
            print("USR: >>>>>>>>>>>>>>>>>>>",args.pySGPChatMSSQLUsr)
            print("PWD: >>>>>>>>>>>>>>>>>>>",args.pySGPChatMSSQLPwd)
            print("IP: >>>>>>>>>>>>>>>>>>>",args.pySGPChatIP)
            print("PORT: >>>>>>>>>>>>>>>>>>>",args.pySGPChatPORT)

            data = "pySGPChatMSSQLHost: %s" % pySGPChatMSSQLHost,"pySGPChatMSSQLUsr: %s" %pySGPChatMSSQLUsr, "pySGPChatMSSQLPwd: %s " % "*********","pySGPChatMSSQLDB: %s " % pySGPChatMSSQLDB, "pySGPChatIP %s" % pySGPChatIP , "pySGPChatPORT %s" % pySGPChatPORT
            print("PRINT BEFORE ALL!!!",data)
            with open("data.txt", 'a') as f:
                f.write(str(data))

            runserver(serviceMode=True, args=args)
            #tornado.ioloop.IOLoop.current().run_sync(init_db)
        except Exception as e:
            print("FAIL START APP IN SERVICE MODE",str(e))
    elif config['DEBUG']:
        print("RUN DEV ENVIRONMENT")
        #python app.py --setup --host localhost\\SQLEXPRESS --db BD_DESCARTE_AT_18102017 --usr sa --pwd 123456 --ip 0.0.0.0 --port 8888
        args.pySGPChatPORT="8888"
        args.pySGPChatIP="0.0.0.0"
        globals().update(vars(args))
        runserver(debugMode=True)
    elif cnx is not None:
        print("RUN AUTOLOAD-PRODUCTION MODE")
        runserver(autoloadMode=True)

if __name__ == '__main__':
    main()
