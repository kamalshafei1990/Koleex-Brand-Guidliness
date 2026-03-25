require 'webrick'
server = WEBrick::HTTPServer.new(
  Port: 8080,
  DocumentRoot: '/Users/kamalshafei/Desktop/Koleex Brand Guidliness'
)
trap('INT') { server.shutdown }
server.start