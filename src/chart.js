import React, {Component} from 'react';
import { Breadcrumb, Button } from 'react-bootstrap';
var LineChart = require("react-chartjs").Line;


class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            races: []
        }
        this.getRaces = this.getRaces.bind(this);
    }

    componentDidMount() {
        console.log('component has mounted');
        this.getRaces();
    }

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

    var data = {
        labels: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
        datasets: {

        }
    }

    render() {
        return (
            <div className="Chart">
                <div className="jumbotron">
                    <h1>Percent Back Calculator</h1>
                    <h3>Feel The Burn</h3>
                </div>
                <div className="Breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Enter Races</Breadcrumb.Item>
                        <Breadcrumb.Item href="/table">See Standings</Breadcrumb.Item>
                        <Breadcrumb.Item active>See Chart</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <h1 className="title">Chart Breakdown</h1>
                <div className="container">
                    <Line data={this.state.races.percentBack} options={this.state.data} height={500} width={700} />
                </div>
            </div>
        )
    }
} //End Component
export default Chart;