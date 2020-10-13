module Main exposing (..)

import Browser
import Html exposing (Html, a, div, footer, form, h1, input, label, main_, text)
import Html.Attributes exposing (class, for, id, name, required, type_, value)
import Html.Events exposing (onInput, onSubmit)
import Port.Socket
    exposing
        ( connectToSocket
        , isConnected
        , messageReceiver
        , sendMessage
        )


type alias Form =
    { userName : String
    , userPort : String
    }


type alias Model =
    { isConnected : Bool, form : Form }


type Msg
    = EnteredUserName String
    | EnteredUserPort String
    | SubmittedForm
    | ConfirmConnection Bool


init : () -> ( Model, Cmd Msg )
init _ =
    ( { isConnected = False
      , form =
            { userName = ""
            , userPort = ""
            }
      }
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        EnteredUserName userName ->
            ( updateForm (\form -> { form | userName = userName }) model, Cmd.none )

        EnteredUserPort userPort ->
            ( updateForm (\form -> { form | userPort = userPort }) model, Cmd.none )

        SubmittedForm ->
            ( model, connectToSocket model.form.userPort )

        ConfirmConnection val ->
            ( { model | isConnected = val }, Cmd.none )


updateForm : (Form -> Form) -> Model -> Model
updateForm transform model =
    { model | form = transform model.form }


view : Model -> Html Msg
view _ =
    main_ [ class "login__container" ]
        [ h1 [] [ text "Login to Slaq" ]
        , div [ class "login__box" ]
            [ form [ onSubmit SubmittedForm ]
                [ div []
                    [ label [ for "name" ] [ text "Enter your name:" ]
                    , input
                        [ id "name"
                        , class "input_text"
                        , name "username"
                        , type_ "text"
                        , required True
                        , onInput EnteredUserName
                        ]
                        []
                    ]
                , div []
                    [ label [ for "port" ] [ text "Enter your port:" ]
                    , input
                        [ id "port"
                        , class "input_text"
                        , name "port"
                        , type_ "number"
                        , required True
                        , onInput EnteredUserPort
                        ]
                        []
                    ]
                ]
            , div []
                [ input
                    [ class "submit__button"
                    , type_ "submit"
                    , value "Login!"
                    ]
                    []
                ]
            ]
        ]



--[ onSubmit SubmittedForm ]
--[ div []
--    [ label [ for "username" ] [ text "Enter Your name:" ]
--    , input
--        [
--        ]
--        []
--    ]
--, div []
--    [ label [ for "user-port" ] [ text "Enter Your port:" ]
--    , input
--        [ id "user-port"
--        , name "user-port"
--        , type_ "number"
--        , onInput EnteredUserPort
--        ]
--        []
--    ]
--, div []
--    [ input
--        [ type_ "submit"
--        , value "Login!"
--        ]
--        []
--    ]
--]


subscriptions : Model -> Sub Msg
subscriptions _ =
    isConnected ConfirmConnection


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
