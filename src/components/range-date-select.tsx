'use client';

import { DatePicker, Slider } from "antd";
import Card from "@/src/components/card";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import type { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

const DEFAULT_START_DATE = dayjs('2022-01-01').startOf('day');
const DEFAULT_END_DATE = dayjs().endOf('day');

const RangeDateSelect = () => {
  const [mainDateRange, setMainDateRange] = useState<RangePickerProps['value']>([DEFAULT_START_DATE, DEFAULT_END_DATE]);
  const [secondaryDateRange, setSecondaryDateRange] = useState<RangePickerProps['value']>(mainDateRange);
  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 100]);

  useEffect(() => {
    // If main date range was changed, reset secondary date range to match
    setSecondaryDateRange([mainDateRange![0], mainDateRange![1]]);
  }, [mainDateRange]);

  const handleDateRangeChange = (dates: RangePickerProps['value']) => {
    setMainDateRange(dates);
  };

  const handleSliderChange = (value: number[]) => {
    const rangeValue = value;
    setSliderValue([rangeValue[0], rangeValue[1]]);
    
    const start = mainDateRange![0];
    const end = mainDateRange![1];
    const totalDuration = end!.diff(start, 'day');

    
    const startDuration = Math.floor((rangeValue[0] / 100) * totalDuration);
    const endDuration = Math.floor((rangeValue[1] / 100) * totalDuration);
    
    console.log({ startDuration, endDuration });

    const newStartDate = start!.add(startDuration, 'day');
    const newEndDate = start!.add(endDuration, 'day');

    setSecondaryDateRange([newStartDate, newEndDate]);

    console.log({ mainDateRange, secondaryDateRange });
  };

  return (
    <Card className="range-date-select">
      <div className="range-date-content">
        <div className="date-picker-container">
          <RangePicker
            picker="month"
            allowClear={false}
            value={mainDateRange}
            onChange={handleDateRangeChange}
            disabledDate={(current) => {
              return current && (current < DEFAULT_START_DATE || current > DEFAULT_END_DATE);
            }}
            allowEmpty={false}
          />
        </div>
        
        <div className="slider-container">
            <Slider 
                range
                value={sliderValue}
                onChange={handleSliderChange}
                min={0}
                max={100}
                step={1}
            />
        </div>
      </div>
    </Card>
  );
};

export default RangeDateSelect;