import React, {Component} from 'react';
import Aux from '../../../huc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary  extends Component {
    componentWillUpdate (){
        console.log('[Order summary will update]');
    }
    
     render(){
        const ingridients=Object.keys(this.props.ingridients)
        .map((igKey)=>{
            return (<li key={igKey} ><span style={{"textTransform":"capitalize"}}>{igKey}</span> : {this.props.ingridients[igKey]}</li>);
        })
        return(
            <Aux>
                <h3>You Order</h3>
                <p>A delicius Burger with the following ingridients: </p>
                <ul>
                    {ingridients}
                </ul>
                <p>TOTAL PRICE:<strong>{this.props.price.toFixed(2)}</strong> $</p>
                <h4>Continie to Checkout?</h4>
                <Button btnType="Danger"  clicked={this.props.cancleOrder}>CANCEL</Button>
                <Button btnType="Success"  clicked={this.props.contionueOrder}>CONTINUE</Button>  
            </Aux>
    
        );
     }
    }



export default OrderSummary;