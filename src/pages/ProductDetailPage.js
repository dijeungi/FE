// src/pages/ProductDetailPage.js

import { useParams } from "react-router-dom";
import { DetailProvider } from "../context/DetailContext";
import Product from "../components/product/Product";

// API 호출 → Context 저장 → Context 제공 → 하위 컴포넌트에서 활용
const ProductDetailPage = () => {
    const { festivalId } = useParams();

    return (
        <DetailProvider festivalId={festivalId}>
            <Product />
        </DetailProvider>
    );
};

export default ProductDetailPage;
