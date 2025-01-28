import React from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Budgetchart() {
    const data = [
        {
          name: '1L',
          
          TL: 20,
          amt: 2400,
        },
        {
          name: '1.25L',
          
          TL: 10,
          amt: 2210,
        },
        {
          name:'1.5L',
          
          TL: 25,
          amt: 2290,
        },
        {
          name: '2L',
          
          TL: 40,
          amt: 2000,
        },
        {
          name: '3L',
          
          TL: 35,
          amt: 2181,
        },
        {
          name: '4L',
          
          TL: 100,
          amt: 2500,
        },
        {
          name: '5L',
          
          TL: 120,
          amt: 2100,
        },
        {
          name: '6L',
          
          TL: 60,
          amt: 2100,
        },
        {
          name: '7L',
          
          TL: 95,
          amt: 2100,
        },
        {
          name: '9L',
          
          TL: 63,
          amt: 2100,
        },
        {
          name: '10L+',
          
          TL: 25,
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
          <Bar dataKey="TL" fill="#8F57FE" activeBar={<Rectangle fill="#f6fc47" stroke="red" />}/>
          
        </BarChart>
      </ResponsiveContainer>
  )
}
  

export default Budgetchart
