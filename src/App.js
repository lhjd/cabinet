import React, { useEffect, useState } from 'react';
import Profile from './components/Profile';

const App = () => {

  const [cabinet, setCabinet] = useState([]);
  const [filteredCabinet, setFilteredCabinet] = useState([]);

  useEffect(() => {
    fetch('/cabinet.json')
    .then( res => res.json())
    .then((data) => {
      setCabinet(data);
      setFilteredCabinet(data);
    })
    .catch((e) => {
      console.log(e);
    });
  }, []);

  const filterCabinetMembers = (status) => {
    const filteredCabinet = cabinet.filter(member => member['Filter'] === status);
    setFilteredCabinet(filteredCabinet);
  }

  const resetCabinet = () => {
    setFilteredCabinet(cabinet);
  }

  return (
    <div className="bg-gray-100">
      <h1 className="text-3xl text-center my-3">2020内阁</h1>
      <div className="flex justify-center mb-4">
        <button 
          className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none active:bg-blue-700 p-2 mr-2 rounded"
          onClick={() => filterCabinetMembers('职务有变动')}
        >
          职务有变动
        </button>
        <button 
          className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white focus:outline-none active:bg-green-700 p-2 mr-2 rounded"
          onClick={() => filterCabinetMembers('职务没变')}
        >
          职务没变
        </button>
        <button 
          className="border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white focus:outline-none active:bg-gray-700 p-2 mr-2 rounded"
          onClick={resetCabinet}
        >
          所有成员
        </button>
      </div>
      <div className="grid md:grid-cols-5 gap-4 mx-4">
          {filteredCabinet.map(member => (
            <Profile
            key={member['Name CN']}
            name={member['Name CN']}
            title={member['New Position']}
            imgUrl={member['Image URL']}
            filter={member['Filter']}
            />
            ))}
      </div>
    </div>
  );
}

export default App;
