import { Box, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useFetchBlogPosts } from "../../auth/firebase";
import BlogCard from "../../components/card/BlogCard";
import InputCard from "../../components/input-card/InputCard";

const Dashboard = () => {
  const { currUser } = useContext(AuthContext);
  const [post, setPost] = useState({
    title: "",
    imgUrl: "",
    content: "",
    postTime: "",
    owner: "",
    likes: 1,
    comments: [""],
  });
  // const [postArr, setPostArr] = useState();
  const { loading, fetchedBlogs } = useFetchBlogPosts();
  // console.log(loading);
  // console.log(fetchedBlogs);
  // setPostArr(fetchedBlogs);
  return (
    <div>
      {currUser && (
        <>
          <Typography sx={{ mt: 3, color: "white" }}>
            Welcome {currUser.displayName}
          </Typography>
          <InputCard
            post={post}
            setPost={setPost}
            // postArr={postArr}
            // setPostArr={setPostArr}
            currUser={currUser}
          />
        </>
      )}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        style={{ gap: "2rem", textAlign: "center" }}
      >
        {fetchedBlogs?.map((item, index) => (
          <BlogCard key={index} item={item} />
        ))}
      </Box>
    </div>
  );
};

export default Dashboard;
