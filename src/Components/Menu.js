import { Menu } from '@material-ui/core'
import React from 'react'
const Menue = [
{
    id : 1,
    text : 'Dashboard',
    icon : 'fe-airplay mr-1',
    link : '/dashboard'
},
{
    id : 2,
    text : 'Registration',
    icon : 'fe-grid mr-1',
    subMenue : [
        {
            id : 1,
            text : 'Branch',
            icon : 'fas fa-house-user mr-1',
            link : '/branch/add',
            operations : ['insert','update','delete']
        },
        {
            id : 2,
            text : 'Employee',
            icon : 'fas fa-users mr-1',
            link : '/employee/add',
            operations : ['insert','update','delete']

        }
    ]
}
] 

export default Menue;