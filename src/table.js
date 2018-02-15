import React from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const url = `http://localhost:3000/racesArray`;

class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            races: [],
            // raceName: '',
            // raceDistance: '',
            // raceDate: '',
            // percentBack: '',
            // skierOneHours: '',
            // skierOneMinutes: '',
            // skierOneSeconds: '',
            // youSkierHours: '',
            // youSkierMinutes: '',
            // youSkierSeconds: ''
        }
        // this.updateskierOneHours = this.updateskierOneHours.bind(this);
        // this.updateskierOneMinutes = this.updateskierOneMinutes.bind(this);
        // this.updateskierOneSeconds = this.updateskierOneSeconds.bind(this);
        // this.updateyourHours = this.updateyourHours.bind(this);
        // this.updateyourMinutes = this.updateyourMinutes.bind(this);
        // this.updateyourSeconds = this.updateyourSeconds.bind(this);
        // this.calcPercentBack = this.calcPercentBack.bind(this);
        // this.updateRaceName = this.updateRaceName.bind(this);
        // this.updateRaceDistance = this.updateRaceDistance.bind(this);
        // this.updateRaceDate = this.updateRaceDate.bind(this);
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

    // updateskierOneHours(event) {
    //     // console.log(`skieronehours: ${event.target.value}`)
    //     this.setState({
    //         skierOneHours: event.target.value
    //     });
    // }

    // updateskierOneMinutes(event) {
    //     // console.log(`skieroneminutes: ${event.target.value}`)
    //     this.setState({
    //         skierOneMinutes: event.target.value
    //     });
    // }

    // updateskierOneSeconds(event) {
    //     // console.log(`skieroneseconds: ${event.target.value}`)
    //     this.setState({
    //         skierOneSeconds: event.target.value
    //     });
    // }
    // updateyourHours(event) {
    //     // console.log(`updateyourhours: ${event.target.value}`)
    //     this.setState({
    //         youSkierHours: event.target.value
    //     });
    // }
    // updateyourMinutes(event) {
    //     // console.log(`updateyourhours: ${event.target.value}`)
    //     this.setState({
    //         youSkierMinutes: event.target.value
    //     });
    // }
    // updateyourSeconds(event) {
    //     // console.log(`updateyourhours: ${event.target.value}`)
    //     this.setState({
    //         youSkierSeconds: event.target.value
    //     });
    // }

    // updateRaceDate(event) {

    //     this.setState({
    //         raceDate: event.target.value
    //     })
    // }

    // updateRaceName(event) {
    //     this.setState({
    //         raceName: event.target.value
    //     })
    // }

    // updateRaceDistance(event) {
    //     this.setState({
    //         raceDistance: event.target.value
    //     })
    // }

    // calcPercentBack(event) {
    //     event.preventDefault();
    //     let firstPlaceSkierHours = this.state.skierOneHours;
    //     let firstPlaceSkierMinutes = this.state.skierOneMinutes;
    //     let firstPlaceSkierSeconds = this.state.skierOneSeconds;
    //     let yourHours = this.state.youSkierHours;
    //     let yourMinutes = this.state.youSkierMinutes;
    //     let yourSeconds = this.state.youSkierSeconds;
    //     let firstPlaceTime = (parseFloat(firstPlaceSkierHours * 60) + parseFloat(firstPlaceSkierMinutes) + parseFloat(firstPlaceSkierSeconds * 0.0166667));
    //     // console.log('First Place minutes ' + firstPlaceTime)
    //     let youTime = (parseFloat(yourHours * 60) + parseFloat(yourMinutes) + parseFloat(yourSeconds * 0.0166667));
    //     // console.log('Your minutes ' + youTime)
    //     let difference = (youTime - firstPlaceTime);
    //     // console.log('Difference ' + difference);
    //     let calcPercentBack = ((difference / firstPlaceTime) * 100).toFixed(2);
    //     console.log('stuff sent');
    //     this.setState({
    //         percentBack: calcPercentBack
    //     });

        // let randomNumber = Math.floor(Math.random() * 100);
        // const racesArray = {
        //     "id": (this.state.races.length + 1),
        //     "raceName": this.state.raceName,
        //     "raceDate": this.state.raceDate,
        //     "raceDistance": this.state.raceDistance,
        //     "percentBack": calcPercentBack
        // }
        // const request = new Request(`${url}`, {
        //     method: `Post`,
        //     headers: new Headers({ 'Content-Type': 'application/json' }),
        //     body: JSON.stringify(racesArray)
        // });
        // fetch(request)
        //     .then(response => {
        //         console.log(`Post was successful: ${response}`);
        //         this.getRaces();
        //     })
        //     .catch(error => console.log(`fetch error adding races: ${error}`))
    // }//End of post route
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