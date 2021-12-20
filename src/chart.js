import React from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import { Line } from 'react-chartjs-2';
import NavbarCom from './components/Nav';
import axios from 'axios';

let yearsArray = [];



class Chart extends React.Component {
    constructor() {
        super();
        this.state = {
            races: [],
            isLoaded: false,
            selectedOption: "",
            shouldRedraw: false,
            percentBackIn: [],
            datesIn: [],
            chartData: {},
            averagePBTotal: 0,
            averagePB: 0
        }
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/races')
            .then(res => {
                res.data = this.organizeChartData(res.data)
                this.setState({ races: res.data })
                this.setState({
                    chartData: {
                        labels: this.state.datesIn,
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
                                data: this.state.percentBackIn
                            }
                        ]
                    }
                })
                this.setState({
                    isLoaded: true
                })
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.props.history.push("/");
                }
            }
            );
    }

    organizeChartData(data) {
        const percentBackSet = []
        const datesSet = [];
        const totalLength = data.length;
        let totalPB = 0
        for (let i = 0; i < data.length; i += 1) {
            const date = new Date(data[i].raceDate)
            const exist = yearsArray.find(s => s.value === date.getFullYear());
            if (!exist) {
                yearsArray.push({ value: date.getFullYear(), label: date.getFullYear() });
            }
            percentBackSet.push(data[i].percentBack)
            datesSet.push(data[i].raceDate);
            totalPB = totalPB += data[i].percentBack;
        }
        const final = (totalPB / totalLength).toFixed(2);
        this.setState({
            averagePBTotal: +final,
            averagePB: +final,
            percentBackIn: percentBackSet,
            datesIn: datesSet
        })
        return data
    }

    filterRaces(data) {
        const percentBackSet = [];
        const datesSet = [];

        const dateSet = new Date();
        dateSet.setFullYear(data.value);
        const end = new Date(dateSet.setMonth(dateSet.getMonth() -6))
        const start = new Date(dateSet.setMonth(dateSet.getMonth() -12))
  
        let totalPB = 0
        for (let i = 0; i < this.state.races.length; i += 1) {
            const date = new Date(Date.parse(this.state.races[i].raceDate))
            if (date > start && date < end) {
                percentBackSet.push(this.state.races[i].percentBack)
                datesSet.push(this.state.races[i].raceDate)
                totalPB = totalPB + +this.state.races[i].percentBack
            }
        }
        const totalLength = percentBackSet.length;
        const final = (totalPB / totalLength).toFixed(2);
        this.setState({
            averagePB: +final,
            percentBackIn: percentBackSet,
            datesIn: datesSet,
        }, () => {
            this.setState({
                chartData: {
                    labels: this.state.datesIn,
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
                            data: this.state.percentBackIn
                        }
                    ]
                },
                shouldRedraw: true
            })
        })
    }



    resetRaces() {
        const percentBackSet = [];
        const datesSet = [];
        for (let i = 0; i < this.state.races.length; i += 1) {
            percentBackSet.push(this.state.races[i].percentBack)
            datesSet.push(this.state.races[i].raceDate)
        }

        this.setState({
            percentBackIn: percentBackSet,
            datesIn: datesSet,
            averagePB: this.state.averagePBTotal,
        }, () => {
            this.setState({
                chartData: {
                    labels: this.state.datesIn,
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
                            data: this.state.percentBackIn
                        }
                    ]
                },
                shouldRedraw: true
            })
        })
    }


    render() {
        return (
            <div className="chartJSX">
                <div className="Breadcrumb">
                    <NavbarCom />
                </div>
                <h1 className="title">Chart Breakdown</h1>
                <Select value={this.state.selectedOption} onChange={this.filterRaces.bind(this)} options={yearsArray} />
                <div>
                    <h4 className="margin-auto">Average Percent Back: {this.state.averagePB}</h4>
                    <Button bsStyle="primary" className="margin-auto" onClick={this.resetRaces.bind(this)}>Reset Chart</Button>
                </div>
                <div className="containerTable">
                    {this.state.isLoaded ? <Line redraw={this.state.shouldRedraw} data={this.state.chartData} /> : <div>Still Loading... </div>}
                </div>

            </div>
        )
    }
} //End Component

export default Chart;