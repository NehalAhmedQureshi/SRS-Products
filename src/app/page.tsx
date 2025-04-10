import ApiManager from "./lib/ApiManager/ApiManager";
import { capitalizeWord } from "./lib/CapatializeWord";
import styles from "./ui/page.module.css";
import { Star } from "@mui/icons-material";
import { Chip, Typography, Box, Paper, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
export default async function Home() {
  const products = await ApiManager({ path: "products", method: "get" });
  const categories = await ApiManager({ path: "products/categories", method: "get" });
  console.log("🚀 ~ Home ~ products:", products)
  console.log("🚀 ~ Home ~ categories:", categories)
  return (
    <Box className={styles.page}>
      <Typography variant={'h4'} sx={{ textAlign: 'center', mb: 4 }} fontWeight='bold'>Categories ({categories?.length || 0})</Typography>
      <Box className={styles.productContainer}>
        {categories?.map((category: categoryType, index: number) => (
          <Link href={`/products/${category?.slug}`}>
            <Chip
              key={index}
              label={capitalizeWord(category?.name)}
              sx={{
                bgcolor: 'lightGrey',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 5
                }
              }}
            /></Link>
        ))}
      </Box>
      <Typography variant={'h4'} sx={{ textAlign: 'center', mb: 4 }} fontWeight='bold'>Products ({products?.products?.length || 0})</Typography>
      <Box className={styles.productContainer}>
        {products?.products?.map((product: productType, index: number) => (
          <Paper
            elevation={5}
            key={index}
            sx={{
              bgcolor: 'lightGrey',
              '&:hover': {
                boxShadow: 15
              }
            }}
            className={styles.product}
          >
            <Image src={product?.thumbnail} width={200} height={200} alt={'no image'} />
            <Typography variant='h5' fontWeight='550'>{product.title}</Typography>
            <Typography>{product.description}</Typography>
            <Stack direction='row' justifyContent='space-between' width='100%'>
              <Typography>Price: ${product.price || 0}</Typography>
              <Typography>Rating: <Star sx={{ color: 'yellow' }} />{product.rating || 0}</Typography>
            </Stack>
            <Typography>Discount Percentage: {product.discountPercentage}%</Typography>
            <Stack direction='row' justifyContent='space-between' width='100%'>
              <Typography>Stock: {product.stock}</Typography>
              <Typography>Category: <Chip color='primary' label={capitalizeWord(product?.category || '--')} /></Typography>
            </Stack>
            <Typography>Brand: {product.brand}</Typography>
            {/* <p>Images: {product.images}</p> */}
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
export type productType = {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};
export type categoryType = {
  name: string;
  slug: string;
  url: string;
};