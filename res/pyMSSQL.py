import pymssql, os
os.environ["FREETDSCONF"] = "C:/freetds.conf"
cnx = pymssql.connect(r"(local)","sa","123456","BD_DESCARTE_AT_18102017", as_dict=True)
cur = cnx.cursor()
cur.execute("select * from TB_USUARIO")
rows = cur.fetchall()
for r in rows:
    print(r)
