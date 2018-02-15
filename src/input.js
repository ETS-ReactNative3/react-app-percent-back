import React from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

const url = `http://localhost:3000/racesArray`;

class Input extends React.Component {
    constructor() {
        super();
        this.state = {
            races: [],
            raceName: '',
            raceDistance: '',
            raceDate: '',
            percentBack: '',
            skierOneHours: '',
            skierOneMinutes: '',
            skierOneSeconds: '',
            youSkierHours: '',
            youSkierMinutes: '',
            youSkierSeconds: ''
        }
        this.updateskierOneHours = this.updateskierOneHours.bind(this);
        this.updateskierOneMinutes = this.updateskierOneMinutes.bind(this);
        this.updateskierOneSeconds = this.updateskierOneSeconds.bind(this);
        this.updateyourHours = this.updateyourHours.bind(this);
        this.updateyourMinutes = this.updateyourMinutes.bind(this);
        this.updateyourSeconds = this.updateyourSeconds.bind(this);
        this.calcPercentBack = this.calcPercentBack.bind(this);
        this.updateRaceName = this.updateRaceName.bind(this);
        this.updateRaceDistance = this.updateRaceDistance.bind(this);
        this.updateRaceDate = this.updateRaceDate.bind(this);
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

    updateskierOneHours(event) {
        // console.log(`skieronehours: ${event.target.value}`)
        this.setState({
            skierOneHours: event.target.value
        });
    }

    updateskierOneMinutes(event) {
        // console.log(`skieroneminutes: ${event.target.value}`)
        this.setState({
            skierOneMinutes: event.target.value
        });
    }

    updateskierOneSeconds(event) {
        // console.log(`skieroneseconds: ${event.target.value}`)
        this.setState({
            skierOneSeconds: event.target.value
        });
    }
    updateyourHours(event) {
        // console.log(`updateyourhours: ${event.target.value}`)
        this.setState({
            youSkierHours: event.target.value
        });
    }
    updateyourMinutes(event) {
        // console.log(`updateyourhours: ${event.target.value}`)
        this.setState({
            youSkierMinutes: event.target.value
        });
    }
    updateyourSeconds(event) {
        // console.log(`updateyourhours: ${event.target.value}`)
        this.setState({
            youSkierSeconds: event.target.value
        });
    }

    updateRaceDate(event) {

        this.setState({
            raceDate: event.target.value
        })
    }

    updateRaceName(event) {
        this.setState({
            raceName: event.target.value
        })
    }

    updateRaceDistance(event) {
        this.setState({
            raceDistance: event.target.value
        })
    }

    calcPercentBack(event) {
        event.preventDefault();
        let firstPlaceSkierHours = this.state.skierOneHours;
        let firstPlaceSkierMinutes = this.state.skierOneMinutes;
        let firstPlaceSkierSeconds = this.state.skierOneSeconds;
        let yourHours = this.state.youSkierHours;
        let yourMinutes = this.state.youSkierMinutes;
        let yourSeconds = this.state.youSkierSeconds;
        let firstPlaceTime = (parseFloat(firstPlaceSkierHours * 60) + parseFloat(firstPlaceSkierMinutes) + parseFloat(firstPlaceSkierSeconds * 0.0166667));
        // console.log('First Place minutes ' + firstPlaceTime)
        let youTime = (parseFloat(yourHours * 60) + parseFloat(yourMinutes) + parseFloat(yourSeconds * 0.0166667));
        // console.log('Your minutes ' + youTime)
        let difference = (youTime - firstPlaceTime);
        // console.log('Difference ' + difference);
        let calcPercentBack = ((difference / firstPlaceTime) * 100).toFixed(2);
        console.log('stuff sent');
        this.setState({
            percentBack: calcPercentBack
        });

        const racesArray = {
            "id": (this.state.races.length + 1),
            "raceName": this.state.raceName,
            "raceDate": this.state.raceDate,
            "raceDistance": this.state.raceDistance,
            "percentBack": calcPercentBack
        }
        const request = new Request(`${url}`, {
            method: `Post`,
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(racesArray)
        });
        fetch(request)
            .then(response => {
                console.log(`Post was successful: ${response}`);
                this.getRaces();
            })
            .catch(error => console.log(`fetch error adding races: ${error}`))
    }//End of post route

    render() {
        return (
            <div className="App">
                <div className="jumbotron">
                    <h1>Percent back calculator</h1>
                    <h3>Feel the burn</h3>
                    <Link to="/table">Check out your standings</Link>
                </div>
                <div className="container">
                    <form onSubmit={this.calcPercentBack}>
                        <FormGroup>
                            <label>Enter the ski race information.</label><br></br>
                            <label> Race Name: <input type="text" value={this.state.raceName} onChange={this.updateRaceName} /></label>
                            <label> Race Distance (in kilometers): <input type="text" value={this.state.raceDistance} onChange={this.updateRaceDistance} /></label>
                            <label> Race Date (yyyy-mm-dd): <input type="text" value={this.state.raceDate} onChange={this.updateRaceDate} /></label>
                        </FormGroup>

                        <FormGroup>
                            <label>Enter the first place finisher's time below.</label><br></br>
                            <label> Hours: <input type="text" pattern="[0-9]*" ref="skierOneHours" value={this.state.skierOneHours} onChange={this.updateskierOneHours} /></label>
                            <label> Minutes: <input type="text" pattern="[0-9]*" value={this.state.skierOneMinutes} onChange={this.updateskierOneMinutes} /></label>
                            <label> Seconds: <input type="text" pattern="[0-9]*" value={this.state.skierOneSeconds} onChange={this.updateskierOneSeconds} /></label>
                        </FormGroup>

                        <FormGroup>
                            <label>Enter your time below.</label><br></br>
                            <label> Hours: <input type="text" pattern="[0-9]*" value={this.state.youSkierHours} onChange={this.updateyourHours} /></label>
                            <label> Minutes: <input type="text" pattern="[0-9]*" value={this.state.youSkierMinutes} onChange={this.updateyourMinutes} /> </label>
                            <label> Seconds: <input type="text" pattern="[0-9]*" value={this.state.youSkierSeconds} onChange={this.updateyourSeconds} /> </label><br></br>
                            <input type="submit" value="Submit" />
                        </FormGroup>
                    </form>
                </div>
            </div>
        );
    }
}


export default Input;