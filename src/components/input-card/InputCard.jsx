import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, TextareaAutosize, TextField } from "@mui/material";

const InputCard = () => {
  return (
    <Container maxWidth="xs">
      <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
        What would you like to share?
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
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
        />
        <TextareaAutosize
          margin="normal"
          required
          //   fullWidth
          name="content"
          aria-label="Content"
          type="text"
          id="content"
          autoComplete="content"
          minRows={3}
          maxRows={10}
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
