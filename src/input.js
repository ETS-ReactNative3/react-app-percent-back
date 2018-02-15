import React from 'react';
// import { Link } from 'react-router-dom';
import { Form, FormGroup, ControlLabel, FormControl, Breadcrumb, Button } from 'react-bootstrap';
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
        this.setState({
            skierOneHours: event.target.value
        });
    }

    updateskierOneMinutes(event) {
        this.setState({
            skierOneMinutes: event.target.value
        });
    }

    updateskierOneSeconds(event) {
        this.setState({
            skierOneSeconds: event.target.value
        });
    }
    updateyourHours(event) {
        this.setState({
            youSkierHours: event.target.value
        });
    }
    updateyourMinutes(event) {
        this.setState({
            youSkierMinutes: event.target.value
        });
    }
    updateyourSeconds(event) {
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
        let youTime = (parseFloat(yourHours * 60) + parseFloat(yourMinutes) + parseFloat(yourSeconds * 0.0166667));
        let difference = (youTime - firstPlaceTime);
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
        //POST route for submitting races.
        const request = new Request(`${url}`, {
            method: `Post`,
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(racesArray)
        });
        fetch(request)
            .then(response => {
                console.log(`Post was successful: ${response}`);
                this.getRaces();
                this.cancelCourse();
            })
            .catch(error => console.log(`fetch error adding races: ${error}`))
    }//End of post route

    cancelCourse = () => {
        this.setState({
            raceName: "",
            raceDistance: "",
            raceDate: "",
            skierOneHours: "",
            skierOneMinutes: "",
            skierOneSeconds: "",
            youSkierHours: "",
            youSkierMinutes: "",
            youSkierSeconds: ""
        });
    }

    render() {
        return (
            <div className="App">
                <div className="jumbotron">
                        <h1>Percent back calculator</h1>
                        <h3>Feel the burn</h3>
                </div>
                <div className="Breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item active>Enter Races</Breadcrumb.Item>
                        <Breadcrumb.Item href="/table">See Standings</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="container2">
                    <Form id="enter-statistics" onSubmit={this.calcPercentBack}>
                        <FormGroup>
                            <ControlLabel><h2>Enter the ski race information.</h2></ControlLabel><br></br>
                            <ControlLabel> Race Name <FormControl type="text" value={this.state.raceName} onChange={this.updateRaceName} /></ControlLabel>
                            <ControlLabel> Race Distance (in kilometers) <FormControl type="text" value={this.state.raceDistance} onChange={this.updateRaceDistance} /></ControlLabel>
                            <ControlLabel> Race Date (yyyy-mm-dd) <FormControl type="text" value={this.state.raceDate} onChange={this.updateRaceDate} /></ControlLabel>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel><h2>Enter the first place finisher's time below.</h2></ControlLabel><br></br>
                            <ControlLabel> Hours <FormControl type="text" pattern="[0-9]*" ref="skierOneHours" value={this.state.skierOneHours} onChange={this.updateskierOneHours} /></ControlLabel>
                            <ControlLabel> Minutes <FormControl type="text" pattern="[0-9]*" value={this.state.skierOneMinutes} onChange={this.updateskierOneMinutes} /></ControlLabel>
                            <ControlLabel> Seconds <FormControl type="text" pattern="[0-9]*" value={this.state.skierOneSeconds} onChange={this.updateskierOneSeconds} /></ControlLabel>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel><h2>Enter your time below.</h2></ControlLabel><br></br>
                            <ControlLabel> Hours <FormControl type="text" pattern="[0-9]*" value={this.state.youSkierHours} onChange={this.updateyourHours} /></ControlLabel>
                            <ControlLabel> Minutes <FormControl type="text" pattern="[0-9]*" value={this.state.youSkierMinutes} onChange={this.updateyourMinutes} /> </ControlLabel>
                            <ControlLabel> Seconds <FormControl type="text" pattern="[0-9]*" value={this.state.youSkierSeconds} onChange={this.updateyourSeconds} /> </ControlLabel><br></br>
                            <Button bsStyle="primary" type="submit" value="Submit" >Submit</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}


export default Input;