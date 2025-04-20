'use client';

import { DatePicker } from "antd";
import Card from "@/src/components/card";

const { RangePicker } = DatePicker;

const RangeDateSelect = () => {
  return (
    <Card className="range-date-select">
        <RangePicker showTime />
    </Card>
  );
};

export default RangeDateSelect;