import { ProductProps } from "./Product.props";
import styles from "./Product.module.scss";
import cn from "classnames";
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import { Divider } from "../Divider/Divider";
import { Button } from "../Button/Button";
import Image from "next/image";
import { declOfNum, priceRu } from "../../helpers/helpers";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { motion } from "framer-motion";

export const Product = motion(
  forwardRef(
    (
      { product, className, layout, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ) => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
      const reviewRef = useRef<HTMLDivElement>(null);
      const [imageSrc, setImageSrc] = useState("../blank-img.svg");

      const variants = {
        visible: { opacity: 1, height: "auto" },
        hidden: { opacity: 0, height: 0 },
      };

      useEffect(() => {
        if (product.image.includes("http")) {
          setImageSrc(product.image);
        } else {
          setImageSrc(process.env.NEXT_PUBLIC_DOMAIN + product.image);
        }
      }, []);

      const scrollToReview = () => {
        setIsReviewOpened(true);
        setTimeout(() => {
          reviewRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          reviewRef.current?.focus();
        }, 100);
      };

      return (
        <div className={className} {...props} ref={ref}>
          <Card className={styles.product} data-product>
            <div className={styles.logo}>
              <Image
                src={imageSrc}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              <span>
                <span className="visualyHidden">????????</span>
                {priceRu(product.price)}
              </span>
              {product.oldPrice && (
                <Tag className={styles.oldPrice} color="green">
                  <span className="visualyHidden">????????????</span>
                  {priceRu(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              <span className="visualyHidden">????????????</span>
              {priceRu(product.credit)}/
              <span className={styles.month}>??????</span>
            </div>
            <div className={styles.rating}>
              <span className="visualyHidden">
                {"??????????????" + (product.reviewAvg ?? product.initialRating)}
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
              ????????
            </div>
            <div className={styles.creditTitle} aria-hidden={true}>
              ?? ????????????
            </div>
            <div className={styles.rateTitle}>
              <a href="#ref" onClick={scrollToReview}>
                {product.reviewCount}{" "}
                {declOfNum(product.reviewCount, ["??????????", "????????????", "??????????????"])}
              </a>
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
                  <div className={styles.advTitle}>????????????????????????</div>
                  <div>{product.advantages}</div>
                </div>
              )}
              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.advTitle}>????????????????????</div>
                  <div>{product.disadvantages}</div>
                </div>
              )}
            </div>
            <div className={styles.actions}>
              <Button appearance="primary">???????????? ??????????????????</Button>
              {product.reviews.length > 0 && (
                <Button
                  appearance="ghost"
                  className={styles.reviewButton}
                  arrow={isReviewOpened ? "down" : "right"}
                  onClick={() => setIsReviewOpened(!isReviewOpened)}
                  aria-expanded={isReviewOpened}
                >
                  ???????????? ????????????
                </Button>
              )}
            </div>
          </Card>
          {product.reviews.length > 0 && (
            <motion.div
              animate={isReviewOpened ? "visible" : "hidden"}
              variants={variants}
              initial="hidden"
            >
              <Card
                color="blue"
                className={cn(styles.reviews, {
                  [styles.opened]: isReviewOpened,
                  [styles.closed]: !isReviewOpened,
                })}
                ref={reviewRef}
                tabIndex={isReviewOpened ? 0 : -1}
              >
                {product.reviews.map((r) => (
                  <div key={r._id}>
                    <Review review={r} />
                    <Divider />
                  </div>
                ))}
                <ReviewForm productId={product._id} />
              </Card>
            </motion.div>
          )}
        </div>
      );
    }
  )
);
