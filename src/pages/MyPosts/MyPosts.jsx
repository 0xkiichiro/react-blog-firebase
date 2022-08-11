import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useFetchBlogPosts } from "../../auth/firebase";
import BlogCard from "../../components/card/BlogCard";
import Spinner from "../../assets/spinner-darkMode.gif";

const MyPosts = () => {
  const { loading, fetchedBlogs } = useFetchBlogPosts();
  const { currUser } = useContext(AuthContext);
  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <img src={Spinner} alt="spinner"></img>
        ) : (
          fetchedBlogs?.map(
            (item, index) =>
              item.owner === currUser.displayName && (
                <BlogCard key={index} item={item} />
              )
          )
        )}
      </Box>
    </Container>
  );
};

export default MyPosts;
