import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
    'button',
    {
        variants: {
            variant: {
                primary: 'primary',
                destructive: 'destructive',
                destructiveOutlined: 'destructive-outlined',
                destructiveTertiary: 'destructive-tertiary',
                secondary: 'secondary',
                black: 'black',
                ghost: 'ghost',
                tertiary: 'tertiary',
                link: 'link',
            },
            size: {
                xs: 'xs',
                sm: 'sm',
                md: 'md',
                lg: 'lg',
                icon: 'icon',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
