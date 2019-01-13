# Bears-Team-03
Volunteer Manager App | https://volunteer-manager-app2.herokuapp.com/

*We help people to create and apply to volunteering projects*

You can find **more info** about our team and how you can contribute in our [WIKI](https://github.com/chingu-voyage7/Bears-Team-03/wiki "Bears-Team-03 WIKI")

## Local Development

Because this app is made of two npm projects, there are two places to run `npm` commands:

1. **Node API server** at the root `./`
2. **React client** in `client/` directory.

### 1. Run the API server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for Node

```bash
npm install package-name --save
```


### 2. Run the React client

The React app is configured to proxy backend requests to the local Node server.

In a separate terminal from the API server, start the client:

```bash
# Always change directory, first
cd client/

# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for React client

```bash
# Always change directory, first
cd client/

npm install package-name --save
```

## Deploy to Heroku

```bash
git clone https://github.com/chingu-voyage7/Bears-Team-03.git
cd Bears-Team-03/
heroku create
git push heroku master
```

This deployment will automatically:

  * detect [Node buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs)
  * build the app with
    * `npm install` for the Node server
    * `heroku-postbuild` for create-react-app
  * launch the web process with `npm start`
    * serves `../client/build/` as static files
    * customize by adding API, proxy, or route handlers/redirectors

Completed with ❤️ during Voyage-7 of https://chingu.io/
