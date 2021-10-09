import { Line } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { mockForLine } from '../../core/mock/mockForLine';

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const data = (lineOne, lineTwo) => ({
  labels: (() => {
    const date = new Date();
    const arr = [];

    for (let i = 5; i >= 0; i -= 1) {
      arr.push(MONTH_NAMES[date.getMonth() - i]);
    }

    return arr;
  })(),
  datasets: [
    {
      label: 'infected',
      data: mockForLine(lineOne).concat(lineOne),
      fill: false,
      backgroundColor: '#ffcf33',
      borderColor: '#ffcf3385',
    },
    {
      label: 'recovered',
      data: mockForLine(lineTwo).concat(lineTwo),
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
});

const options = {
  scales: {
    yAxes: [
      { ticks: { beginAtZero: true } },
    ],
  },
};

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
}));

const LineChart = ({ lineOne, lineTwo }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <h1 className='title'>Infected VS Recovered</h1>
        <div className='links' />
      </div>
      <Line data={data(lineOne, lineTwo)} options={options} />
    </>
  );
};

LineChart.propTypes = {
  lineOne: PropTypes.number,
  lineTwo: PropTypes.number,
};
LineChart.defaultProps = {
  lineOne: -1,
  lineTwo: -1,
};

export default LineChart;
