import  React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import Repositorio from './pages/Repositorio';
import Main from './pages/Main';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                {/*a rota esta recebendo um parametro*/}
                <Route exact path="/repositorio/:repositorio" component={Repositorio}/>
                <Route exact path="/" component={Main}/>
            </Switch>
        </BrowserRouter>
    );

}


/* 
import Main from './pages/Main';
 <Routes exact path="/" components={Main}/>
*/