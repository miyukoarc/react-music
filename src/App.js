import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link,Redirect,useParams } from 'react-router-dom';
import Welcome from './components/welcome'
import Search from './components/search'

class App extends React.Component{
  render (){
    return (
      <Router>
        <Switch>
          <Route path="/welcome" component={Welcome}></Route>
          <Route path="/search" component={Search}></Route>
          <Redirect to="/welcome"></Redirect>
        </Switch>
      </Router>
    )
  }
}
export default App;
