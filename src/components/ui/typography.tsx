import { cn } from '@/lib/shadcn/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const typographyVariants = cva('text-foreground text-white', {
  variants: {
    variant: {
      h1: 'font-inter font-extrabold text-5xl tracking-wide',
      h2: 'font-inter font-semibold text-3xl tracking-wide',
      h3: 'font-inter font-semibold text-2xl tracking-wide',
      h4: 'font-inter font-semibold text-xl tracking-wide',
      large: 'font-inter font-semibold text-lg',
      lead: 'font-inter font-normal text-xl',
      p: 'font-inter font-normal text-base',
      'p-bold': 'font-inter font-bold text-base',
      body: 'font-inter font-normal text-sm',
      'body-bold': 'font-inter font-bold text-sm',
      small: 'font-inter font-medium text-sm',
      detail: 'font-inter font-medium text-xs leading-5',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

type VariantPropType = VariantProps<typeof typographyVariants>;

const variantElementMap: Record<
  NonNullable<VariantPropType['variant']>,
  string
> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  large: 'p',
  lead: 'p',
  p: 'p',
  'p-bold': 'p',
  body: 'p',
  'body-bold': 'p',
  small: 'p',
  detail: 'p',
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: string;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, asChild, ...props }, ref) => {
    const Comp = asChild
      ? Slot
      : as ?? (variant ? variantElementMap[variant] : undefined) ?? 'div';
    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Typography.displayName = 'Typography';

export { Typography, typographyVariants };

type TypographyVariantType = NonNullable<
  VariantProps<typeof typographyVariants>['variant']
>;

interface VariantPropsTypographyWithoutVariant
  extends Omit<VariantProps<typeof typographyVariants>, 'variant'> {
  asChild?: boolean;
}

export type { VariantPropsTypographyWithoutVariant, TypographyVariantType };
