import React, { useState, useEffect } from 'react';
import { ArrowUp, Phone, Mail, MessageCircle, Share2, Heart, Bookmark, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FloatingActionsProps {
  className?: string;
}

export function FloatingActions({ className }: FloatingActionsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hotel - Find Amazing Places',
          text: 'Discover the best hotels and restaurants with AI-powered recommendations',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const actions = [
    {
      icon: Phone,
      label: 'Call Support',
      action: () => window.open('tel:+1234567890'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Mail,
      label: 'Email Us',
      action: () => window.open('mailto:support@hospitalityhub.com'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Share2,
      label: 'Share',
      action: handleShare,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: Bookmark,
      label: 'Save Page',
      action: () => {
        // Add to favorites functionality
        console.log('Added to favorites');
      },
      color: 'bg-amber-500 hover:bg-amber-600'
    }
  ];

  return (
    <div className={cn("fixed left-6 bottom-6 z-40", className)}>
      <div className="flex flex-col gap-3">
        {/* Action Buttons */}
        <div className={cn(
          "flex flex-col gap-2 transition-all duration-300 transform",
          isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}>
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.action}
              className={cn(
                "w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
                action.color,
                "text-white border-2 border-white/20"
              )}
              size="icon"
              title={action.label}
            >
              <action.icon className="h-5 w-5" />
            </Button>
          ))}
        </div>

        {/* Main Action Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110",
            "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90",
            "border-2 border-primary-foreground/20",
            isExpanded && "rotate-45"
          )}
          size="icon"
        >
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </Button>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className={cn(
              "w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-fade-in",
              "bg-muted-foreground hover:bg-foreground text-background"
            )}
            size="icon"
            title="Scroll to Top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}