port module Port.Socket exposing
    ( connectToSocket
    , isConnected
    , messageReceiver
    , sendMessage
    )


port connectToSocket : String -> Cmd msg


port isConnected : (Bool -> msg) -> Sub msg


port sendMessage : String -> Cmd msg


port messageReceiver : (String -> msg) -> Sub msg
