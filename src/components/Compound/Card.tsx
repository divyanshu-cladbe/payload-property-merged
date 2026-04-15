import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardActionsProps {
  children: React.ReactNode;
  className?: string;
}

// Main Card Component
const CardRoot = React.memo<CardProps>(({ children, className }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] border",
        className
      )}
    >
      {children}
    </div>
  );
});

// Card Header Component
const CardHeader = React.memo<CardHeaderProps>(({ children, className }) => {
  return (
    <div
      className={cn("flex justify-between items-center p-6 pb-4", className)}
    >
      {children}
    </div>
  );
});

// Card Body Component
const CardBody = React.memo<CardBodyProps>(({ children, className }) => {
  return <div className={cn("px-6 pb-6", className)}>{children}</div>;
});

// Card Footer Component
const CardFooter = React.memo<CardFooterProps>(({ children, className }) => {
  return (
    <div className={cn("px-6 py-4 border-t border-gray-100", className)}>
      {children}
    </div>
  );
});

// Card Title Component
const CardTitle = React.memo<CardTitleProps>(({ children, className }) => {
  return <h2 className={cn("text-xl font-bold", className)}>{children}</h2>;
});

// Card Actions Component
const CardActions = React.memo<CardActionsProps>(({ children, className }) => {
  return <div className={cn("flex gap-2", className)}>{children}</div>;
});

// Compound Component Export
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Title: CardTitle,
  Actions: CardActions,
});

// Display names for debugging
CardRoot.displayName = "Card";
CardHeader.displayName = "Card.Header";
CardBody.displayName = "Card.Body";
CardFooter.displayName = "Card.Footer";
CardTitle.displayName = "Card.Title";
CardActions.displayName = "Card.Actions";
