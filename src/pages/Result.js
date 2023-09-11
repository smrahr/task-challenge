import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import * as dayjs from "dayjs";
import "./result.css";

const Result = () => {
  const users = useSelector((state) => state.users);
  const [agesChart, setAgesChart] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  const [skillsChart, setSkillsChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  });

  useEffect(() => {
    let chartCategories = ["HTML", "CSS", "JS"];

    let chartData = chartCategories.map((item) => {
      let count = 0;
      users.forEach((it) => {
        if (it.skills.includes(item)) count++;
      });

      return count;
    });

    setSkillsChart({
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: chartCategories,
        },
      },
      series: [
        {
          name: "series-1",
          data: chartData,
        },
      ],
    });
  }, []);

  useEffect(() => {
    const today = dayjs();
    let pieChartCategories = users.map((user) =>
      today.diff(dayjs(user.birthDate), "year")
    );

    pieChartCategories = new Set(pieChartCategories);

    const labels = [...pieChartCategories].map((age) => `ساله${age}`);

    let chartData = [...pieChartCategories].map((age) => {
      let count = 0;
      users.forEach((user) => {
        if (today.diff(dayjs(user.birthDate), "year") === age) count++;
      });
      return count;
    });

    setAgesChart({
      series: chartData,
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    });
  }, []);

  return (
    <div className="center">
      {users.length ? (
        <div className="charts">
          <Chart
            options={skillsChart.options}
            series={skillsChart.series}
            type="bar"
            width="800"
          />

          <Chart
            options={agesChart.options}
            series={agesChart.series}
            type="pie"
            width={800}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Result;
