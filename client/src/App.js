import React from 'react';
// import './App.css';
import Table,{UpdateComeee} from './Components/Custumers/Table'
import Add from './Components/Custumers/Add'
import Update from './Components/Custumers/Update'
import {Switch,Route,Link} from 'react-router-dom'



function App() {
  return (
    <div className="App">
       <Route exact path='/' component={Table} /> 
       <Route exact path='/Update/:id/:fisrtName/:lastName' component={Update} />  
       <Route exact path='/Add' component={Add} />
    </div>
  );
}

export default App;
