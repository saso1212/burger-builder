import React, {Component} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../huc/Aux';

class Modal extends Component{
    shouldComponentUpdate(nextProps,nextStat){
        return nextProps.show!==this.props.show || nextProps.children !== this.props.children
    }
    componentWillUpdate(){
        console.log("[Modall wll update]");
    }
    render(){
    return(
        <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalHide}/>
        <div className={classes.Modal}  style={{transform:this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity:this.props.show ? '1' : '0'}}>
        {this.props.children}
        </div>
      </Aux>
    )
}
}
export default Modal;