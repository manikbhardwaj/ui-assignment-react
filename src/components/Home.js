import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'

 class Home extends Component{
    
    handleClick = (id)=>{
        this.props.addToCart(id); 
    }

    render(){
        let itemList = this.props.items.map(item=>{
            return(
                <div className="card" key={item.id}>
                        <div className="center">
                            <img src={item.img} alt={item.title}/>
                        </div>

                        <div className="card-content" style={{background: '#ede8e8'}}>
						<p><b>{item.title}</b></p>
                            <p><span style={{ textDecoration: 'line-through', textDecorationColor: 'red', textDecorationStyle: 'solid' }}>${item.disc}</span> <b>${item.price}</b><button style={{ borderColor: 'blue'}} className="btn waves-effect waves-light right transparent blue-text text-darken-2" onClick={()=>{this.handleClick(item.id)}}>Add to cart</button></p>
							
							
                        </div>
                 </div>

            )
        })

        return(
            <div className="container">
                <h3>All Items</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)