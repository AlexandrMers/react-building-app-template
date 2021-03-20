import React, {memo, ReactNode} from 'react';

const Typography = ({children}: {
    children: ReactNode
}) => {
    return <h1>{children}</h1>
};

export default memo(Typography);