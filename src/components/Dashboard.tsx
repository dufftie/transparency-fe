'use client'

import { useEffect, useState } from "react";
import ArticlesTimeSeries from "@/components/Graphs/ArticlesTimeSeries";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const category = 'Мнение';

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/sentiments/category/${ category }/daily?start_date=2020-01-01`)
    .then((response) => response.json())
    .then((data) => {
      setData(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
  }, [])


  return (
    <ArticlesTimeSeries data={ data }/>
  );
}

export default Dashboard;