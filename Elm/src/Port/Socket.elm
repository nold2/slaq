port module Port.Socket exposing
    ( connectToSocket
    , isConnected
    , receiveMessage
    , sendMessage
    )

import Json.Decode exposing (Value)


port connectToSocket : String -> Cmd msg


port isConnected : (Bool -> msg) -> Sub msg


port sendMessage : String -> Cmd msg


port receiveMessage : (Value -> msg) -> Sub msg
