import React from 'react';
import { Breadcrumb, Button } from 'react-bootstrap';


class Chart extends React.Component {
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
        fetch('/races')
            .then(response => response.json())
            .then(racesArray => {
                this.setState({
                    races: racesArray
                });
                
            })
            .catch(error => console.log('Error fetching races', error))
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
                        <Breadcrumb.Item active='/chart'>See Chart</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <h1 className="title">Chart Breakdown</h1>
                <div className="container">
                    <h2>hi</h2>
                </div>
            </div>
        )
    }
} //End Component
export default Chart;