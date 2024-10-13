import React from 'react';

import PopularEvents from './PopularEvents';
import EventTime from './EventTime';
import Organizers from '../organizers/Organizers';
import Testimonials from '../testimonials/Testimonials';
import DestinationSlider from './DestinationSlider';
import Banner from './banner/page';

const HomeContainer = () => {
    return (
        <div className='space-y-20'>
             <Banner></Banner>
            <PopularEvents></PopularEvents>
            <EventTime />
            <DestinationSlider />
            <Organizers></Organizers>
            <Testimonials></Testimonials>
        </div>
    );
};

export default HomeContainer;