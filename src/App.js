import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link,Redirect,useParams } from 'react-router-dom';
import Welcome from './components/welcome'
import Search from './components/search'
import SongDetail from './components/songDetail'

class App extends React.Component{
  render (){
    return (
      <Router>
        <Switch>
          <Route path="/welcome" component={Welcome}></Route>
          <Route path="/search" component={Search}></Route>
            <Route path="/songDetail/:id" component={SongDetail}></Route>
          <Redirect to="/welcome"></Redirect>
        </Switch>
      </Router>
    )
  }
}
export default App;
