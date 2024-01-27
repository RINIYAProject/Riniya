var client = new MesaClient('wss://websocket.riniya.uk', { autoConnect: false })

client.onConnected = function() {
  console.log("Connected to Mesa server")
}
client.onMessage = function(data) {
  switch(data.type) {
    case "PING":
      client.send(0, {}, "PONG")
      break
  }
}

client.onDisconnected = function(code, reason) {
  console.log("Disconnected", code, reason)
}

client.onError = function(error) {
  console.log("Error", error)
}

client.connect()
