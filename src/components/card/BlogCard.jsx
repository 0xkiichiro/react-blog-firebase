import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const BlogCard = ({ item }) => {
  console.log(item);
  return (
    <Card sx={{ width: "345px" }}>
      <CardHeader title={item.title} subheader={item.postTime} />
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
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
