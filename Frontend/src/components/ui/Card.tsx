import React from 'react';
import clsx from 'clsx';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

type CardSectionProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => (
  <div className={clsx('overflow-hidden rounded-lg bg-white shadow', className)}>
    {children}
  </div>
);

const Header = ({ children, className }: CardSectionProps) => (
  <div
    className={clsx(
      'border-b border-gray-200 bg-white px-4 py-5 sm:px-6',
      className
    )}
  >
    <h3 className="text-lg font-medium leading-6 text-gray-900">
      {children}
    </h3>
  </div>
);

const Body = ({ children, className }: CardSectionProps) => (
  <div className={clsx('px-4 py-5 sm:p-6', className)}>
    {children}
  </div>
);

const Footer = ({ children, className }: CardSectionProps) => (
  <div
    className={clsx(
      'border-t border-gray-200 bg-gray-50 px-4 py-4 sm:px-6',
      className
    )}
  >
    {children}
  </div>
);

// attach subcomponents
Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
