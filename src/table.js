import React from 'react';
// import { Link } from 'react-router-dom';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Breadcrumb } from 'react-bootstrap';

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
                        <h1>Percent back calculator</h1>
                        <h3>Feel the burn</h3>
                </div>
                <div className="Breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Enter Races</Breadcrumb.Item>
                        <Breadcrumb.Item active>See Standings</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <h1 class="title">Your Standings</h1>
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