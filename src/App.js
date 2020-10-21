import React from 'react';
import './App.css';
import {Menu} from "./components/Menu";
import {Route, BrowserRouter} from "react-router-dom";
import {Pages} from "./pages/Pages";

function App() {
  return (
      <div className="container-fluid">
          <BrowserRouter>
            <div className="row">
              <Menu/>
              <div className="col-9">
                  <Route exact path="/" render={()=>"CMS"}/>
                  <Route exact path="/pages/" render={()=><Pages/>}/>
                  <Route exact path="/pages/addPage" render={()=>"Страница добавлнения страниц"}/>
              </div>
            </div>
          </BrowserRouter>
      </div>
  );
}

export default App;
