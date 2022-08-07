import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { addBlogPost } from "../../auth/firebase";
import { AuthContext } from "../../auth/AuthContext";

const InputCard = ({ post, setPost, postArr, setPostArr }) => {
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState("");

  const { currUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPost(
      (post.title = title),
      (post.imgUrl = imgUrl),
      (post.content = content),
      (post.postTime =
        new Date().getMonth() +
        "/" +
        new Date().getDate() +
        "/" +
        new Date().getFullYear()),
      (post.blogId = new Date().getTime()),
      (post.owner = currUser.displayName)
    );
    // console.log(post);
    // setPostArr([post, ...postArr]);
    addBlogPost(post);
    // console.log(postArr);
    setPost({
      title: "",
      imgUrl: "",
      content: "",
    });
  };

  return (
    <Container maxWidth="xs">
      <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
        What would you like to share?
      </Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="image-url"
          label="Image URL"
          type="url"
          id="image-url"
          autoComplete="image-url"
          onChange={(e) => setImgUrl(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="content"
          label="Content"
          type="text"
          id="content"
          autoComplete="content"
          multiline
          minRows={3}
          maxRows={10}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Post
        </Button>
      </Box>
    </Container>
  );
};

export default InputCard;
