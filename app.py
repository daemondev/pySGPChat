#https://www.lfd.uci.edu/%7Egohlke/pythonlibs/#pymssql
#https://github.com/cybergrind/pymssql/releases/tag/2.2.0.dev0
#https://github.com/ramiro/freetds/releases
import tornado.web
import tornado.websocket
import tornado.httpserver
import tornado.ioloop
from tornado import gen

import json
from datetime import datetime
import os

### For RethinkDB
import rethinkdb as r
from rethinkdb import RqlRuntimeError, RqlDriverError
r.set_loop_type("tornado")

#-------------------------------------------------- BEGIN [DEV MODE] - (19-10-2017 - 11:00:51) {{
#import tornado.wsgi
import argparse
#-------------------------------------------------- END   [DEV MODE] - (19-10-2017 - 11:00:51) }}

#-------------------------------------------------- BEGIN [support for MSSQL] - (20-11-2017 - 10:41:12) {{
import pymssql
#-------------------------------------------------- END   [support for MSSQL] - (20-11-2017 - 10:41:12) }}

from datetime import datetime

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

    #def __repr__(self):
        #return json.dumps(self.__dict__)


cnx = pymssql.connect("localhost","sa","123456","BD_DESCARTE_AT_18102017", as_dict=True)

users = []
supervisors = []
allPerss = []

@gen.coroutine
def getUsers():
    cur = cnx.cursor()
    cur.execute("select * from TB_USUARIO")
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
        allPerss.append(user)
        if u["in_PerfilID"] == 1:
            supervisors.append(user)
        else:
            users.append(user)

getUsers()

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
    conn = yield r.connect(host="localhost", port=28015, db='pyBOT')

    if action == "new message":
        data = data["1"]

        cur = cnx.cursor()
        #sql = """ insert into tChat(userIDSRC, userIDDST, message) values () """ % (self.session["in_UsuarioID"], data["userIDDST"], data["message"])
        sql = """ insert into tChat(userIDSRC, userIDDST, message) values (%s, %s, '%s') """ % (self.session["in_UsuarioID"], data["userIDDST"], data["message"])
        print("sql: [%s]" % sql)
        cur.execute(sql)
        cnx.commit()

        data['ins'] = datetime.now(r.make_timezone('00:00'))
        if data.get('name') and data.get('message'):
            new_chat = yield r.table("botChat").insert([ data ]).run(conn)
        print(">>> end create_chat")



connections = set()

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

            payload = {"event":"only for admins","data": auxUsers}

            self.write_message(payload)
        except Exception as e:
            print(str(e))

        cur = cnx.cursor()
        cur.execute("select id, userIDSRC as [src], userIDDST as [dst], [message] as [message], convert(varchar(10),ins, 108) as [ins] from tChat where userIDSRC = %s" % self.session["in_UsuarioID"])
        rows = cur.fetchall()
        messagesList = []
        for m in rows:
            messagesList.append(m)
        #print(messagesList)
        payload = {"event":"populate chat-list", "data": messagesList}
        self.write_message(payload)
        connections.add(self)



        pass

    def on_message(self, request):
        print(request)
        websocketManager(self, request)

    def on_close(self):
        connections.remove(self)
        pass

    def check_origin(self, origin):
        #parsed_origin = urllib.parse.urlparse(origin)
        #return parsed_origin.netloc.endswith(".mydomain.com")
        return True

@gen.coroutine
def watch_chats():
    print('\n#################################\n###>>> Watching db for new chats!\n#################################\n\n')
    conn = yield r.connect(host='localhost', port=28015, db='pyBOT')
    feed = yield r.table("botChat").changes().run(conn)
    union = yield r.union(r.table("botChat").changes(), r.table("botScripts").changes()).run(conn)

    while (yield feed.fetch_next()):
        change = yield feed.next()
        print("\nconexiones WS: %d\n" % len(connections))
        for c in connections:
            change['new_val']['ins'] = str(change['new_val']['ins'])
            payload = {"event":"new chat","data": [ u.__dict__ for u in users ]}
            c.write_message(payload)
        print(change)
        print("watching db CHANGES ############")

def obj_dict(obj):
    return obj.__dict__

#json_string = json.dumps(userList, default=obj_dict)

class SendJavascript(tornado.web.RequestHandler):
    @gen.coroutine
    def get(self):
        try:
            with open('static/js/chat/chatCORS.js', 'rb') as jsFile:
                data = jsFile.read()
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
            with open('static/css/chat/chatCORS.css', 'rb') as cssFile:
                data = cssFile.read()
                self.write(data)
            self.finish()
        except Exception as e:
            raise e

@gen.coroutine
def get(self):
    file_name = 'file.ext'
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

        current_dir = os.path.dirname(os.path.abspath(__file__))
        static_folder = os.path.join(current_dir, "static")

        settings = {
            "cookie_secret": "__myKEY:_MDY_BPO_pySGPChat_APP__",
            "login_url": "/login",
            "xsrf_cookies": True,
            "static_path": os.path.join(os.path.dirname(__file__), "static"),
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

config = dict(
            DEBUG=True,
            SECRET_KEY="MyTrueSecretAppKey",
            DB_HOST="localhost",
            DB_PORT=28015,
            DB_NAME="pyBOT",
            DB_TABLES=["botChat", "botActions", "botConfig", "botScripts", "botUsers"]
        )


@gen.coroutine
def init_db():
    conn = yield r.connect(host=config["DB_HOST"], port=config["DB_PORT"])
    print("CONNECTED TO [%s]" % config["DB_HOST"])
    try:
        yield r.db_create(config["DB_NAME"]).run(conn)
        print("%s - DB [%s] CREATED" % (config["DB_HOST"], config["DB_NAME"]))
        for table in config["DB_TABLES"]:
            yield r.db(config["DB_NAME"]).table_create(table).run(conn)
            print("%s - %s - TABLE [%s] CREATED" % (config["DB_HOST"], config["DB_NAME"], table))
            yield r.db(config["DB_NAME"]).table(table).index_create("ins").run(conn)
            print("%s - %s - %s - INDEX [%s] CREATED\n" % (config["DB_HOST"], config["DB_NAME"], table, "ins"))
        print("\nDATABASE CONFIG SUCCESS\n")
    except RqlRuntimeError as e:
        print(str(e))
    finally:
        conn.close()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="pySGPChat Configurator")
    parser.add_argument("--setup", dest="run_setup", action="store_true")
    args = parser.parse_args()
    if args.run_setup:
        tornado.ioloop.IOLoop.current().run_sync(init_db)
    else:
        ws_app = Application()

        #""" ### Ready work
        server = tornado.httpserver.HTTPServer(ws_app)
        server.listen(80, address="0.0.0.0") ### omit address """
        #server.listen(8000, address="0.0.0.0") ### omit address """

        """
        server = tornado.httpserver.HTTPServer(ws_app, ssl_options={"certfile": "domain.crt", "keyfile": "domain.key",})
        server.listen(443, address="0.0.0.0") #"""

        tornado.ioloop.IOLoop.current().add_callback(watch_chats)
        tornado.ioloop.IOLoop.instance().start() #"""
