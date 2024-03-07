import React from 'react';
import ShuffleHero from '../hero/Hero';
import Pricing from '../pricing/Pricing';

const Home = () => {
    return (
        <div className="p-4 md:p-0 md:w-3/4 mx-auto ">
            <ShuffleHero></ShuffleHero>
            <Pricing/>
        </div>
    );
};

export default Home;