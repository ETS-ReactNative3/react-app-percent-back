import React from 'react';
import { Link } from 'react-router-dom';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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
                    <h1>Percent back calculator</h1>
                    <h3>Feel the burn</h3>
                    <Link to="/">Enter more races</Link>
                </div>
                <div className="container">
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