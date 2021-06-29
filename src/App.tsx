import React, { FC, memo } from "react";

import styles from "./style.module.scss";

import background from "./example-img.jpg";

import Typography from "@/components/Typography";

const App: FC = (props) => {
  return (
    <div className={styles.App}>
      <h1 className="red">React App with custom webpack config</h1>
      <img src={background} alt="horses" />
      <Typography>Helloo))</Typography>
    </div>
  );
};

export default memo(App);
