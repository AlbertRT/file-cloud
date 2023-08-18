import { Space, Tabs } from 'antd'
import React from 'react'
import { LuCloud, LuLaptop2 } from 'react-icons/lu'
import LocalTabs from './LocalTabs';

const ChangePP = () => {
    const items = [
		{
			key: 1,
			label: (
				<Space>
					<LuCloud />
					Your Cloud
				</Space>
			),
		},
		{
			key: 2,
			label: (
				<Space>
					<LuLaptop2 />
					Local
				</Space>
			),
			children: <LocalTabs />,
		},
	];
  return (
    <Tabs items={items} />
  )
}

export default ChangePP