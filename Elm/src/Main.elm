module Main exposing (..)

import Browser
import Html exposing (Html, div, form, input, label, text)
import Html.Attributes exposing (for, id, name, type_, value)
import Html.Events exposing (onInput, onSubmit)
import Json.Encode exposing (Value)
import PortFunnel.WebSocket as WebSocket exposing (Response(..))
import PortFunnels exposing (FunnelDict, Handler(..), State)


type alias Form =
    { userName : String
    , userPort : String
    }


type alias Model =
    { isConnected : Bool
    , error : Maybe String
    , log : List String
    , state : State
    , wasLoaded : Bool
    , form : Form
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { isConnected = False
      , error = Nothing
      , log = []
      , state = PortFunnels.initialState
      , wasLoaded = False
      , form =
            { userName = ""
            , userPort = ""
            }
      }
    , Cmd.none
    )


type Msg
    = EnteredUserName String
    | EnteredUserPort String
    | SubmittedForm
    | GetConnection Bool
    | Process Value


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        EnteredUserName userName ->
            ( updateForm (\form -> { form | userName = userName }) model, Cmd.none )

        EnteredUserPort userPort ->
            ( updateForm (\form -> { form | userPort = userPort }) model, Cmd.none )

        SubmittedForm ->
            ( model, send (WebSocket.makeOpen ("ws://localhost:" ++ model.form.userPort)) )

        GetConnection val ->
            ( { model | isConnected = val }, Cmd.none )

        Process value ->
            case
                PortFunnels.processValue funnelDict value model.state model
            of
                Err error ->
                    ( { model | error = Just error }, Cmd.none )

                Ok res ->
                    res


updateForm : (Form -> Form) -> Model -> Model
updateForm transform model =
    { model | form = transform model.form }


getCmdPort : String -> (Value -> Cmd Msg)
getCmdPort moduleName =
    PortFunnels.getCmdPort Process moduleName False


send : WebSocket.Message -> Cmd Msg
send message =
    WebSocket.send (getCmdPort WebSocket.moduleName) message


funnelDict : FunnelDict Model Msg
funnelDict =
    PortFunnels.makeFunnelDict handlers getCmdPort


handlers : List (Handler Model Msg)
handlers =
    [ WebSocketHandler socketHandler
    ]


doIsLoaded : Model -> Model
doIsLoaded model =
    if not model.wasLoaded && WebSocket.isLoaded model.state.websocket then
        { model | wasLoaded = True }

    else
        model


socketHandler : Response -> State -> Model -> ( Model, Cmd Msg )
socketHandler response state initial =
    let
        model =
            doIsLoaded { initial | state = state, error = Nothing }
    in
    case response of
        WebSocket.MessageReceivedResponse { message } ->
            ( { model | log = ("Received \"" ++ message ++ "\"") :: model.log }, Cmd.none )

        WebSocket.ConnectedResponse r ->
            ( { model | log = ("Connected:  " ++ r.description) :: model.log }, Cmd.none )

        WebSocket.ClosedResponse { code, wasClean, expected } ->
            ( { model | log = ("Closed, " ++ closedString code wasClean expected) :: model.log }, Cmd.none )

        WebSocket.ErrorResponse error ->
            ( { model | log = WebSocket.errorToString error :: model.log }, Cmd.none )

        _ ->
            case WebSocket.reconnectedResponses response of
                [] ->
                    ( model, Cmd.none )

                [ ReconnectedResponse r ] ->
                    ( { model | log = ("Reconnected" ++ r.description) :: model.log }, Cmd.none )

                list ->
                    ( { model | log = Debug.toString list :: model.log }, Cmd.none )


closedString : WebSocket.ClosedCode -> Bool -> Bool -> String
closedString code wasClean expected =
    "code: "
        ++ WebSocket.closedCodeToString code
        ++ ", "
        ++ (if wasClean then
                "clean"

            else
                "not clean"
           )
        ++ ", "
        ++ (if expected then
                "expected"

            else
                "not expected"
           )


view : Model -> Html Msg
view model =
    form [ onSubmit SubmittedForm ]
        [ div []
            [ label [ for "username" ] [ text "Enter Your name:" ]
            , input
                [ id "username"
                , name "username"
                , type_ "text"
                , onInput EnteredUserName
                ]
                []
            ]
        , div []
            [ label [ for "user-port" ] [ text "Enter Your port:" ]
            , input
                [ id "user-port"
                , name "user-port"
                , type_ "number"
                , onInput EnteredUserPort
                ]
                []
            ]
        , div []
            [ input
                [ type_ "submit"
                , value "Login!"
                ]
                []
            ]
        , if model.isConnected then
            div [] [ text "Connected" ]

          else
            div [] [ text "disconnected" ]
        ]


subscriptions : Model -> Sub Msg
subscriptions _ =
    PortFunnels.subscriptions Process


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
