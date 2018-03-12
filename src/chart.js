import React, { Component } from 'react';
import { Breadcrumb, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

let percentBackIn = [];
let datesIn = [];

const data = {
    labels: datesIn,
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: percentBackIn
      }
    ]
  };

  let dataIn = [];
  
  
  

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
                dataIn = this.state.races
                console.log(dataIn)
                this.organizeChartData()
            })
            .catch(error => console.log('Error fetching races', error))
            
    }

    organizeChartData() {
        for(var i = 0; i < this.state.races.length; i += 1){
            let lineData = this.state.races[i];
            percentBackIn.push(this.state.races[i].percentBack)
            datesIn.push(this.state.races[i].raceDate);
        }
        console.log(percentBackIn);
        console.log(datesIn);
    }

    render() {
        console.log(data)
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
                    <h1>test</h1>
                    <Line data={data} redraw/>
                </div>
            </div>
        )
    }
} //End Component
export default Chart;