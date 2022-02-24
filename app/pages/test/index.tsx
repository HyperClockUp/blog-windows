import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/user/UserSlice";
import { useAppDispatch } from "../../store/hooks";
import RouteList from "../../router";


const TestPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <h1>test page</h1>
      <button onClick={()=>{
        dispatch(logout());
        navigate(RouteList.MAIN.path);
      }}>logout</button>
    </div>
  );
};

export default TestPage;
