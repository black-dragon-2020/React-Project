import React, { Component } from 'react'
import '../dist/css/adminlte.min.css'
import {Redirect} from 'react-router-dom'
import Table from './Table'

class Update extends Component {

    constructor(props){
        super(props);

        this.state={
            id:'',
            fisrtName:'',
            lastName:'',
            msg:'',
            redirect: false,
            up:false
        }
        this.onSubmit = this.HandleSubmit.bind(this);
    }
    handleChange=event=>{

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
        fetch('/api/custumers/Edit',{
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

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
      }

    styling ={
        margin:'20px',
        width: '96%'

    }
    container={
        position: 'relative',
        overflow: 'hidden'
    }

    componentDidMount(){
       
            this.state.id=this.props.match.params.id;
            this.state.fisrtName=this.props.match.params.fisrtName;
            this.state.lastName=this.props.match.params.lastName;
            this.setState({up:true})
    }

    
    render() {
        return (
            
<div className="container-fluid" style={this.styling}>
{this.renderRedirect()}
        <div className="row">
            
        <div className="col-md-6">
        <div className="card card-warning">
             <div className="card-header">
                 <h3 className="card-title">Update Custumer</h3>
        </div>
          <form role="form" onSubmit={this.onSubmit} method="POST">
             <div className="card-body">
                 <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Id</label>
                    <input type="text" className="form-control" placeholder="New ID"
                      name="id" 
                      value={this.state.id} 
                      onChange={this.handleChange}
                     />
                </div> 
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">First Name</label>
                    <input type="text" className="form-control"  placeholder="New First Name"
                     name="fisrtName" 
                     value={this.state.fisrtName} 
                     onChange={this.handleChange}
                    />
                </div> 
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Last Name</label>
                    <input type="text" className="form-control" placeholder="New Last Name"
                     name="lastName" 
                     value={this.state.lastName} 
                     onChange={this.handleChange}
                    />
                </div> 
                <div className="card-footer">
                <button type="submit"
                className="btn btn-warning"
               
                >
                Update
                
                </button>
                </div>
            </div>
          </form>


</div>
</div>
</div> 
        
</div>
           
        )
    
    }
}

export default Update
