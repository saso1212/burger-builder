import React, {Component} from 'react';
import Modal from '../UI/Modal/Modal';
import Aux from '../../huc/Aux';



//function that create class that why is anonimus
const withErrorHeandler=(WrappedComponenet,axios)=>{
    return class extends Component{
        state={
            error:null
        }
        componentWillMount (){

            //koga prakam request da nemam erroe so ovaa funkcija
           this.reqInterseptor= axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req;
            });
            this.resInterseptor=axios.interceptors.response.use(res=>
                {return  res},
                error=>{
                this.setState({error:error});
           
            });
        }
        //koga nema da ni treba burgerot odnosno ke odime na druga strana treba da se oslobodime od intersepterot
        //za da mozeme da ja koristime withErrorHeandler na drugo mesto

        componentWillUnmount() {
            axios.interceptors.request.eject(this.resInterseptor);
            axios.interceptors.request.eject(this.reqInterseptor);
        }
        errorConfirmedHeandler=()=>{
            this.setState({error:null});
        }
        render(){
         return(
            <Aux>
            <Modal show={this.state.error}
             modalHide={this.errorConfirmedHeandler} >
            {/* //bidejki modalot postoi sekogas zatoa mora da se sredi toa */}
            {this.state.error ? this.state.error.message :null}
            </Modal>
            <WrappedComponenet {...this.props} />
            </Aux>
            )
        }
        
    }
}

export default withErrorHeandler;