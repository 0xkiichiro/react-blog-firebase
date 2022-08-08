import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Typography,
  Link,
} from "@mui/material";

import aboutDB from "./aboutDB";

const About = () => {
  return (
    <div>
      <Typography variant="h4" color="white" sx={{ marginTop: "2rem" }}>
        This project is made by 0xkiichiro using..{" "}
        <Link
          href="https://github.com/0xkiichiro"
          variant="body1"
          style={{ display: "block" }}
        >
          Click here to check more of my work!
        </Link>
      </Typography>
      <Container sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {aboutDB.map((item, index) => (
            <Card sx={{ width: "345px" }}>
              <CardHeader title={item.title} />
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
            </Card>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default About;
