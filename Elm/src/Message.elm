module Message exposing (Message, decode, init, parseError)

import Json.Decode as Decode exposing (Decoder, Value)
import Json.Decode.Pipeline exposing (required)


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
