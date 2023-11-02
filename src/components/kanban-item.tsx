import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Item } from '@/components/types';

interface KanbanItemProps {
  item: Item;
}

export default function KanbanItem({ item }: KanbanItemProps) {
  const { attributes, listeners, transition, transform, isDragging, setNodeRef } = useSortable({
    id: item.id,
    data: {
      type: 'Item',
      item,
    },
  });

  if (isDragging)
    return (
      <div
        ref={setNodeRef}
        style={{ transition, transform: CSS.Transform.toString(transform) }}
        className="w-full h-10 opacity-60 rounded border-2 border-dashed"
      />
    );

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{ transition, transform: CSS.Transform.toString(transform) }}
      className="w-full h-10 p-2.5 rounded-md bg-muted/60 hover:bg-muted">
      <p className="text-ellipsis text-sm text-muted-foreground font-normal whitespace-nowrap overflow-hidden">
        {item.content}
      </p>
    </div>
  );
}
