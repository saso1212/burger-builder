import React from 'react';
import classes from './SideDrawer.css'

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../huc/Aux';

const sideDrawer=(porps)=>{
     let attachedClase=[classes.SideDrawer,classes.Close].join(" ");
     if(porps.open){
        attachedClase=[classes.SideDrawer,classes.Open].join(" ");
     }
    //...implement css classes 
    return(
        <Aux>
        <BackDrop show={porps.open}  clicked={porps.clicked}/>
        <div className={attachedClase}>
        <div className={classes.Logo}>
        <Logo/>
        </div>
            <nav >
                <NavigationItems/>
            </nav>
        </div>
        </Aux>
    )
}
export default sideDrawer;