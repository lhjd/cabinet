import React from 'react';

const StatusFilter = (props) => {
  return (
      <button 
        className={`border-2 border-${props.color}-500 hover:bg-${props.color}-500 hover:text-white focus:outline-none active:bg-${props.color}-700 p-2 mr-2 rounded
        ${props.activeMembers === props.filter ? `bg-${props.color}-500 text-white` : `bg-white text-${props.color}-500`}`}
        onClick={props.clicked}
      >
        {props.filter}
      </button>
);
}

export default StatusFilter;
