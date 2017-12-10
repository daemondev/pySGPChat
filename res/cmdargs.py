import sys

try:
    pySGPChatMSSQLHost = sys.argv[1]
    pySGPChatMSSQLUsr = sys.argv[2]
    pySGPChatMSSQLPwd = sys.argv[3]
    pySGPChatMSSQLDB = sys.argv[4]

    for c in sys.argv:
        print(c)

    print("success retrieve args from cli")
    print("pySGPChatMSSQLHost: %s" % pySGPChatMSSQLHost,"pySGPChatMSSQLUsr: %s" %pySGPChatMSSQLUsr, "pySGPChatMSSQLPwd: %s " % pySGPChatMSSQLPwd,"pySGPChatMSSQLDB: %\n\ns " % pySGPChatMSSQLDB)
except Exception as e:
    print("fail retrieving cli args")
