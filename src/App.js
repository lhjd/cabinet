import React, { useState } from 'react';
import Group from './components/Group';
import GroupFilter from './components/GroupFilter';

const App = () => {

  const [activeGroup, setActiveGroup] = useState('新内阁');

  return (
    <div className="bg-gray-100">
      <h1 className="text-3xl text-center my-3">2020内阁改组</h1>
      <GroupFilter setActiveGroup={setActiveGroup} activeGroup={activeGroup}/>
      {activeGroup === '新内阁' && 
        <Group
          fetchUrl='./cabinet.json'
          filters={[{status: '职务有变动', color: 'blue'}, {status: '职务没变', color: 'green'}, {status: '所有成员', color: 'gray'}]}
        />}
      {activeGroup === '政治职务新名单' && 
        <Group
          fetchUrl='./other_appointments.json'
          filters={[{status: '新议员', color: 'blue'}, {status: '前后座议员', color: 'green'}, {status: '所有成员', color: 'gray'}]}
        />}
      {activeGroup === '卸下政治职务' && 
        <Group
          fetchUrl='./retirement.json'
          filters={[{status: '离开国会', color: 'blue'}, {status: '退居后座', color: 'green'}, {status: '所有成员', color: 'gray'}]}
        />}
    </div>
  );
}

export default App;
