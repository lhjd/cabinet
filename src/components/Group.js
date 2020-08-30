import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import StatusFilter from './StatusFilter';

import 'rsuite/dist/styles/rsuite-default.css';
import { RangeSlider } from 'rsuite';

const Group = (props) => {

  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [activeMembers, setActiveMembers] = useState('所有成员');
  const [ageRange, setAgeRange] = useState([]);
  const [ageRangeFilter, setAgeRangeFilter] = useState([30, 80]);

  useEffect(() => {
    fetch(props.fetchUrl)
      .then(res => res.json())
      .then((data) => {
        setMembers(data);
        setFilteredMembers(data);
        const age = data.map(member => member['Age']);
        const ageMin = Math.min(...age);
        const ageMax = Math.max(...age);
        setAgeRangeFilter([ageMin, ageMax]);
        setAgeRange([ageMin, ageMax]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props.fetchUrl]);

  const filterMembersFor = (status) => {
    if (status === '所有成员') {
      setFilteredMembers(members);
    } else {
      const filter = members.filter(member => member['Filter'] === status);
      setFilteredMembers(filter);
    }
    setActiveMembers(status);
  }

  const searchByName = (e) => {
    const searchTerms = e.target.value;
    const regex = new RegExp(searchTerms, "i");
    const filter = members.filter(member => (member['Name EN'].match(regex) || member['Name CN'].match(regex)));
    setFilteredMembers(filter);
  }

  const filterByAge = (range) => {
    setAgeRangeFilter(range);
    const filter = members.filter(member => (member['Age'] >= ageRangeFilter[0] && member['Age'] <= ageRangeFilter[1]));
    setFilteredMembers(filter);
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
      <div className="mb-3 text-center">
        <label htmlFor="nameSearch">中英文姓名搜寻: </label>
        <input type="search" id="nameSearch" className="p-1 border-2 border-blue-200 rounded" onChange={(e) => searchByName(e)} />
      </div>
      <div className="flex justify-center items-center">
        <h3 className="mr-2">年龄: </h3>
        <h3>{ageRangeFilter[0]}</h3>
        <div className="md:w-1/5 w-1/2 mx-3">
          <RangeSlider
            min={ageRange[0]}
            max={ageRange[1]}
            value={ageRangeFilter}
            onChange={filterByAge}
          />
        </div>
        <h3>{ageRangeFilter[1]}</h3>
      </div>
      <div className="grid md:grid-cols-5 gap-4 mx-4">
        {filteredMembers.map(member => (
          <Profile
            key={member['Name CN']}
            name={member['Name CN']}
            title={member['New Position']}
            imgUrl={member['Image URL']}
            filter={member['Filter']}
            age={member['Age']}
            targetFilter={props.filters[0].status}
          />
        ))}
      </div>
    </>
  );
}

export default Group;
