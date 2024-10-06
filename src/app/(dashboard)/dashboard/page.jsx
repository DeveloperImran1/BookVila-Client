import React from 'react';
export const dynamic = "force-dynamic";  // vercel a deploy korar por cassing kore rakhena

import UserContainer from './(user)/user-profile/page';
import AdminContainer from './(admin)/admin-container/page';
import OrganizerContainer from './(organizer)/organizer-container/page';

const page = () => {
    const role = "user"
    return (
        <div>
            {
                role === "user"? <UserContainer></UserContainer> : role === "event organizer" ? <OrganizerContainer></OrganizerContainer> : <AdminContainer></AdminContainer>
            }
        </div>
    );
};

export default page;