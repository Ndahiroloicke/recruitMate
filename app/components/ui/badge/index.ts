import { cva, type VariantProps } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
    'badge',
    {
        variants: {
            color: {
                gray: 'gray',
                blue: 'blue',
                green: 'green',
                red: 'red',
                orange: 'orange',
                purple: 'purple',
            },
            size: {
                xs: 'px-0.5 py-0 text-captionM',
                sm: 'px-[0.1875rem] py-0.5 text-captionM',
                md: 'px-1 py-0.5 text-captionL',
                lg: 'px-1.5 py-1 text-captionL',
            },
            stroke: {
                none: 'border-0',
                solid: 'border border-solid border-border-alpha',
            },
            shape: {
                rounded: 'rounded-md',
                pill: 'rounded-full',
            },
        },
        defaultVariants: {
            color: 'gray',
            size: 'sm',
            shape: 'rounded',
            stroke: 'solid',
        },
    },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
