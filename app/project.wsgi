import sys
import os
sys.path.insert(0, '/var/www/html/project')

def application(req_environ, start_response):
    os.environ['DB_USER'] = req_environ['DB_USER']
    os.environ['DB_PASS'] = req_environ['DB_PASS']
    os.environ['DB_HOST'] = req_environ['DB_HOST']
    os.environ['DB_NAME'] = req_environ['DB_NAME']

    from models import app as _application

    return _application(req_environ, start_response)
