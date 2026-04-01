import { Shield, Eye } from "lucide-react";
import { Role } from "@/data/mockData";

interface RoleSwitcherProps {
  role: Role;
  onRoleChange: (role: Role) => void;
}

const RoleSwitcher = ({ role, onRoleChange }: RoleSwitcherProps) => {
  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary border border-border">
      <button
        onClick={() => onRoleChange("viewer")}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-all ${
          role === "viewer" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Eye className="h-3.5 w-3.5" /> Viewer
      </button>
      <button
        onClick={() => onRoleChange("admin")}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-all ${
          role === "admin" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Shield className="h-3.5 w-3.5" /> Admin
      </button>
    </div>
  );
};

export default RoleSwitcher;
