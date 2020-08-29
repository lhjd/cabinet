import React from 'react';

const GroupFilter = (props) => {

  return (
    <div className="flex justify-center mb-4">
      <button 
        className={`border-2 border-red-500 hover:bg-red-500 hover:text-white focus:outline-none active:bg-red-700 p-2 mr-2 rounded
        ${props.activeGroup === '新内阁' ? `bg-red-500 text-white` : `bg-white text-red-500`}`}
        onClick={() => props.setActiveGroup('新内阁')}
      >
        新内阁
      </button>
      <button 
        className={`border-2 border-red-500 hover:bg-red-500 hover:text-white focus:outline-none active:bg-red-700 p-2 mr-2 rounded
        ${props.activeGroup === '政治职务新名单' ? `bg-red-500 text-white` : `bg-white text-red-500`}`}
        onClick={() => props.setActiveGroup('政治职务新名单')}
      >
        政治职务新名单
      </button>
      <button 
        className={`border-2 border-red-500 hover:bg-red-500 hover:text-white focus:outline-none active:bg-red-700 p-2 mr-2 rounded
        ${props.activeGroup === '卸下政治职务' ? `bg-red-500 text-white` : `bg-white text-red-500`}`}
        onClick={() => props.setActiveGroup('卸下政治职务')}
      >
        卸下政治职务
      </button>
    </div>
  );
}

export default GroupFilter;
