import { ProductProps } from "./Product.props";
import styles from "./Product.module.scss";
import cn from "classnames";
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { useState } from "react";
import { Divider } from "../Divider/Divider";
import { Button } from "../Button/Button";
import Image from "next/image";
import { declOfNum, priceRu } from "../../helpers/helpers";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";

export const Product = ({
  product,
  className,
  layout,
  ...props
}: ProductProps) => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

  return (
    <div className={className} {...props}>
      <Card className={styles.product} data-product>
        <div className={styles.logo}>
          <Image
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          <span>
            <span className="visualyHidden">цена</span>
            {priceRu(product.price)}
          </span>
          {product.oldPrice && (
            <Tag className={styles.oldPrice} color="green">
              <span className="visualyHidden">скидка</span>
              {priceRu(product.price - product.oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          <span className="visualyHidden">кредит</span>
          {priceRu(product.credit)}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}>
          <span className="visualyHidden">
            {"рейтинг" + (product.reviewAvg ?? product.initialRating)}
          </span>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {product.categories.map((c) => (
            <Tag key={c} className={styles.category} color="ghost">
              {c}
            </Tag>
          ))}
        </div>
        <div className={styles.priceTitle} aria-hidden={true}>
          цена
        </div>
        <div className={styles.creditTitle} aria-hidden={true}>
          в кредит
        </div>
        <div className={styles.rateTitle}>
          {product.reviewCount}{" "}
          {declOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
        </div>
        <Divider className={styles.hr} />
        <div className={styles.feature}>
          {product.characteristics.map((c) => (
            <div className={styles.characteristics} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles.advTitle}>Преимущества</div>
              <div>{product.advantages}</div>
            </div>
          )}
          {product.disadvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.advTitle}>Недостатки</div>
              <div>{product.disadvantages}</div>
            </div>
          )}
        </div>
        <div className={styles.actions}>
          <Button appearance="primary">Узнать подробнее</Button>
          {product.reviews.length > 0 && (
            <Button
              appearance="ghost"
              className={styles.reviewButton}
              arrow={isReviewOpened ? "down" : "right"}
              onClick={() => setIsReviewOpened(!isReviewOpened)}
              aria-expanded={isReviewOpened}
            >
              Читать отзывы
            </Button>
          )}
        </div>
      </Card>
      {product.reviews.length > 0 && (
        <Card
          color="blue"
          className={cn(styles.reviews, {
            [styles.opened]: isReviewOpened,
            [styles.closed]: !isReviewOpened,
          })}
        >
          {product.reviews.map((r) => (
            <>
              <Review review={r} key={r._id} />
              <Divider />
            </>
          ))}
          <ReviewForm productId={product._id} />
        </Card>
      )}
    </div>
  );
};
