import CountUp from 'react-countup';
import { cn } from '@core/utils';

import { IStatCardProps } from './StatCard.props';

export const StatCard = ({ title, value, icon }: IStatCardProps) => (
  <div className={cn(
    "relative overflow-hidden", // Pour le pseudo-élément
    "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
    "rounded-xl p-6",
    "transform transition-all duration-300",
    "hover:scale-105 hover:shadow-xl",
    "border border-white/10",
    "backdrop-blur-xl",
    "group"
  )}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-white/80">{title}</p>
        <h3 className="text-3xl font-bold mt-2 text-white">
          <CountUp end={value} duration={2.5} separator=" " />
        </h3>
      </div>
      <div className="text-white/70 group-hover:text-white transition-colors">
        { icon }
      </div>
    </div>
  </div>
);
