import { Avatar, Collapse } from 'antd';
import React from 'react'
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { getParentsCategApi } from '../apis/categorys';

const { Panel } = Collapse;

function MobCateg() {
    const history = useHistory();
    const { isLoading, data } = useQuery('parentsCategs', getParentsCategApi);

  return (
    <div className='mob-categ'>
        <Collapse expandIconPosition='right'>
            {
                data?.map((item, index) => (
                    item.Categorys ? <Panel header={
                        <div className="category with-sub" key={index}>
                            <div className="title">
                                <span onClick={() =>history.push(`/products/category/${item.name}`)}><Avatar size={20} src={item.icon} className='icon' /> {item.name}</span>
                            </div>
                        </div>
                    } >
                        {
                            item.Categorys?.map((sub, index) => (
                                <div className="sub" key={index}>
                                    <div className="title" onClick={() =>history.push(`/products/category/${sub.name}`)}>{sub.name}</div>
                                    {
                                        sub.SubCategorys &&
                                        <div className="subs">
                                            {sub.SubCategorys.map((subs, index) => ( <div key={index} className="name" onClick={() =>history.push(`/products/category/${subs.name}`)}>{subs.name}</div> ))}    
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </Panel>:
                    <div className="category no-sub" key={index}>
                        <div className="title" onClick={() =>history.push(`/products/category/${item.name}`)}>
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