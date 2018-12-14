import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Breadcrumb, Button } from 'react-bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import Jumbotron from './components/Jumbotron.js';
import NavbarCom from './components/Nav.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const url = `/races`;

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
        };
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
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/races')
            .then(res => {
                this.setState({ races: res.data });
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.props.history.push("/");
                }
            })
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
    //This function calculates percent back for each race.
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
        this.setState({
            percentBack: calcPercentBack
        });


        const racesArray = {
            "raceName": this.state.raceName,
            "raceDate": this.state.raceDate,
            "raceDistance": this.state.raceDistance,
            "percentBack": calcPercentBack
        };

        //POST route for submitting races.
        const request = new Request(`${url}`, {
            method: `Post`,
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(racesArray)
        });

        axios.post('/races', {
            "raceName": this.state.raceName,
            "raceDate": this.state.raceDate,
            "raceDistance": this.state.raceDistance,
            "percentBack": calcPercentBack
        })
            .then(response => {
                this.notify();
                this.cancelCourse();
            })
            .catch(error => console.log(`fetch error adding races: ${error}`))
    }//End of post route

    //This resets the form.
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
    };

    notify = () => {
        toast.success("Your race has been added.", {
            position: "bottom-left"
        })

    }

    render() {
        return (
            <div className="App">
                <Jumbotron />
                <div className="Breadcrumb">
                    <NavbarCom />
                </div>
                <div className="container2">
                    <Form id="enter-statistics" onSubmit={this.calcPercentBack}>
                        <FormGroup>
                            <ControlLabel><h2>Enter the ski race information.</h2></ControlLabel><br></br>
                            <ControlLabel> Race Name <FormControl type="text" value={this.state.raceName} onChange={this.updateRaceName} /></ControlLabel>
                            <ControlLabel> Race Distance (in kilometers) <FormControl type="text" value={this.state.raceDistance} onChange={this.updateRaceDistance} /></ControlLabel>
                            <ControlLabel> Race Date <FormControl type="date" value={this.state.raceDate} onChange={this.updateRaceDate} /></ControlLabel>
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
                    <ToastContainer />
                </div>
            </div>
        );
    }
}


export default Input;