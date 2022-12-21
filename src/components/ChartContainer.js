import React, { useState } from 'react';
import Chart from './Chart';
import SearchBar from './SearchBar';
import styles from './ChartContainer.module.css';


const ChartContainer = () => {
    const [stockSymbols, setStockSymbols] = useState([]);
    const [selectedStock, setSelectedStock] = useState('');
    const [low, setLows] = useState([]);
    const [high, setHighs] = useState([]);

    const handleChange = (e) => {
        const val = e.target.value;

        if (val.length >= 3) {
            window
                .fetch(
                    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${val}&apikey=${process.env.REACT_APP_API_KEY}`
                )
                .then((res) => res.json())
                .then((json) => {
                    setStockSymbols(
                        (json?.bestMatches || []).map((stock) => ({
                            id: stock?.['1. symbol'],
                            value: stock?.['1. symbol'],
                            ...stock,
                        }))
                    );
                })
                .catch((e) => console.log(e));
        }
    };

    const formatTimeSeriesData = (json = {}) => {
        const [lows, highs] = [[], []];
        const times = Object.keys(json);

        times.forEach((time) => {
            const formattedDate = new Date(time).getTime();
            highs.push([formattedDate, +json[time]?.['2. high']]);
            lows.push([formattedDate, +json[time]?.['3. low']]);
        });

        setLows(lows);
        setHighs(highs);
    };

    const selectStock = ({ value }) => {
        setSelectedStock(value);
        setStockSymbols([]);
        setSelectedStock(value);

        window
            .fetch(
                `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${value}&apikey=${process.env.REACT_APP_API_KEY}`
            )
            .then((res) => res.json())
            .then((json) => {
                formatTimeSeriesData(json?.['Time Series (Daily)']);
            });
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
                data: [...low],
            },
            {
                type: 'spline',
                name: 'High',
                data: [...high],
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
            {low.length && high.length ? (
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