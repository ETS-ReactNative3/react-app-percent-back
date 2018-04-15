import React from 'react';
// import { Breadcrumb, Navbar, NavbarCollapse } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import NavbarCom from './components/Nav';
import axios from 'axios';

let percentBackIn = [];
let datesIn = [];

const data = {
    labels: datesIn,
    datasets: [
        {
            label: 'Races',
            fill: true,
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

class Chart extends React.Component {
    constructor() {
        super();
        this.state = {
            races: [],
            isLoaded: false
        }
        // this.getRaces = this.getRaces.bind(this);
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/races')
        .then(res => {
            this.setState({races: res.data})
            console.log(this.state.races)
        })
            .catch((error) => {
                console.log(error);
                if (error == "Error: Request failed with status code 401") {
                  this.props.history.push("/");
                }
            });
        }

    // getRaces() {
    //     fetch('/races')
    //         .then(response => response.json())
    //         .then(racesArray => {

    //             this.setState({
    //                 races: racesArray
    //             });
    //             console.table(this.state.races);
    //             this.organizeChartData()
    //         })
    //         .catch(error => console.log('Error fetching races', error))
    // }

    organizeChartData() {
        for (var i = 0; i < this.state.races.length; i += 1) {
            percentBackIn.push(this.state.races[i].percentBack)
            datesIn.push(this.state.races[i].raceDate);
        }
        this.setState({
            isLoaded: true
        })
    }

    render() {
        return (
            <div className="chartJSX">
                
                    <div className="jumbotron">
                        <h1>Percent Back Calculator</h1>
                        <h3>Feel The Burn</h3>
                    </div>
                    <div className="Breadcrumb">
                        <NavbarCom />
                    </div>
                    <h1 className="title">Chart Breakdown</h1>
                    <div className="containerTable">
                        {this.state.isLoaded ? <Line data={data} redraw={true} /> : <div>Still Loading... </div>}
                    </div>
                
            </div>
        )
    }
} //End Component

export default Chart;