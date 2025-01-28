import React from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Barchart() {
    const data = [
        {
          name: 'Jan',
          CC: 400,
          TL: 1000,
          amt: 2400,
        },
        {
          name: 'Feb',
          CC: 600,
          TL: 1200,
          amt: 2210,
        },
        {
          name: 'Mar',
          CC: 900,
          TL: 2000,
          amt: 2290,
        },
        {
          name: 'Apr',
          CC: 1800,
          TL: 3000,
          amt: 2000,
        },
        {
          name: 'May',
          CC: 2200,
          TL: 3500,
          amt: 2181,
        },
        {
          name: 'June',
          CC: 600,
          TL: 2000,
          amt: 2500,
        },
        {
          name: 'July',
          CC: 800,
          TL: 2500,
          amt: 2100,
        },
        {
          name: 'Aug',
          CC: 1500,
          TL: 3000,
          amt: 2100,
        },
        {
          name: 'Sep',
          CC: 2500,
          TL: 3500,
          amt: 2100,
        },
        {
          name: 'Oct',
          CC: 2400,
          TL: 3700,
          amt: 2100,
        },
        {
          name: 'Nov',
          CC: 3000,
          TL: 3800,
          amt: 2100,
        },
        {
          name: 'Dec',
          CC: 3500,
          TL: 4000,
          amt: 2100,
        },
      ];
  return (
          <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          
          <Bar dataKey="TL" fill="#8F57FE" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="CC" fill="#35c49e" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
  )
}

export default Barchart
