import { Collapse } from 'antd';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { categorys } from '../Utils/data'

const { Panel } = Collapse;

function MobCateg() {
    const history = useHistory();
  return (
    <div className='mob-categ'>
        <Collapse expandIconPosition='right'>
            {
                categorys.map((item, index) => (
                    item.sub ? <Panel header={
                        <div className="category with-sub" key={index}>
                            <div className="title">
                                <span onClick={() =>history.push(`/products/category/${item.routeName}`)}><item.icon className='icon' /> {item.name}</span>
                            </div>
                        </div>
                    } >
                        {
                            item.sub.map((sub, index) => (
                                <div className="sub" key={index}>
                                    <div className="title" onClick={() =>history.push(`/products/category/${sub.routeName}`)}>{sub.name}</div>
                                    {
                                        sub.subs &&
                                        <div className="subs">
                                            {sub.subs.map((subs, index) => ( <div key={index} className="name" onClick={() =>history.push(`/products/category/${subs.routeName}`)}>{subs.name}</div> ))}    
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </Panel>:
                    <div className="category no-sub" key={index}>
                        <div className="title" onClick={() =>history.push(`/products/category/${item.routeName}`)}>
                            <item.icon className='icon' /> {item.name}
                        </div>
                    </div>
                ))
            }
        </Collapse>
    </div>
  )
}

export default MobCateg