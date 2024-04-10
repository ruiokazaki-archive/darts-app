import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../lib/shadcn/utils';

const sheetVariants = cva('bg-zinc-800 drop-shadow', {
  variants: {
    size: {
      default: 'w-full h-full',
    },
    radius: {
      default: 'rounded-lg',
    },
  },
  defaultVariants: {
    size: 'default',
    radius: 'default',
  },
});

export interface DivProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sheetVariants> {
  asChild?: boolean;
}

const Sheet = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        className={cn(sheetVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Sheet.displayName = 'Sheet';

export { Sheet, sheetVariants };
