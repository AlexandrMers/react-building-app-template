import React, { memo } from 'react';

import styles from './style.module.scss';

import background from './example-img.jpg';

import Typography from '@components/Typography';

const App = () => {
    return (
        <div className={styles.App}>
            <h1 className="red">Beginning my react create App</h1>
            <img src={background} alt="horses" />
            <Typography>Helloo))</Typography>
        </div>
    );
};

export default memo(App);
