import { Collapse } from 'antd';
import React from 'react'
import { categorys } from '../Utils/data'

const { Panel } = Collapse;

function MobCateg() {
  return (
    <div className='mob-categ'>
        <Collapse>
            {
                categorys.map((item, index) => (
                    <Panel header={
                        <div className="category" key={index}>
                            <div className="title">
                                <item.icon className='icon' /> {item.name}
                            </div>
                        </div>
                    } showArrow={false} >
                    </Panel>
                ))
            }
        </Collapse>
    </div>
  )
}

export default MobCateg