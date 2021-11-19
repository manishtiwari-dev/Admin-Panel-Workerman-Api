import React from 'react'

interface Props {
    isPageAccess:boolean
}

const CheckPermission = (props: Props) => {
    console.log('is page acesss');
    console.log(props);
    return true;
}

export default CheckPermission
