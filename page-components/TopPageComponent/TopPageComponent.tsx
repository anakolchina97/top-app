import styles from "./TopPageComponent.module.scss";
import cn from "classnames";
import { TopPageComponentProps } from "./TopPageComponent.props";
import { Htag, Tag } from "../../components";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { HhData } from "../../components/HhData/HhData";
import { Advantages } from "../../components/Advantages/Advantages";
import { Sort } from "../../components/Sort/Sort";
import { SortEnum } from "../../components/Sort/Sort.props";
import { useReducer } from "react";
import { SortReducer } from "./sort.reducer";

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps) => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    SortReducer,
    {
      products,
      sort: SortEnum.Rating,
    }
  );

  const setSort = (sort: SortEnum) => {
    dispatchSort({
      type: sort,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag color="grey" size="m" aria-label={products.length + "элементов"}>
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div role="list">
        {sortedProducts && sortedProducts.map((p) => <p>{p.title}</p>)}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag="h2">Преимущства</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag="h2">Получаемые навыки</Htag>
      {page.tags.map((t) => (
        <Tag key={t} color="primary">
          {t}
        </Tag>
      ))}
    </div>
  );
};