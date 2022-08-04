import { Box, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import BlogCard from "../../components/card/BlogCard";
import InputCard from "../../components/input-card/InputCard";

const Dashboard = () => {
  const { currUser } = useContext(AuthContext);
  const [post, setPost] = useState({
    title: "",
    imgUrl: "",
    content: "",
    postTime: "",
  });
  const [postArr, setPostArr] = useState([]);

  return (
    <div>
      {currUser && (
        <>
          <Typography sx={{ mt: 3 }}>Welcome {currUser.displayName}</Typography>
          <InputCard
            post={post}
            setPost={setPost}
            postArr={postArr}
            setPostArr={setPostArr}
          />
        </>
      )}
      {/* <BlogCard /> */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        style={{ gap: "2rem", textAlign: "center" }}
      >
        {postArr?.map((item, index) => (
          <BlogCard key={index} item={item} />
        ))}
      </Box>
    </div>
  );
};

export default Dashboard;
