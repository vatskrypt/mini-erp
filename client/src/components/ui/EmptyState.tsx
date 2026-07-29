interface Props {
  title: string;
}

export function EmptyState({ title }: Props) {
  return (
    <div className="border border-(--border) p-8 text-center uppercase text-(--muted)">
      {title}
    </div>
  );
}
