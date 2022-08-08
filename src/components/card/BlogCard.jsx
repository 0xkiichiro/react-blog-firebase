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
import { handleDelete, handleLike } from "../../auth/firebase";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

let liked = false;
const BlogCard = ({ item }) => {
  // console.log(item);
  const navigate = useNavigate();
  const { currUser } = useContext(AuthContext);
  const [color, setColor] = useState("gray");

  const handleLikeAgain = () => {
    if (currUser) {
      liked ? handleLike(item, -1) : handleLike(item, 1);
      liked = !liked;
      // console.log(liked);
      liked ? setColor("red") : setColor("gray");
    }
  };
  return (
    <Card sx={{ width: "345px" }}>
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
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon onClick={handleLikeAgain} style={{ color: color }} />
          {item.likes && (
            <Typography sx={{ marginLeft: "4px", fontWeight: "bold" }}>
              {item.likes}
            </Typography>
          )}
        </IconButton>
        <IconButton aria-label="share">
          <CommentIcon
            onClick={() =>
              navigate(`/details/${item.id}`, { state: item, liked })
            }
          />{" "}
          {item.comments.length > 1 && (
            <Typography sx={{ marginLeft: "4px", fontWeight: "bold" }}>
              {item.comments.length - 1}
            </Typography>
          )}
        </IconButton>
        <IconButton aria-label="share">
          {currUser.displayName == item.owner && (
            <DeleteIcon onClick={() => handleDelete(item.id)} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
