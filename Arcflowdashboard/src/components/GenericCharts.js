import React, { useMemo } from 'react';
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Legend,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
  Point,
  ZoomAndPan,
  ScrollBar,
  Font,
  Label,
  Connector
} from 'devextreme-react/chart';
import colors from './colors'



const DashBoardHomeLineChart = ({
  data = [],
  title,
  argumentField,
  valueFields = [],
  chartHeight,
  onPointClick,
}) => {
  
  const { transformedData, maxYValue } = useMemo(() => {
    const transformed = data.flatMap((item) =>
      item.FieldListData.map((subItem) => ({
        FieldCategory: subItem.FieldCategory,
        ...subItem.FieldListData, 
      }))
    );

    const maxValue = transformed.reduce((max, item) => {
      const maxFieldValue = valueFields.reduce(
        (fieldMax, field) => Math.max(fieldMax, item[field] || 0),
        0
      );
      return Math.max(max, maxFieldValue);
    }, 0);

    return { transformedData: transformed, maxYValue: maxValue };
  }, [data, valueFields]);

  const maxSplits = Math.min(5, Math.floor((chartHeight - 50) / 10));
  const tickInterval = Math.ceil(maxYValue / maxSplits);
  const yAxisEndValue = Math.ceil(maxYValue / tickInterval) * tickInterval;

  const seriesFields = valueFields.map((field, index) => ({
    valueField: field,
    name: field,
    color: colors[index % colors.length],
  }));

  return (
    <div className='dx-visibility-change-handler2'>
      <Chart
        dataSource={transformedData}
        onPointClick={onPointClick}
        height={chartHeight}
      >
        <CommonSeriesSettings
          argumentField={argumentField}
          type="bar"
          barPadding={0.8}
        />
        {seriesFields.map((field, index) => (
          <Series
            key={index}
            valueField={field.valueField}
            name={field.name}
            color={field.color}
          >
            <Label
              visible={false}
              position="outside"
              customizeText={(e) => `${e.value}`}
              font={{ size: 8 }}
              indentFromAxis={5}
            />

            <Tooltip enabled={true} />
          </Series>
        ))}
        <ArgumentAxis />
        <ValueAxis
          visualRange={{ startValue: 0, endValue: yAxisEndValue }}
          tickInterval={tickInterval}
        />
        <Legend
          verticalAlignment="top"
          horizontalAlignment="center"
          visible={true}
        />
        <ScrollBar visible={false} />
        <ZoomAndPan argumentAxis="both" />
        <Tooltip enabled={true} />
      </Chart>
    </div>
  );
};



const DashBoardHomeLineProduction = ({
  data = [],
  title,
  argumentField,
  chartHeight,
  onPointClick,
}) => {
  const { transformedData, maxYValue, valueFields } = useMemo(() => {
    const mtdData = data.filter((item) => item.FieldCategory === "MTD");

    const dynamicValueFields = []; 

    
    const transformed = mtdData.flatMap((item) =>
      item.FieldListData.map((subItem) => {
        // Dynamically extract fields from FieldListData (like 'Target' and 'Achieved')
        const dynamicFields = Object.keys(subItem.FieldListData || {}).reduce((acc, key) => {
          acc[key] = subItem.FieldListData[key]; // Add the field value dynamically
          if (!dynamicValueFields.includes(key)) {
            dynamicValueFields.push(key); // Add the field to valueFields array
          }
          return acc;
        }, {});

        return {
          FieldCategory: subItem.FieldCategory,
          ...dynamicFields, // Spread dynamic fields like Target, Achieved, etc.
        };
      })
    );

    // Calculate the max value for the Y-axis considering the dynamically selected valueFields
    const maxValue = transformed.reduce((max, item) => {
      const maxFieldValue = dynamicValueFields.reduce(
        (fieldMax, field) => Math.max(fieldMax, item[field] || 0),
        0
      );
      return Math.max(max, maxFieldValue);
    }, 0);

    return { transformedData: transformed, maxYValue: maxValue, valueFields: dynamicValueFields };
  }, [data]);

  // Dynamically calculate Y-axis tick intervals
  const maxSplits = Math.min(5, Math.floor((chartHeight - 50) / 10));
  const tickInterval = Math.ceil(maxYValue / maxSplits);
  const yAxisEndValue = Math.ceil(maxYValue / tickInterval) * tickInterval;

  // Generate series for the dynamically identified valueFields (Target, Achieved, etc.)
  const seriesFields = valueFields.map((field, index) => ({
    valueField: field,
    name: field,
    color: colors[index % colors.length], // Cyclic colors
  }));

  return (
    <div className='dx-visibility-change-handler2'>
      <Chart
        dataSource={transformedData}
        onPointClick={onPointClick}
        height={chartHeight}
        id={"test"}
      >
        <CommonSeriesSettings
          argumentField={argumentField}
          type="bar"
          barPadding={0.8}
        />
        {seriesFields.map((field, index) => (
          <Series key={index} valueField={field.valueField} name={field.name} color={field.color}>
            <Label
              visible={false}
              position="outside"
              customizeText={(e) => `${e.value}`}
              font={{ size: 8 }}
              indentFromAxis={5}
            />
            <Tooltip enabled={true} />
          </Series>
        ))}
        <ArgumentAxis />
        <ValueAxis
          visualRange={{ startValue: 0, endValue: yAxisEndValue }}
          tickInterval={tickInterval}
        />
        <Legend
          verticalAlignment="top"
          horizontalAlignment="center"
          visible={true}
        />
        <ScrollBar visible={false} />
        <ZoomAndPan argumentAxis="both" />
        <Tooltip enabled={true} />
      </Chart>
    </div>
  );
};



