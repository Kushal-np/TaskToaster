interface AvatarProps {
  src?: string;
  alt?: string;
  initials: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar = ({ src, alt, initials, size = 'md' }: AvatarProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  return (
    <span className={`inline-block overflow-hidden rounded-full bg-gray-100 ${sizeClasses[size]}`}>
      {src ? <img src={src} alt={alt} className="h-full w-full object-cover" /> : <span className="flex h-full w-full items-center justify-center font-medium text-gray-600">{initials}</span>}
    </span>
  );
};

export default Avatar;