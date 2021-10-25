import React from "react";
import { useHistory } from "react-router-dom";

function FormSubmitted() {

  const history = useHistory();
  let myT = setTimeout(() => {
    clearTimeout(myT);
    history.push("/");
  }, 0);

    return (<div></div>);
}

export default FormSubmitted;
