import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

let controls=[
{label:'Salad', type:'salad'},
{label:'Meat', type:'meat'},
{label:'Cheese', type:'cheese'},
{label:'Bacon', type:'bacon'}
]

const buildControls=(props)=>{
    return(
    <div className={classes.BuildControls}>
        <p>Curent price : <strong>{props.price.toFixed(1)}</strong></p>
        {controls.map((el)=>{
          return <BuildControl key={el.label}
           label={el.label} 
           removed={()=>props.ingridientRemoved(el.type)}
           added={()=>props.ingridientAdded(el.type)}
           disabled={props.disabled[el.type]}
           price={props.price}/>
        })}
        <button className={classes.OrderButton} disabled={!props.isPerchsabel} onClick={props.purchasing}>ORDER NOW</button>
    </div>);
}

export default buildControls;
