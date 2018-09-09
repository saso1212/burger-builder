import React, {Component} from 'react';
import Aux from '../../huc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state={
        showSlideDrawer:false
    }
    slideDrawerClosed=()=>{
        this.setState({showSlideDrawer:true})

    }
    slideDrawerOpen=()=>{
        this.setState((prevState)=>{
            return{showSlideDrawer:!prevState.showSlideDrawer}
        } )
       // this.setState({showSlideDrawer:false})
    }
    render(){
      return( 
        <Aux>
          <Toolbar openMeny={this.slideDrawerClosed}/> 
          <SideDrawer clicked={this.slideDrawerOpen} open={this.state.showSlideDrawer}/>
          <main className={classes.Content}>
          {this.props.children}
          </main>
       </Aux>
     );
 }
}

export default Layout;