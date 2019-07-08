# Codeu React Project - Team 53

Forked from [this repository](https://github.com/fluffysheep-codeu/codeu-react-starter/)

## Running the Client-Server Locally

You will need two terminal to run this project.

Run these commands in the first terminal:

```
cd server

# Starts a local appengine server on localhost:8080
mvn appengine:devserver
```

Run these commands in a second terminal:

```
cd client

# Installs any missing modules.
npm install

# Starts the React server on localhost:3000
npm start

```

## Making Changes

1. Any changes to javascript files under client/src will be hot reloaded. This means changing UI elements through javascript will automatically appear on your local web page.

2. Any changes to java files must be recompiled by Maven. This means you must re-run `mvn appengine:devserver` from the server folder. You _DO NOT_ need to rerun the client if a Java file is changed.

3. Client and server can be run and stopped independently so you usually don't need to kill both processes during development. You will need 2 terminals open for typical development.

## Typical Development Cycle

1. Start the Appengine devserver.
2. Start the React client and open http://localhost:3000
3. Make changes to javascript files and check the React client.
4. Make changes to java files and re-compile the Appengine devserver.
5. Test changes on http://localhost:3000 to see if the server changes worked. Your changes won't show up on localhost:8080 because the server is running ui-less.

## Useful Tools

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
- Java formatter, run from top level directory `java -jar googleformatter.jar --replace $(git ls-files|grep \.java$)`
