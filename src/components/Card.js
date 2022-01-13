import * as React from 'react';
//Material Ui Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Grid,
  Chip
} from '@mui/material'
//Router Imports
import { useNavigate } from 'react-router-dom';

export default function BlogCard(blogs) {
  const navigate = useNavigate()

  return (
    <React.Fragment>
      {blogs?.blogs?.map((blog, index) =>
        <div className='col-md-4 my-2 '>
          <Card variant="outlined" key={index} className="blogCard">
            <Box>
              <CardContent sx={{ maxHeight: "150px" }}>
                <Grid container spacing={1}>
                  <Grid item xs={7}>
                    <Typography sx={{ fontSize: 18 }} gutterBottom>
                      {blog.blogTitle}
                    </Typography>

                    <Typography noWrap sx={{
                      mb: 1.5

                    }} color="text.secondary">
                      {blog.blogSubTitle}
                    </Typography>
                    <Box>
                      {blog.category.map((cat, index) =>
                        <Chip label={cat} key={index} sx={{ ml: 0.5, mt: 1 }} />
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Author: {blog.author.name}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button size="small" sx={{ ml: "auto" }} onClick={() => navigate('/blog/' + blog.id)}>Read Blog</Button>
              </CardActions>
            </Box>
          </Card>
        </div>)
      }
    </React.Fragment >
  );
}
