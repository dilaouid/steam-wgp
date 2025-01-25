import { IStatProps } from "./Stat.props";

export const Stat = ({ icon: Icon, value, label }: IStatProps) => (
  <div className="flex items-center gap-2 text-white/80">
    <Icon size={16} className="text-white/60" />
    <div className="text-sm">
      <span className="font-medium">{value}</span> {label}
    </div>
  </div>
);
