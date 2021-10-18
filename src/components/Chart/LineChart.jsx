import { Line } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { options, data } from '../Tab/tabsData';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
}));

const LineChart = ({ lineOne, lineTwo, countyCovid, typeOfLine }) => {
  const classes = useStyles();

  const reg = /-([\S]+?)-/;
  const sortArray = new Map();
  let firstMonthNum = '01';

  countyCovid.forEach((item) => {
    const date = item.Date;

    if (date.match(reg)[1] !== firstMonthNum) {
      sortArray.set(item.Date.match(reg)[1], [item]);

      firstMonthNum = item.Date.match(reg)[1];
    } else {
      const arr = sortArray.get(firstMonthNum);

      arr.push(item);
    }
  });

  return (
    <>
      <div className={classes.root}>
        <h1 className='title'>{typeOfLine}</h1>
        <div className='links' />
      </div>
      <Line data={data(lineOne, lineTwo, sortArray, typeOfLine)} options={options} />
    </>
  );
};

LineChart.propTypes = {
  lineOne: PropTypes.number,
  lineTwo: PropTypes.number,
  countyCovid: PropTypes.arrayOf(PropTypes.shape({})),
  typeOfLine: PropTypes.string,
};
LineChart.defaultProps = {
  lineOne: -1,
  lineTwo: -1,
  countyCovid: {},
  typeOfLine: 'infected_vs_recovered',
};

export default LineChart;
