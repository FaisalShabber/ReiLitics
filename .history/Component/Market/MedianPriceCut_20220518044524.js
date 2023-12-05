import { Component } from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
class MedianPriceCut extends Component {
    constructor(props) {
        super(props);
        { console.log(this.props) }


        this.state = {

            series: [
                {
                    name: "Rental Growth",
                    data: this.props.priceCut,
                    color: '#EF6921'
                }
            ],
            options: {
                chart: {
                    zoom: {
                        enabled: false
                    },
                    height: 350,
                    type: 'area',
                    toolbar: {
                        show: false,
                    },
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    fontSize: '16'
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                yaxis: {
                    show: true,

                    labels: {
                        formatter: function (value) {
                            return value.toFixed(3) + "%";
                        },
                        style: {
                            colors: ['#555555'],
                            fontSize: '10px',
                        },
                    },
                },
                xaxis: {
                    type: 'datetime',
                    categories: this.props.priceCutDate,
                    labels: {
                        style: {
                            colors: ['#555555'],
                            fontSize: '10px',
                        },
                    }
                },
            },
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.priceCut !== prevProps.priceCut || this.props.priceCutDate !== prevProps.priceCutDate) {

            var b = {
                ...this.state.options,
                xaxis: {
                    ...this.state.options.xaxis,
                    categories: this.props.priceCutDate
                }
            }
            var c = [{
                name: "Series 1",
                data: this.props.priceCut,
                color: '#EF6921'
            }
            ]
            this.setState({
                series: c,
                options: b
            })

        }
    }
    render() {
        return (


            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
            </div>
        );
    }
}

export default MedianPriceCut