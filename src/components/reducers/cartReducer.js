import Item1 from '../../images/item1.jpg'	
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:9090,title:'Item1', price:200, disc:10, img:Item1},
        {id:9091,title:'Item2', price:250, disc:15, img:Item1},
        {id:9092,title:'Item3', price:320, disc:5, img: Item1},
        {id:9093,title:'Item4', price:290, disc:0, img:Item1},
        {id:9094,title:'Item1', price:500, disc:25, img: Item1},
        {id:9095,title:'Item2', price:150, disc:5, img: Item1},
		{id:9096,title:'Item3', price:700, disc:22, img: Item1},
		{id:9097,title:'Item4', price:350, disc:18, img: Item1}
    ],
    addedItems:[],
    total: 0,
	disc: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price - addedItem.disc,
				 disc: state.disc + addedItem.disc
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price - addedItem.disc
			let newDisc = state.disc + addedItem.disc
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal,
				disc: newDisc
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price - addedItem.disc
		  let newDisc = state.disc + addedItem.disc
          return{
              ...state,
              total: newTotal,
			  disc: newDisc
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer
