import React from 'react';

const profile = (props) => {
  return (
    <div className="rounded flex flex-col justify-center shadow-lg bg-white p-3">
      <div className="flex justify-center">
        <img src={props.imgUrl} alt={props.name} className="w-3/4"/>
      </div>
      <h1 className="text-center text-lg text-gray-800 font-bold">{props.name}</h1>
      <h2 className="text-center text-gray-800">{props.title}</h2>
      <h3 className={`text-center ${props.filter === '职务有变动' ? 'text-blue-500' : 'text-green-500'}`}>{props.filter}</h3>
    </div>
  );
}

export default profile;
