import React, {Component, Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CrimeList from '../componets/CrimeList'
import Request from '../helpers/request'

class CrimeContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      crimes: []
    }
  }

  // componentDidMount(){
  // const request = new Request();
  // request.get('link').then((data) => {
  //   this.setState({crimes: data})
  // })

render(){
  return(

  <p>  hello </p>
    // <Router>
    //   <Fragment>
    //   <Switch>
    // //   <Route render={(props) =>{
    // //   return <CrimeList crimes={this.state.crimes}/>
    // // }} />
    //   </Switch>
    //   </Fragment>
    // </Router>
  )
}

}


export default: CrimeContainer;