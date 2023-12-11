import { Chart } from "react-google-charts";

export const Area = (results) => {
  if (results.length < 2) {
    return null;
  }

  const areaChartTransform = results.map(result => {
    return [`${result.pizza + 1}`, result.area]
  });
  const areaChartData = [['Pizza', 'Area'], ...areaChartTransform];
  const areaChartOptions = {
    legend: 'none',
    hAxis: { title: 'Pizza' },
    vAxis: { title: 'Sq. Unit' },
  };

  return (
      <Chart
          chartType="ColumnChart"
          width="100%"
          height="256px"
          data={ areaChartData }
          options={ areaChartOptions }
      />
  );
};

export const Per = (results) => {
  if (results.length < 2) {
    return null;
  }

  const perChartTransform = results.map(result => {
    return [`${result.pizza + 1}`, result.per]
  });
  const perChartData = [['Pizza', 'Per'], ...perChartTransform];
  const perChartOptions = {
    legend: 'none',
    curveType: "function",
    hAxis: { title: 'Pizza' },
    vAxis: { title: 'Per' },
  };

  return (
      <Chart
          chartType="AreaChart"
          width="100%"
          height="256px"
          data={ perChartData }
          options={ perChartOptions }
      />
  );
};