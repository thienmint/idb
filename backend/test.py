import MYSQLdb
"""
db = MYSQLdb.connect(host="db.esportguru.com", 
					 user="persia", 
					 passwd="bigboss",
					 db="devDB")

cur = db.cursor()

cur.execute("describe PLAYER")

for row in cur.fetchall() : 
	print (row[0])

db.close()
"""