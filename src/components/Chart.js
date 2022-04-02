import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = ({ chartOpts }) => {
  if (!chartOpts) return <h2 data-testid="enter-a-stock">Enter a stock symbol</h2>;
  return (
    <div data-testid="highchart">
      <HighchartsReact highcharts={Highcharts} options={chartOpts} />
    </div>
  );
};

export default Chart;
