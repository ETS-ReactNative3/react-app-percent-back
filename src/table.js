import React from 'react';
// import { Link } from 'react-router-dom';
// import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
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
        console.log(`removing race with id ${id}`);
        const request = new Request(`${url}/${id}`, {
            method: `DELETE`
        });
        fetch(request)
        .then(response => {
            this.getRaces();
        })
        .catch(error => console.log(`fetch error remove race: ${error}`))
    }

    render() {
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
                    <ul>
                        {this.state.races.map(races => (
                            <li key={races.id}>
                                {races.raceName} | {races.raceDistance} | {races.raceDate} | {races.percentBack} 
                                <Button bsStyle="danger" onClick={event => this.removeRaces(races.id)}>Delete</Button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Table;