import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface RatingPage
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  isEditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
}
