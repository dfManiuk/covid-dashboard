const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const TypeToLine = {
  'Infected vs Recovered': ['Confirmed', 'Recovered', 'line'],
  Death: ['Deaths', null, 'bar'],
  Active: ['Active', null, 'line'],
};

const mapToArray = (array, dataToChoose) => {
  const data = [];
  const date = [];

  array.forEach((value, key) => {
    const item = value[value.length - 1];

    data.push(item[`${dataToChoose}`]);
    date.push([MONTH_NAMES[Number.parseInt(key, 10) - 1]]);
  });

  return [data, date];
};

export const data = (lineOne, lineTwo, sortArray, type) => ({
  labels: mapToArray(sortArray)[1],
  datasets: [
    {
      type: `${TypeToLine[type][2]}`,
      label: `${TypeToLine[type][0]}`,
      data: mapToArray(sortArray, TypeToLine[type][0])[0].concat(lineOne),
      fill: false,
      backgroundColor: '#ffcf33',
      borderColor: '#ffcf3385',
    },
    TypeToLine[type][1] !== null ? {
      type: `${TypeToLine[type][2]}`,
      label: `${TypeToLine[type][1]}`,
      data: mapToArray(sortArray, TypeToLine[type][1])[0].concat(lineTwo),
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    } : { label: "" },
  ],
});

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    yAxes: [
      { ticks: { beginAtZero: true } },
    ],
  },
};
