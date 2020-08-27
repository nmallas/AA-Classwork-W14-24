import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import PokemonBrowser from './PokemonBrowser';
import ConnectedLogin from "./LoginPanelRedux";
import LoginPanelRedux from './LoginPanelRedux';

const PrivateRoute = ({ component: Component, cProps, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.needLogin === true
      ? <Redirect to='/login' />
      : <Component {...props} {...cProps} />
  )} />
)

class App extends React.Component {
  constructor(props) {
    super(props);
    const authToken = Cookies.get("token");
    let currentUserId;
    if (authToken) {
      try {
        const payload = authToken.split(".")[1];
        const decodedPayload = atob(payload);
        const payloadObj = JSON.parse(decodedPayload);
        const { data } = payloadObj;
        currentUserId = data.id;
      } catch (e) {
        Cookies.remove("token");
      }
    }
    this.state = {
      loaded: false,
      currentUserId,
      needLogin: !currentUserId,
    };
  }

  async componentDidMount() {
    this.setState({ loaded: true });
    this.loadPokemon();
  }

  handleCreated = (pokemon) => {
    this.setState({
      pokemon: [...this.state.pokemon, pokemon]
    });
  }

  async loadPokemon() {
    const response = await fetch(`/api/pokemon`);
    if (response.ok) {
      const pokemon = await response.json();
      this.setState({
        pokemon,
        needLogin: false,
      });
    } else {
      this.setState({
        needLogin: true
      });
    }
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    const cProps = {
      pokemon: this.state.pokemon,
      handleCreated: this.handleCreated,
      currentUserId: this.state.currentUserId
    };
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login"
            component={LoginPanelRedux}/>
          <PrivateRoute path="/"
                        exact={true}
                        needLogin={this.state.needLogin}
                        component={PokemonBrowser}
                        cProps={cProps} />
          <PrivateRoute path="/pokemon/:pokemonId"
                        exact={true}
                        needLogin={this.state.needLogin}
                        component={PokemonBrowser}
                        cProps={cProps} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
