import React, { useEffect, useState } from 'react';

import AuthHeader from './AuthHeader';

const Home = () => {
  return(
    <div className='w-full flex flex-col justify-center items-center bg-gray-200'>
      <AuthHeader/>
      <div className="h-[90vh] flex items-center justify-center">
        <div>
            <h2 className='text-2xl font-sans font-bold text-center'>Please,Login and Register to create Task and read Task</h2>
        </div>
      </div>
    </div>
    
  );
}

export default Home;