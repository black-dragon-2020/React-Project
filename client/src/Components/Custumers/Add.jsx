import React, { Component } from 'react'
import '../dist/css/adminlte.min.css'
import Update from './Update'
import {Redirect} from 'react-router-dom'

class Add extends Component {
    
    constructor(props){
        super(props);
        this.state={
            Custumers:[],
            id:'',
            fisrtName:'',
            lastName:'',
            msg:'',
            redirect: false
        }
        this.onSubmit = this.HandleSubmit.bind(this);
    }
//!Add

handleChange=event=>{
    //  const {value,name}=e.target;
    this.setState({[event.target.name]:event.target.value});
    
}


HandleSubmit=(e)=>{
    e.preventDefault();
   
    const data ={
        id:this.state.id,
        fisrtName:this.state.fisrtName,
        lastName:this.state.lastName
    }
    console.log(data);
    fetch('/api/custumers/insert',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)

    }).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(data) {
        console.log(data)    
        if(data == "success"){
           this.setState({msg: "Thanks for registering"});
           console.log("HHHHHHHHHHHHHHHHHH");  
        }
    }).catch(function(err) {
        console.log(err)
    });
    
    this.setState(
    { 
    id:'',
   fisrtName:'',
   lastName:'',
   redirect: true
})


}

    styling ={
        margin:'20px',
        width: '96%'
    }

    container={
        position: 'relative',
        overflow: 'hidden'
    }
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
      }
    render() {
        const {id,fisrtName,lastName}=this.state;
        return (
            
          <div style={this.container}>
              
              {this.renderRedirect()}   

<div className="container-fluid" style={this.styling}>
        <div className="row">
            
        <div className="col-md-6">
        <div className="card card-primary">
             <div className="card-header">
                 <h3 className="card-title">Add Custumer</h3>
        </div>
          <form role="form" action="/" onSubmit={this.onSubmit} method="POST">
             <div className="card-body">
                 <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Id</label>
                    <input 
                    type="text" className="form-control"
                    placeholder="ID"
                    name="id"
                    value={id} 
                    onChange={this.handleChange}
                    />
                </div> 
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">First Name</label>
                    <input type="text" className="form-control" 
                    name="fisrtName" 
                    placeholder="First Name"
                    value={fisrtName} 
                    onChange={this.handleChange}
                    />
                </div> 
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Last Name</label>
                    <input type="text" className="form-control" placeholder="Last Name"
                     name="lastName" 
                      value={lastName} 
                      onChange={this.handleChange}
                     />
                </div> 
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </div>
          </form>


</div>
</div>
       </div> 
       </div>



</div>  



        )
    }
}

export default Add
