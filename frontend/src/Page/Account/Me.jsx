import { Space, Tabs } from 'antd'
import React from 'react'
import { LuHome, LuUser } from 'react-icons/lu'
import "./Me.scss";

const Me = () => {
    const items = [
		{
			key: 1,
			label: (
				<Space>
					<LuHome /> Home
				</Space>
			),
			children: `Content of Tab Pane 1`,
		},
		{
			key: 2,
			label: (
				<Space>
					<LuUser /> Personal Info
				</Space>
			),
			children: `Content of Tab Pane 2`,
		},
	];
  return (
    <div className="Me">
        <Tabs items={items} defaultActiveKey='1' tabPosition='left' />
    </div>
  )
}

export default Me