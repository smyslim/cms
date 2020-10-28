import React from 'react';
import './App.css';
import {Menu} from "./components/Menu";
import {BrowserRouter, Route} from "react-router-dom";
import {Pages} from "./pages/Pages";
import {AddPage} from "./pages/AddPage";
import {EditPage} from "./pages/EditPage";

function App() {
  return (
      <div className="container-fluid">
          <BrowserRouter>
            <div className="row">
              <Menu/>
              <div className="col-9">
                  <Route exact path="/" render={()=>"CMS"}/> {/*почему здесь exact path, напомнить*/}
                  <Route exact path="/pages/" render={()=><Pages/>}/>
                  <Route exact path="/pages/addPage" render={()=><AddPage/>}/>
                  <Route path="/pages/editPage" render={()=><EditPage/>}/> {/*не exact path! чтобы ходить по страницам с помощью pageId*/}
              </div>
            </div>
          </BrowserRouter>
      </div>
  );
}

export default App;
