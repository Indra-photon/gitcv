interface DataListProps {
  items: string[];
}

export function DataList({ items }: DataListProps) {
  return (
    <ul className="space-y-3 ml-6">
      {items.map((item, index) => (
        <li key={index} className="text-pretty text-neutral-700 relative pl-6">
          <span className="absolute left-0 top-2 size-1.5 bg-neutral-400 rounded-full" />
          {item}
        </li>
      ))}
    </ul>
  );
}