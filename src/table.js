import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { Breadcrumb, Button } from 'react-bootstrap';

const url = `http://localhost:3000/racesArray`;

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
        fetch('http://localhost:3000/racesArray')
            .then(response => response.json())
            .then(racesArray => {
                this.setState({
                    races: racesArray
                });
                console.log(this.state.races);
            })
            .catch(error => console.log('Error fetching races', error))
    }

    removeRaces(id) {
        console.log(id.value);
        console.log(`removing race with id ${id.value}`);
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
                    <h1>Percent back calculator</h1>
                    <h3>Feel the burn</h3>
                </div>
                <div className="Breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Enter Races</Breadcrumb.Item>
                        <Breadcrumb.Item active>See Standings</Breadcrumb.Item>
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
                            accessor: 'id',
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