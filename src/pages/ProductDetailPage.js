// src/pages/ProductDetailPage.js

import { useParams } from "react-router-dom";
import Product from "../components/product/Product";

const ProductDetailPage = () => {
    const { festivalId } = useParams();

    return <Product festivalId={festivalId} />;
};

export default ProductDetailPage;
