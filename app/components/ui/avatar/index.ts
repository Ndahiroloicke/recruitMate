import { cva, type VariantProps } from 'class-variance-authority'

export { default as Avatar } from './Avatar.vue'
export { default as AvatarFallback } from './AvatarFallback.vue'
export { default as AvatarImage } from './AvatarImage.vue'

export const avatarVariant = cva(
    'inline-flex  font-normal text-foreground select-none shrink-0 bg-background-accent-gray-subtle overflow-hidden border-2 border-white ',
    {
        variants: {
            size: {
                sm: 'h-6 w-6 text-captionL',
                base: 'h-8 w-8 text-bodyS',
                lg: 'h-10 w-10 text-bodyM',
                xl: 'h-12 w-12 text-bodyL',
            },
            shape: {
                circle: 'rounded-full',
                square: 'rounded-md',
            },
        },
    },
)

export type AvatarVariants = VariantProps<typeof avatarVariant>
