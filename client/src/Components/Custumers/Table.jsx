import React, { Component } from 'react'
import '../dist/css/adminlte.min.css'
import Update from './Update'
import { Switch, Route, Link } from 'react-router-dom'



class Table extends Component {
    styling = {
        margin: '20px'
    }

    constructor(props) {
        super(props);
        this.state = {
            Custumers: [],
            id: '',
            fisrtName: '',
            lastName: '',
            msg: ''
        }
    }
    //!Display data
    componentDidMount() {
        fetch('/api/custumers')
            .then((res) => res.json())
            .then((custumers) => this.setState({ Custumers: custumers }))

    }

    //!Delete
    handelDel = (id) => {

        fetch(`/api/custumers/del/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
    }


    handelChangeDel = _ => {
        console.log(this.responseID)
        // console.log(this.state.id);
    }
    //!Rechercher
    handleChange = event => {

        this.setState({ [event.target.name]: event.target.value });
        const term = event.target.value
        const trs = document.getElementsByClassName('tr')
        Array.from(trs).forEach(function (tr) {
            const firstName = tr.getElementsByClassName('name')[0].textContent;

            if (firstName.toLocaleLowerCase().indexOf(term) != -1) {
                tr.style.display = ''
            }
            else {
                tr.style.display = 'none'
            }
        })

    }

    render() {
        const { id, fisrtName, lastName } = this.state;

        return (
            <div style={this.styling}>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title">Custumers</h3>
                                <div className="card-tools">
                                    <div className="input-group input-group-sm" style={{ width: '150px' }}>
                                        <input type="text" id="SearchBox" onChange={this.handleChange} name="table_search" className="form-control float-right" placeholder="Search" />

                                    </div>
                                </div>
                            </div>

                    <form action="/" method="post">
                        <table className="table table-head-fixed text-nowrap" id='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th style={{ textAlign: "center" }}>Option</th>
                                </tr>
                            </thead>
                            <tbody className="tbody">
                                {
                                    this.state.Custumers.map(c =>
                                        [

                                            <tr key={c.id} className='tr'>
                                                <td >{c.id}</td>
                                                <td className='name'>{c.fisrtName}</td>
                                                <td >{c.lastName}</td>
                                                <td style={{ textAlign: "center" }}>

                                                    <a href='/' className="btn btn-danger"
                                                        onClick={this.responseID = () => {
                                                            this.handelDel(c.id)
                                                        }}
                                                    >Delete
                                                    </a>


                                                    <a
                                                        href={'/Update/' + c.id + '/' + c.fisrtName + '/' + c.lastName}
                                                        target=""
                                                        id='line'
                                                        className="btn btn-success"
                                                        style={{ marginLeft: '10px' }}

                                                    >
                                                        Update</a>

                                                </td>
                                            </tr>
                                        ]

                                    )
                                }
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
        <div className="card-footer">
            <a href="/Add" className="btn btn-primary">Add</a>
        </div>


            </div>

        )

    }

}

export default Table
