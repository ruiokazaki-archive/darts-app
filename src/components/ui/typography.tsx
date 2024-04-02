import { cn } from '@/lib/shadcn/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      h1: 'font-inter font-extrabold text-6xl tracking-tight',
      h2: 'font-inter font-semibold text-4xl tracking-tighter',
      h3: 'font-inter font-semibold text-3xl tracking-tighter',
      h4: 'font-inter font-semibold text-2xl tracking-tight',
      large: 'font-inter font-semibold text-xl',
      lead: 'font-inter font-normal text-2xl',
      p: 'font-inter font-normal text-lg',
      'p-medium': 'font-inter font-medium text-lg',
      list: 'font-inter font-normal text-lg',
      body: 'font-inter font-normal text-base',
      'body-medium': 'font-inter font-medium text-base',
      small: 'font-inter font-medium text-base',
      detail: 'font-inter font-medium text-sm',
      blockquote: 'font-inter italic text-lg',
      'inline-code': 'font-menlo font-bold text-base',
      'table-header': 'font-inter font-bold text-lg',
      'table-item': 'font-inter font-normal text-lg',
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
  'p-medium': 'p',
  list: 'li',
  body: 'p',
  'body-medium': 'p',
  small: 'p',
  detail: 'p',
  blockquote: 'blockquote',
  'inline-code': 'code',
  'table-header': 'th',
  'table-item': 'td',
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
        className={cn(
          typographyVariants({ variant, className: ['text-white', className] }),
        )}
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
