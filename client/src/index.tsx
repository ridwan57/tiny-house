import React from "react";
import { render } from "react-dom";
import { Home, Listings, NotFound, Host, Listing, User } from "./sections";
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './styles/index.css'

import * as serviceWorker from "./serviceWorker";
const client = new ApolloClient({
    uri: 'http://localhost:9000/api'
})
const App = () => {
    return <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/host" component={Host} />
            <Route exact path="/listing/:id" component={Listing} />
            <Route exact path="/listings/:location?" component={Listings} />
            <Route exact path="/user/:id" component={User} />
            <Route component={NotFound} />
        </Switch>
    </Router>
}

render(
    <>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </>
    , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
