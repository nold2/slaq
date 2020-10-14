module Message exposing (Message, decode, encode, init, parseError)

import Json.Decode as Decode exposing (Decoder, Value)
import Json.Decode.Pipeline exposing (required)
import Json.Encode as Encode exposing (Value)


type alias Message =
    { user : String, time : String, content : String }


init : Message
init =
    { user = "", time = "", content = "" }


parseError : String -> Message
parseError errormessage =
    { user = "Internal decode error", time = "Unknown", content = errormessage }


decode : Decoder Message
decode =
    Decode.succeed Message
        |> required "user" Decode.string
        |> required "time" Decode.string
        |> required "content" Decode.string


encode : Message -> String
encode message =
    Encode.object
        [ ( "user", Encode.string message.user )
        , ( "time", Encode.string message.time )
        , ( "content", Encode.string message.content )
        ]
        |> Encode.encode 0
