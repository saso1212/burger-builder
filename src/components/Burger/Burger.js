import React from 'react';
import classes from './Burger.css';
import BurgerIngridients from './BurgerIngridents/BurgerIngridients';

const burger=(props)=>{
    //because there is no [] of obj there is only object we must convert them first to arrays
    //Object.keys(props.ingridents) make [salad,meat,chees,bacon]
    let transformedIngridients=Object.keys(props.ingridients).map((igKey)=>{
        //here i will crate an array of first ingridents[salad] is 2 so I make array of 2 empty spaces beacuse i
        //need only the index in the next map 
        return [...Array(props.ingridients[igKey])].map((_,i)=>{
            return <BurgerIngridients key={igKey+i} type={igKey}/>
        });
    
   
    //    we cratae array of array of object[[{}],[{}]];
    //and with reduce method we will create only array of object
    //the,[] is in what shoul be returned values in our case it shoul be array of obj
    //transformedIngridients=[[{},{}],[],[{}]]...
     }).reduce((prew ,curr)=>{
        // var array1 = ['a', 'b', 'c']; var array2 = ['d', 'e', 'f']; console.log(array1.concat(array2));
       // expected output: Array ["a", "b", "c", "d", "e", "f"]
        return prew.concat(curr)
     },[]);
    if(transformedIngridients.length===0){

        transformedIngridients=<p> Please start entering ingridients!</p>;
    }
    //console.log(transformedIngridients);
    return( 
        <div className={classes.Burger}>
            <BurgerIngridients type="bread-top"/>
            {transformedIngridients}
            <BurgerIngridients type="bread-bottom"/>
        </div>
    );
}

export default burger;