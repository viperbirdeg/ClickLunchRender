import React from "react";
import { useParams } from "react-router-dom";

const CafeOrderProduct = ({}) => {
  const props = useParams();
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div>
      <h1>CafeOrderProduct</h1>
      <h2>id: {props.id}</h2>
      <h2>data: {data}</h2>
      <h2>error: {error}</h2>
      <h2>isLoading: {isLoading}</h2>
    </div>
  );
};

export default CafeOrderProduct;
