import React, { useContext } from "react";
import style from "../styles/Error.module.scss";

import Context from "../Context";

const Error = () => {
  const { error } = useContext(Context);
  return <div className={style.error}>{error}</div>;
};

export default Error;
