port module Port.Socket exposing
    ( connectToSocket
    , isConnected
    , messageReceiver
    , openConnection
    , sendMessage
    )


port connectToSocket : String -> Cmd msg


port openConnection : String -> String -> Cmd msg


port isConnected : Cmd msg


port sendMessage : String -> Cmd msg


port messageReceiver : (String -> msg) -> Sub msg
