import type { FilterUnionType } from '@/types/filter-union-type';
import React from 'react';
import {
  Typography,
  type TypographyVariantType,
  type VariantPropsTypographyWithoutVariant,
} from './typography';

// Specify the variants you want to allow (linting error will be thrown when using exported component with a variant (1) not specified here or (2) not within TypographyVariant)
type AllowedVariants = FilterUnionType<
  TypographyVariantType,
  'p' | 'lead' | 'largeText' | 'mutedText' // ...smallText, etc.
>;
type HTMLTypographyElement = HTMLParagraphElement;

interface TextProps
  extends React.HTMLAttributes<HTMLTypographyElement>,
    VariantPropsTypographyWithoutVariant {
  variant?: AllowedVariants;
}

const Text = React.forwardRef<HTMLTypographyElement, TextProps>(
  ({ variant = 'p', ...props }, ref) => {
    return <Typography ref={ref} variant={variant} {...props} />;
  },
);

export { Text };
