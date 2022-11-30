import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/material';
import { ReservationDrawerInterface } from '../../interfaces/ReservationDrawerInterface';

function ReservationDrawer(props: ReservationDrawerInterface) {

    const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }

        props.setIsOpen(false);
    };

    return (
        <Drawer
            anchor='left'
            open={props.isOpen}
            onClose={toggleDrawer}>
            <Box sx={{ width: '250px' }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure reiciendis tempora nisi totam eligendi inventore, saepe consequuntur nobis vel? Facere qui porro voluptate accusantium quisquam fugiat explicabo molestiae id deserunt?
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure reiciendis tempora nisi totam eligendi inventore, saepe consequuntur nobis vel? Facere qui porro voluptate accusantium quisquam fugiat explicabo molestiae id deserunt?

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure reiciendis tempora nisi totam eligendi inventore, saepe consequuntur nobis vel? Facere qui porro voluptate accusantium quisquam fugiat explicabo molestiae id deserunt?
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure reiciendis tempora nisi totam eligendi inventore, saepe consequuntur nobis vel? Facere qui porro voluptate accusantium quisquam fugiat explicabo molestiae id deserunt?
            </Box>
        </Drawer>
    )
}

export default ReservationDrawer