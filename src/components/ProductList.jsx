import React from "react";
import ProductCard from "./ProductCard";
import { useCrocsProductStore } from "../store/CrocsProductStore";
import "./scss/WomenComponents.scss";

export default function ProductList() {
  //  store에서 컬러 필터 포함된 최종 필터링 결과 가져오기
  const products = useCrocsProductStore((s) => s.filteredItems());

  return (
    <section className="product-card__section_wrap">
      <div className="product-card__wrap">
        <ul className="product-card__item_list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  );
}
