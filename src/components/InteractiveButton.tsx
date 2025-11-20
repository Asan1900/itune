import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { forwardRef } from 'react';

export const InteractiveButton = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
        >
            <Button ref={ref} {...props}>
                {children}
            </Button>
        </motion.div>
    );
});

InteractiveButton.displayName = 'InteractiveButton';
