import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import StatusFilter from './StatusFilter';

const Group = (props) => {

  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [activeMembers, setActiveMembers] = useState('所有成员');

  useEffect(() => {
    fetch(props.fetchUrl)
    .then( res => res.json())
    .then((data) => {
      setMembers(data);
      setFilteredMembers(data);
    })
    .catch((e) => {
      console.log(e);
    });
  }, []);

  const filterMembersFor = (status) => {
    if (status === '所有成员') {
      setFilteredMembers(members);
    } else {
      const filter = members.filter(member => member['Filter'] === status);
      setFilteredMembers(filter);
    }
    setActiveMembers(status);
  }

  return (
    <>
      <div className="flex justify-center mb-4">
        {props.filters.map(filter => (
          <StatusFilter
            key={filter.status}
            filter={filter.status}
            color={filter.color}
            clicked={() => filterMembersFor(filter.status)}
            activeMembers={activeMembers}
          />)
        )}
      </div>
      <div className="grid md:grid-cols-5 gap-4 mx-4">
          {filteredMembers.map(member => (
            <Profile
            key={member['Name CN']}
            name={member['Name CN']}
            title={member['New Position']}
            imgUrl={member['Image URL']}
            filter={member['Filter']}
            targetFilter={props.filters[0].status}
            />
            ))}
      </div>
    </>
  );
}

export default Group;
