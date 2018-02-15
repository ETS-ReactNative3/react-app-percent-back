import React from 'react';
import { Link } from 'react-router-dom';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Jumbotron } from 'react-bootstrap';

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

    render() {
        return (
            <div className="Table">
                <div className="jumbotron">
                    <Jumbotron>
                        <h1>Percent back calculator</h1>
                        <h3>Feel the burn</h3>
                    </Jumbotron>
                </div>
                <div className="container">
                    <Link to="/">Enter more races</Link>
                    <BootstrapTable data={this.state.races} striped hover condensed>
                        <TableHeaderColumn dataField='raceName' isKey={true}>Race Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='raceDate'>Race Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='raceDistance'>Race Distance</TableHeaderColumn>
                        <TableHeaderColumn dataField='percentBack'>Percent Back</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        );
    }
}

export default Table;