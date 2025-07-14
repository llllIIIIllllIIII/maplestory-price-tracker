import { cn } from '@/lib/utils'

export function LoadingSpinner({ 
  className, 
  size = 'default' 
}: { 
  className?: string
  size?: 'small' | 'default' | 'large'
}) {
  const sizeClasses = {
    small: 'h-4 w-4',
    default: 'h-8 w-8',
    large: 'h-12 w-12'
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div 
        className={cn(
          'animate-spin rounded-full border-2 border-gray-300 border-t-orange-500',
          sizeClasses[size]
        )}
      />
    </div>
  )
}
