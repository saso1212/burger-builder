import React, {Component} from 'react';
import Aux from '../../huc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spiner from '../../components/UI/Spiner/Spiner';
import withErrorHeandler from '../../components/withErrorHeandler/withErrorHeandler';

const INGRIDIENT_PRICE={
    salad:0.6,
    meat:1.5,
    cheese:1.0,
    bacon:0.5
}
class BurgerBuilder extends Component{
    state={
        // ingridients:{
        //    salad:0,
        //    meat:0,
        //    cheese:0,
        //    bacon:0
        // },
        ingridients:null,
        totalPrice:4,
        isPerchesable:false,
        purchasing:false,
        loading:false,
        error: false
        
    }
    //ovie mora mnogu dobro da se naucat component
    componentDidMount =()=>{
        axios.get('https://react-my-burger-f3c90.firebaseio.com/ingridients.json').then(res=>{
            //ovaka ke dade greska bidejki ingridient se sega nula i gi vakama na start i zatoa 
            //site raboti vo aplikacijava koi zavisata od podatocite ke panat
            //ova e tipicno za site aplikacii, i ova se prevenira so proverka dali ima sostojki prvo
            //vo applikacijata
                this.setState({ingridients:res.data})
        }).catch(err=>{
            this.setState({error:true})
        });
    }
    isPerchesableHenndler =(ingridients) =>{
       
        const sum=Object.keys(ingridients).map((igKey)=>{
           return ingridients[igKey]
        }).reduce((sum,prev)=>{
            return sum+prev;
        },0);
        
            this.setState({isPerchesable:sum>0})
        
    }
    addIngridentHeandler=(type)=>{
        const oldIngridientCount=this.state.ingridients[type];
        const updatedIngridientCount=oldIngridientCount+1;
        const updatedIngridient={
            ...this.state.ingridients
        }
        updatedIngridient[type]=updatedIngridientCount;
        const priceAddition=INGRIDIENT_PRICE[type]+this.state.totalPrice;
        this.setState({ingridients:updatedIngridient,totalPrice:priceAddition});  
        this.isPerchesableHenndler(updatedIngridient);
    }
    removeIngridientHeandler=(type)=>{
        const oldIngridientCount=this.state.ingridients[type];
        if(oldIngridientCount<=0){
            return;
        }
        const updatedIngridientCount=oldIngridientCount-1;
        const updatedIngridient={
            ...this.state.ingridients
        }
        updatedIngridient[type]=updatedIngridientCount;
        const priceDedaction=this.state.totalPrice-INGRIDIENT_PRICE[type];
        this.setState({ingridients:updatedIngridient,totalPrice:priceDedaction}); 
        this.isPerchesableHenndler(updatedIngridient);

    }
    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }
    modalHideHendler=()=>{
        this.setState({purchasing:false});
    }
   
    continueOrderHandler=()=>{
        this.setState({loading:true})
        const order={
            ingridients:this.state.ingridients,
            price:this.state.totalPrice,
            customer:{
                name:'Kristina Davidovik',
                adress:{
                    zipCode:1000,
                    conutry:"Macedonia"
                }, 
                email:'test@test.com'
            },
            deliveryMethod:'fasted'
        }
        axios.post('/orders.json',order).then(res=>
            this.setState({loading:false,purchasing:false})).catch(err=>
            this.setState({loading:false,purchasing:false}))
    }
    render ()
    {   
        const disabledInfo={
        ...this.state.ingridients}
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        let orderSummary=null;
        //disabeldInfo {salda:false,meat:false,cheese:false}
        //ili Aux ili [] namesto ()
        let burger = this.state.error ? <p>Something is wrong!!!</p> : null;
        if(this.state.ingridients){
         burger = (
         <Aux>  
        <Burger ingridients={this.state.ingridients} />
        <BuildControls ingridientAdded={this.addIngridentHeandler}
               ingridientRemoved={this.removeIngridientHeandler}
               disabled={disabledInfo}
               price={this.state.totalPrice}
               isPerchsabel={this.state.isPerchesable}
               purchasing={this.purchaseHandler}/>
        </Aux> );
         orderSummary=<OrderSummary ingridients={this.state.ingridients} 
         cancleOrder={this.modalHideHendler}
         contionueOrder={this.continueOrderHandler} 
         price={this.state.totalPrice}/>;
        }
        if(this.state.loading){
            orderSummary=<Spiner/>;
        }

        return(
            <Aux>
              <Modal show={this.state.purchasing} modalHide={this.modalHideHendler}>
                  {/* <OrderSummary ingridients={this.state.ingridients} 
                   cancleOrder={this.modalHideHendler}
                   contionueOrder={this.continueOrderHandler} 
                   price={this.state.totalPrice}/> */}
                   {orderSummary}
              </Modal>
              {/* <Burger ingridients={this.state.ingridients}/> */}
             
              {/* <BuildControls ingridientAdded={this.addIngridentHeandler}
               ingridientRemoved={this.removeIngridientHeandler}
               disabled={disabledInfo}
               price={this.state.totalPrice}
               isPerchsabel={this.state.isPerchesable}
               purchasing={this.purchaseHandler}/> */}
                {burger}
            </Aux>
        )
    }
}
export default withErrorHeandler(BurgerBuilder,axios);