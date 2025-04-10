import React from "react";
import styles from "../../ui/page.module.css";
import { Star,ArrowBack } from "@mui/icons-material";
import { Stack, Box, Typography, Chip, Paper } from "@mui/material";
import Image from "next/image";
import { capitalizeWord } from "../../lib/CapatializeWord";
import ApiManager from "../../lib/ApiManager/ApiManager";
// import { productType } from "../../../page.tsx";
import Link from "next/link";
import BackButton from "../../ui/components/BackButton";
export default async function page({
  params,
}:any) {
  const category = params?.category;
  const categoryRelatedProducts = await ApiManager({
    path: `products/category/${category}`,
    method: "get",
  });
  return (
    <Box>
      <BackButton />
      <Typography variant="h6" textAlign='center' fontWeight="550" mb={5}>
        {" "}
        Search Related to: {capitalizeWord(category || "--")}{" "}
      </Typography>
      <Box className={styles.productContainer}>
        {categoryRelatedProducts?.products?.map(
          (product: any, index: number) => (
            <Paper
              elevation={5}
              key={index}
              sx={{
                bgcolor: "lightGrey",
                "&:hover": {
                  boxShadow: 15,
                },
              }}
              className={styles.product}
            >
              <Image
                src={product?.thumbnail}
                width={200}
                height={200}
                alt={"no image"}
              />
              <Typography variant="h5" fontWeight="550">
                {" "}
                {product.title}{" "}
              </Typography>
              <Typography> {product.description} </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <Typography>Price: ${product.price || 0} </Typography>
                <Typography>
                  {" "}
                  Rating: <Star sx={{ color: "yellow" }} />
                  {product.rating || 0}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <Typography>Stock: {product.stock} </Typography>
                <Typography>
                  {" "}
                  Category:{" "}
                  <Chip
                    color="primary"
                    label={capitalizeWord(product?.category || "--")}
                  />
                </Typography>
              </Stack>

              {/* <p>Images: {product.images}</p> */}
            </Paper>
          )
        )}
      </Box>
    </Box>
  );
}
