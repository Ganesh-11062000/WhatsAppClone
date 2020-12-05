import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import './App.css';
import Chat from './Components/Chat';
import Login from './Components/Login';
import Sidebar from "./Components/Sidebar";
import { useStateValue } from './StateProvider';

function App() {

  const [{user},dispatch] = useStateValue();
  // const user = null;
  return (
    <div className="app">

      {!user?<Login/>:
      (
        <div className="app__body">
          <BrowserRouter>
            <Sidebar/>
            <Switch>
              <Route path="/rooms/:roomId" >
                <Chat/>
              </Route>
              <Route path="/">
                <h1>Home Page</h1>
              </Route>
            </Switch> 
          </BrowserRouter>   
        </div>
      )}
    </div>
  );
}

export default App;
