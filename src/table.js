import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { Breadcrumb, Button } from 'react-bootstrap';

const url = `/races`;

class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            races: [],
        }
        this.getRaces = this.getRaces.bind(this);
    }

    componentDidMount() {
        console.log('component has mounted');
        this.getRaces();
    }
    //GET route for races.
    getRaces() {
        fetch('/races')
        .then(response => response.json())
            .then(racesArray => {
                this.setState({
                    races: racesArray
                });
            })
            .catch(error => console.log('Error fetching races', error))
    }

    removeRaces(id) {
        const request = new Request(`${url}/${id.value}`, {
            method: `DELETE`
        });
        fetch(request)
            .then(response => {
                this.getRaces();
            })
            .catch(error => console.log(`fetch error remove race: ${error}`))
    }

    render() {
        const races = this.state.races;
        return (
            <div className="Table">
                <div className="jumbotron">
                    <h1>Percent Back Calculator</h1>
                    <h3>Feel The Burn</h3>
                </div>
                <div className="Breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Enter Races</Breadcrumb.Item>
                        <Breadcrumb.Item active>See Standings</Breadcrumb.Item>
                        <Breadcrumb.Item href='/chart'>See Chart</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <h1 className="title">Your Standings</h1>
                <div className="container">
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
        );
    }
}

export default Table;