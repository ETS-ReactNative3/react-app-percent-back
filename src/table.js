import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { Breadcrumb, Button } from 'react-bootstrap';
import Jumbotron from './components/Jumbotron.js';
import NavbarCom from './components/Nav';
import axios from 'axios';

const url = `/races`;

class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            races: [],
        }
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/races')
        .then(res => {
            this.setState({races: res.data});
            console.log(this.state.races)

        })
            .catch((error) => {
                console.log(error);
                if (error === "Error: Request failed with status code 401") {
                  this.props.history.push("/");
                }
            });
        }

//This function deletes races in the MongoDB.
    removeRaces(id) {
        //axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwToken');
        axios.post('/races/delete/' + id.value )
            .then(response => {
                console.log(response);
                this.getRaces();
            })
            .catch(error => {
                if (error.status === 401) {
                    this.props.history.push("/");

                }
            });
    }

    getRaces() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwToken');

        axios.get('/races')
            .then(res => {
                this.setState({races: res.data});
                console.log(this.state.races)
            })
            .catch((error) => {
                console.log(error.response);
                if (error.status === 403) {
                    this.props.history.push("/");
                }
            });
    }


    render() {
        const races = this.state.races;
        return (
            <div className="Table">
                <Jumbotron />
                <div className="Breadcrumb">
                    <NavbarCom />
                </div>
                <div className="container-fluid">
                    <h1 className="title">Your Standings</h1>
                    <div className="containerTable">
                        <ReactTable data={races} columns={[
                            {
                                Header: "Race Name",
                                accessor: "raceName"
                            },
                            {
                                Header: "Race Distance",
                                accessor: "raceDistance"
                            },
                            {
                                Header: "Race Date",
                                accessor: "raceDate"
                            },
                            {
                                Header: "Percent Back",
                                accessor: "percentBack"
                            },
                            {
                                Header: "Delete Race",
                                id: "delete",
                                accessor: '_id',
                                Cell: ({ value }) => (<Button bsStyle="danger" onClick={event => this.removeRaces({ value })}>Delete</Button>)
                            }
                        ]}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Table;