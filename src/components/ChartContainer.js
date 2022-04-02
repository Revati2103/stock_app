import React, { useState } from 'react';
import Chart from './Chart';
import SearchBar from './SearchBar';
import styles from './ChartContainer.module.css';

const ChartContainer = () => {
    const [stockSymbols, setStockSymbols] = useState([]); // set the symbols in the dropdown
    const [selectedStock, setSelectedStock] = useState(''); // select a stock from the dropdown using `selectedStock`

    const handleChange = (e) => {
        const val = e.target.value;
        // TODO make a fetch request to get the symbols to populate the dropdown
        // https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=
    };

    const formatTimeSeriesData = (json = {}) => {
        // TODO this function should format the data in a way highcharts expects it - [date (in seconds), value]
        // example: [[123345, 11.1], [12312312, 100.1], ..]
    };

    const selectStock = ({ value }) => {
        // TODO when a user clicks on a stock, it should trigger a request to get the daily
        // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=
        // the data will need to be formatted using the helper above which needs to be completed
    };

    const options = {
        title: {
            text: `${selectedStock} High vs Low 6 Month Trend`,
        },
        xAxis: {
            type: 'datetime',
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 3,
                    },
                },
            },
        },
        yAxis: {
            title: {
                text: 'Rate',
            },
            labels: {
                format: '${value}',
            },
        },
        series: [
            {
                type: 'spline',
                name: 'Low',
                data: [], // add the data for daily lows here
            },
            {
                type: 'spline',
                name: 'High',
                data: [], // add the data for daily highs here
            },
        ],
    };

    return (
        <div>
            <SearchBar
                handleChange={handleChange}
                options={stockSymbols}
                selectOption={selectStock}
            />
            {options.series[0].data.length ? (
                <div
                    className={styles.chartContainer}
                    data-testid="stock-chart"
                >
                    <Chart chartOpts={options} />
                </div>
            ) : (
                <h2 data-testid="no-stocks-found">
                    Enter a stock symbol to get started
                </h2>
            )}
        </div>
    );
};

export default ChartContainer;
