'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';

const DEFAULT_START_DATE = dayjs('2022-01-01').startOf('day');
const DEFAULT_END_DATE = dayjs().endOf('day');

interface DateRangeContextType {
  mainDateRange: RangePickerProps['value'];
  setMainDateRange: React.Dispatch<React.SetStateAction<RangePickerProps['value']>>;
  secondaryDateRange: RangePickerProps['value'];
  setSecondaryDateRange: React.Dispatch<React.SetStateAction<RangePickerProps['value']>>;
  sliderValue: [number, number];
  setSliderValue: React.Dispatch<React.SetStateAction<[number, number]>>;
  formattedMainDateRange: string[];
  formattedSecondaryDateRange: string[];
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (context === undefined) {
    throw new Error('useDateRange must be used within a DateRangeProvider');
  }
  return context;
};

interface DateRangeProviderProps {
  children: ReactNode;
}

export const DateRangeProvider = ({ children }: DateRangeProviderProps) => {
  const [mainDateRange, setMainDateRange] = useState<RangePickerProps['value']>([DEFAULT_START_DATE, DEFAULT_END_DATE]);
  const [secondaryDateRange, setSecondaryDateRange] = useState<RangePickerProps['value']>(mainDateRange);
  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 100]);

  // Format date ranges for API calls
  const formattedMainDateRange = [
    mainDateRange?.[0]?.format('YYYY-MM-DD') || dayjs().subtract(2, 'year').format('YYYY-MM-DD'),
    mainDateRange?.[1]?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD'),
  ];

  const formattedSecondaryDateRange = [
    secondaryDateRange?.[0]?.format('YYYY-MM-DD') || formattedMainDateRange[0],
    secondaryDateRange?.[1]?.format('YYYY-MM-DD') || formattedMainDateRange[1],
  ];

  const value = {
    mainDateRange,
    setMainDateRange,
    secondaryDateRange,
    setSecondaryDateRange,
    sliderValue,
    setSliderValue,
    formattedMainDateRange,
    formattedSecondaryDateRange,
  };

  return (
    <DateRangeContext.Provider value={value}>
      {children}
    </DateRangeContext.Provider>
  );
}; 