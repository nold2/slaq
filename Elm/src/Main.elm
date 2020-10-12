module Main exposing (..)

import Browser
import Html exposing (Html, div, form, input, label, text)
import Html.Attributes exposing (for, id, name, type_, value)
import Html.Events exposing (onInput, onSubmit)


type alias Form =
    { userName : String
    , userPort : String
    }


type alias Model =
    { form : Form }


type Msg
    = EnteredUserName String
    | EnteredUserPort String
    | SubmittedForm


init : () -> ( Model, Cmd Msg )
init _ =
    ( { form =
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
            ( model, Cmd.none )


updateForm : (Form -> Form) -> Model -> Model
updateForm transform model =
    { model | form = transform model.form }


view : Model -> Html Msg
view _ =
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
        ]


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
