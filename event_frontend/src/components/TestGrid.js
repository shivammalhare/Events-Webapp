import React from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";

export default function TestGrid() {
  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ minHeight: 150, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <CardContent>
                <Typography variant="h6">Card {i}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
