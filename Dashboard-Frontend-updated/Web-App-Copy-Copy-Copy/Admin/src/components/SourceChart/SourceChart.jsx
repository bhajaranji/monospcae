import React from 'react'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

function SourceChart() {

    const data = [
        
        {
          name: 'Offline',
          uv: 15.69,
          pv: 1398,
          fill: 'green',
          
        },
        {
          name: 'Socials',
          uv: 8.22,
          pv: 9800,
          fill: '#3563f0',
        },
        
        
        {
          name: 'Marketplace',
          uv: 6.67,
          pv: 4800,
          fill: '#fa6161',
        },
      ];
      
      const style = {
        top: '55%',
        right: 0,
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
        
      };
      
  return (
    <ResponsiveContainer width="100%" height="300%">
        <RadialBarChart cx="50%" cy="30%" innerRadius="25%" outerRadius="70%" barSize={30} data={data} >
          <RadialBar 
            minAngle={40}
            label={{ position: 'insideStart', fill: '#201de0' }}
            background
            clockWise
            dataKey="uv"
            // activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style}  />
        </RadialBarChart>
      </ResponsiveContainer>
  )
}

export default SourceChart
