export const getOptions =(orderData) =>{ 
const matrixMargin = 10;
const getTitle = (text: string, subtext: string, coord: [number, number]) => {
  return {
    text: text,
    subtext: subtext,
    left: 2,
    top: 2,
    padding: 0,
    textStyle: {
      fontSize: 12,
      fontWeight: 'bold' as const,
      color: '#444'
    },
    subtextStyle: {
      fontSize: 10,
      color: '#666'
    },
    itemGap: 0,
    coordinateSystem: 'matrix',
    coord: coord
  };
};
const titles = [

  getTitle('Order Book', '', [4, 0]),

];

      return {
  title: titles,
  xAxis: [
     {
      type: 'value',
      gridIndex: 3,
      show: false,
      max: 'dataMax'
    },
{
      type: 'category',
      gridIndex: 2,
      show: false,
      boundaryGap: false,
      data: Array.from({ length: 1 * 2 }, (_, i) => i + '')
    }
],

//   ],
  yAxis: [
    {
      type: "value",
      gridIndex: 3,
      show: false,
    },
    {
      type: "value",
      gridIndex: 2,
      show: false,
    },
    {
      type: "category",
      gridIndex: 3,
      show: false,
    },
    {
      type: "value",
      gridIndex: 4,
      show: false,
      max: "dataMax",
      min: "dataMin",
    },
  ],
  grid: [
    {
      coordinateSystem: "matrix",
      coord: [0, 0],
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    {
      coordinateSystem: "matrix",
      coord: [0, 5],
      top: 20,
      bottom: 0,
      left: 0,
      right: 0,
    },
    {
      coordinateSystem: "matrix",
      coord: [0, 4],
      top: 20,
      bottom: 0,
      left: 0,
      right: 0,
    },
    {
      coordinateSystem: "matrix",
      coord: [4, 0],
      top: 15,
      bottom: 2,
      left: 2,
      right: 2,
    },
    {
      coordinateSystem: "matrix",
      coord: [4, 4],
      top: 15,
      bottom: 0,
      left: 0,
      right: 0,
    },
  ],
  series: [
    
  
    {
      name: "Order Book",
      type: "bar",
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: orderData,
      barWidth: "90%",
      label: {
        show: true,
        position: "insideRight",
      },
    },

  ],
  matrix: {
    left: matrixMargin,
    right: matrixMargin,
    top: matrixMargin,
    bottom: matrixMargin,
    x: {
      show: false,
      data: Array(5).fill(null)
    },
    y: {
      show: false,
      data: Array(6).fill(null)
    },
    body: {
      data: [
        {
          coord: [
            [0, 3],
            [0, 3]
          ],
          mergeCells: true
        },
        {
          coord: [
            [0, 3],
            [5, 5]
          ],
          mergeCells: true
        },
        {
          coord: [
            [0, 3],
            [4, 4]
          ],
          mergeCells: true
        },
        {
          coord: [
            [4, 4],
            [0, 3]
          ],
          mergeCells: true
        },
        {
          coord: [
            [4, 4],
            [4, 5]
          ],
          mergeCells: true
        }
      ]
    }
  },
}
}