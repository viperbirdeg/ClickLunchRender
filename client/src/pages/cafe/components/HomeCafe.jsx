import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomeCafe() {

  const navigation = useNavigate();


  useEffect(() => {
    navigation('orders')
  }, []);

  return <div className="">Home</div>;
}

export default HomeCafe;
