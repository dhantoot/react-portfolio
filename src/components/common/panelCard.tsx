import {memo, type ReactNode} from 'react';
import {Card} from '@/components/ui/card';

type PanelCardProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  headerRight?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

function PanelCard({
                     title,
                     subtitle,
                     headerRight,
                     children,
                     footer,
                     className,
                   }: PanelCardProps) {
  return (
    <Card
      className={`
        flex flex-col
        border-0 md:border md:shadow-sm
        bg-neutral-50/60
        min-h-0
        ${className ?? ''}
      `}
    >
      {/* Header */}
      {
        (title || headerRight) && (
          <div className="
          shrink-0
          flex items-center justify-between
          px-3 py-2
          border-b
          text-xs font-medium
          text-neutral-700
        ">
            <div className="flex flex-row w-full justify-between">
              {title}
              {subtitle && (
                <span className="text-[10px] text-neutral-400">
                {subtitle}
              </span>
              )}
            </div>

            {headerRight}
          </div>
        )
      }

      {/* Body */}
      <div className="
        flex-1
        min-h-0
        overflow-y-auto
        px-3 py-2
      ">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="
          shrink-0
          border-t
          px-2 py-2
          bg-white/80
        ">
          {footer}
        </div>
      )}
    </Card>
  );
}

export default memo(PanelCard);