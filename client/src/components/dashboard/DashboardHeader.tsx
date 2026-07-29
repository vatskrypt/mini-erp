interface DashboardHeaderProps {
  name: string;
}

export default function DashboardHeader({
  name,
}: DashboardHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="mt-2 text-(--muted)">
        Welcome back, {name}
      </p>
    </div>
  );
}
