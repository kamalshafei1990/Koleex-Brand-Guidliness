import os, http.server, socketserver
os.chdir(os.path.dirname(os.path.abspath(__file__)))
socketserver.TCPServer(("", 8080), http.server.SimpleHTTPRequestHandler).serve_forever()