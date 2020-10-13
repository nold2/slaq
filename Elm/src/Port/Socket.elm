port module Port.Socket exposing
    ( connectToSocket
    , isConnected
    , receiveMessage
    , sendMessage
    )


port connectToSocket : String -> Cmd msg


port isConnected : (Bool -> msg) -> Sub msg


port sendMessage : String -> Cmd msg


port receiveMessage : (String -> msg) -> Sub msg
