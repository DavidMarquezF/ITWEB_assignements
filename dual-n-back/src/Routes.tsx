import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GridBoard } from "./components/GridBoard/GridBoard";
import { Layout } from "./components/Layout";
import { PrivateRoute } from "./components/PrivateRoute";
import { PlayPage } from "./pages/PlayPage/PlayPage";
import { ScoresPage } from "./pages/ScoresPage/ScoresPage";
import { LoginPage } from './pages/LoginPage/LoginPage';

class Login extends React.Component {
    render() {
      return (
        <div>
          Login
        </div>
      )
    }
  }
export const Routes = ()=> (
    <BrowserRouter>
    <Route render={props =>(
       <Layout {...props}>
            <Switch>
                <Redirect path="/" exact to="/play"/>
                <PrivateRoute path="/play" component={PlayPage} />
                <PrivateRoute path="/scores" component={ScoresPage} />
                <Route path="/login" component={LoginPage} />
                <Route render={() => <div>Not found</div>}/>
            </Switch>
        </Layout>
    )}/>
        
    </BrowserRouter>
);