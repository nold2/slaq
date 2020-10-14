# Slaq (It's not Slack)

A P2P `chat app` based on web technologies built on `electron`

There are two instances of the app that is available based on `Object Oriented Javascript` and `Functional Programming Elm`

Features for both Stacks (As of 14/10/2020):
- Login with a *name* and a *port* number 
- Send chat
- Change room (by port number)

Available port numbers through the `ws-server` is `8989` and `9898`

### To get started you can clone this project:
```bash
git clone https://github.com/nold2/slaq.git

cd slaq

cd Elm && npm install 

cd Javascript && npm install 

# for linux users
cd .. && npm start 

# for docker users
cd .. && npm start:docker
```
