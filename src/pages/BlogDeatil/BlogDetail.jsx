import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import {
  handleComment,
  handleDelete,
  handleLike,
  useFetchBlogPosts,
} from "../../auth/firebase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Container } from "@mui/system";
import { Box, Button, TextField } from "@mui/material";

let liked = false;
const BlogDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;
  const { currUser } = useContext(AuthContext);
  const [color, setColor] = useState("gray");
  const [comment, setComment] = useState({});

  const handleLikeAgain = () => {
    liked ? handleLike(item, -1) : handleLike(item, 1);
    liked = !liked;
    // console.log(liked);
    liked ? setColor("red") : setColor("gray");
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // console.log(comment);
    handleComment(item, comment, currUser.displayName);
  };

  return (
    <Container
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "50%" }}>
        <CardHeader
          title={item.title}
          subheader={`post by ${item.owner} on ${item.postTime}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={item.imgUrl}
          alt="Picture of your choice"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item.content}
          </Typography>
          {item.comments &&
            item.comments?.map((comment, index) => (
              <Typography
                key={index}
                sx={{ marginLeft: "4px", fontWeight: "bold" }}
              >
                {comment}
              </Typography>
            ))}
          <Box component="form" sx={{ mt: 1 }} onSubmit={handleCommentSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="comment"
              label="Comment"
              name="comment"
              autoComplete="comment"
              autoFocus
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Comment
            </Button>
          </Box>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon
                onClick={handleLikeAgain}
                style={{ color: color }}
              />
              {item.likes && (
                <Typography sx={{ marginLeft: "4px", fontWeight: "bold" }}>
                  {item.likes}
                </Typography>
              )}
            </IconButton>
            <IconButton aria-label="share">
              <CommentIcon
                onClick={() => navigate(`/details/${item.id}`, { state: item })}
              />{" "}
            </IconButton>
            <IconButton aria-label="share">
              {currUser.displayName == item.owner && (
                <DeleteIcon onClick={() => handleDelete(item.id)} />
              )}
            </IconButton>
          </div>
          <div>
            <Button
              variant="text"
              sx={{ fontWeight: "bold" }}
              onClick={() => navigate("/")}
            >
              Go Back
            </Button>
          </div>
        </CardActions>
      </Card>
    </Container>
  );
};

export default BlogDetail;