const DashBoardHomeSlideChart = ({
  data = [],
  title,
  argumentField,
  valueFields = [],
  chartHeight,
  onPointClick,
}) => {
  // Memoize transformed data and calculate maximum Y value
  const { transformedData, maxYValue } = useMemo(() => {
    const transformed = data.flatMap((item) => 
      item.FieldListData.map((subItem) => {
        const dataFields = valueFields.reduce((acc, field) => {
          acc[field] = subItem[field] || 0; // Add each dynamic field to the item
          return acc;
        }, {});

        return {
          FieldCategory: subItem.FieldCategory, // Category for X-axis
          ...dataFields, // Dynamic fields for Y-axis values
        };
      })
    );

    // Calculate maximum Y value to adjust the Value Axis range
    const maxValue = transformed.reduce((max, item) => {
      const maxFieldValue = valueFields.reduce(
        (fieldMax, field) => Math.max(fieldMax, item[field] || 0),
        0
      );
      return Math.max(max, maxFieldValue);
    }, 0);

    return { transformedData: transformed, maxYValue: maxValue };
  }, [data, valueFields]);

  // Dynamically calculate Y-axis tick intervals
  const maxSplits = Math.min(5, Math.floor((chartHeight - 50) / 10));
  const tickInterval = Math.ceil(maxYValue / maxSplits);
  const yAxisEndValue = Math.ceil(maxYValue / tickInterval) * tickInterval;

  // Generate series for multiple value fields
  const seriesFields = valueFields.map((field, index) => ({
    valueField: field,
    name: field,
    color: colors[index % colors.length], // Use color cycling for different fields
  }));

  return (
    <div className='dx-visibility-change-handler2'>
      <Chart
        dataSource={transformedData} // Use the transformed data
        onPointClick={onPointClick} // Handle point click
        height={chartHeight}
        rotated={true} // Set the chart orientation
      >
        <CommonSeriesSettings
          argumentField={argumentField} // Set X-axis (FieldCategory)
          type="bar" // Bar chart type
          barPadding={0.8} // Adjust bar padding
        />
        
        {/* Create a series for each value field */}
        {seriesFields.map((field, index) => (
          <Series
            key={index}
            valueField={field.valueField} // Y-axis data
            name={field.name} // Field name for the legend
            color={field.color} // Bar color
          >
            <Label
              visible={false} // Hide the label, if not needed
              position="outside" // Position the label outside the bars
              customizeText={(e) => `${e.value}`} // Customize label text (value)
              font={{ size: 8 }}
              indentFromAxis={5}
            />
            <Tooltip enabled={true} />
          </Series>
        ))}

        {/* Set up axes */}
        <ArgumentAxis />
        <ValueAxis
          visualRange={{ startValue: 0, endValue: yAxisEndValue }} // Set the range of the Y-axis
          tickInterval={tickInterval} // Set the tick interval
        />

        {/* Add chart legend and other UI components */}
        <Legend
          verticalAlignment="top"
          horizontalAlignment="center"
          visible={false}
        />
        <ScrollBar visible={false} />
        <ZoomAndPan argumentAxis="both" />
        <Tooltip enabled={true} />
      </Chart>
    </div>
  );
};





export { DashBoardHomeLineChart , DashBoardHomeSlideChart, DashBoardHomeLineProduction};