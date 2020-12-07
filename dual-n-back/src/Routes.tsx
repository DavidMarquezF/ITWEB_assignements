import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GridBoard } from "./components/GridBoard/GridBoard";
import { Layout } from "./components/Layout";
import { PlayPage } from "./pages/PlayPage/PlayPage";

export const Routes = ()=> (
    <BrowserRouter>
    <Route render={props =>(
       <Layout {...props}>
            <Switch>
                <Redirect path="/" exact to="/play"/>
                <Route path="/play" component={PlayPage} />
                <Route render={() => <div>Not found</div>}/>
            </Switch>
        </Layout>
    )}/>
        
    </BrowserRouter>
);