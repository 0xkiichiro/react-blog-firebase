import { Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import InputCard from "../../components/input-card/InputCard";

const Dashboard = () => {
  const { currUser } = useContext(AuthContext);
  return (
    <div>
      {currUser && (
        <>
          <Typography sx={{ mt: 3 }}>Welcome {currUser.displayName}</Typography>
          <InputCard />
        </>
      )}
      Dashboard
    </div>
  );
};

export default Dashboard;
