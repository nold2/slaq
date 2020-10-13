module Main exposing (..)

import Browser
import Html exposing (Html, a, div, footer, form, h1, h3, input, label, main_, span, text)
import Html.Attributes exposing (class, for, id, name, required, type_, value)
import Html.Events exposing (onClick, onInput, onSubmit)
import Platform.Sub exposing (batch)
import Port.Socket
    exposing
        ( connectToSocket
        , isConnected
        , receiveMessage
        , sendMessage
        )


type alias Form =
    { userName : String
    , userPort : String
    , message : String
    }


type alias Model =
    { isConnected : Bool
    , messages : List String
    , form : Form
    }


type Msg
    = EnteredUserName String
    | EnteredUserPort String
    | SubmittedForm
    | ConfirmConnection Bool
    | EnteredMessage String
    | SendMessage
    | ReceiveMessage String


init : () -> ( Model, Cmd Msg )
init _ =
    ( { isConnected = False
      , messages = [ "" ]
      , form =
            { userName = ""
            , userPort = ""
            , message = ""
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

        EnteredMessage message ->
            ( updateForm (\form -> { form | message = message }) model, Cmd.none )

        SubmittedForm ->
            ( model, connectToSocket model.form.userPort )

        ConfirmConnection val ->
            ( { model | isConnected = val }, Cmd.none )

        SendMessage ->
            ( model, sendMessage model.form.message )

        ReceiveMessage message ->
            let
                new =
                    updateForm (\form -> { form | message = "" }) model
            in
            ( { new | messages = List.append model.messages [ message ] }
            , Cmd.none
            )


updateForm : (Form -> Form) -> Model -> Model
updateForm transform model =
    { model | form = transform model.form }


view : Model -> Html Msg
view model =
    if model.isConnected then
        chatView model

    else
        loginView model


chatView : Model -> Html Msg
chatView model =
    let
        messagesView =
            List.map (\msg -> div [ class "bubble" ] [ text msg ]) model.messages
    in
    div [ class "chat__container" ]
        [ div [ class "top_nav" ]
            [ div [ class "greetings__container" ]
                [ h3 [ id "greetings", class "greetings-name" ] [ text model.form.userName ]
                , span [ class "greetings-connection" ] []
                ]
            , span [ class "logout" ] [ text "Logout" ]
            ]
        , div [ id "chat-window", class "chat-window" ] messagesView
        , form [ id "send-chat", class "chat-box__container", onSubmit SendMessage ]
            [ label [ for "chat-box" ] []
            , input
                [ type_ "text"
                , name "chat-box"
                , id "chat-box"
                , class "chat-box__input"
                , value model.form.message
                , onInput EnteredMessage
                ]
                []
            , input
                [ type_ "submit"
                , value "submit"
                , class "chat-submit__button"
                ]
                []
            ]
        ]


loginView : Model -> Html Msg
loginView model =
    div []
        [ main_ [ class "login__container" ]
            [ h1 [] [ text "Login to Slaq" ]
            , div [ class "login__box" ]
                [ form []
                    [ div []
                        [ label [ for "name" ] [ text "Enter your name:" ]
                        , input
                            [ id "name"
                            , class "input_text"
                            , value model.form.userName
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
                            , value model.form.userPort
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
                        , onClick SubmittedForm
                        , onSubmit SubmittedForm
                        ]
                        [ text "Login!" ]
                    ]
                ]
            ]
        , footer [ class "footer" ]
            [ a [] [ text "About us " ]
            , a [] [ text "Privacy & Terms" ]
            , a [] [ text "Contact Us" ]
            ]
        ]


subscriptions : Model -> Sub Msg
subscriptions _ =
    batch
        [ isConnected ConfirmConnection
        , receiveMessage ReceiveMessage
        ]


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
