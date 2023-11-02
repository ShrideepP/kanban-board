import { useDroppable } from '@dnd-kit/core';

import { SortableContext } from '@dnd-kit/sortable';
import KanbanItem from '@/components/kanban-item';
import { Badge } from '@/components/ui/badge';

import { Item } from '@/components/types';

interface KanbanLaneProps {
  name: string;
  items: Item[];
}

export default function KanbanLane({ name, items }: KanbanLaneProps) {
  const { setNodeRef } = useDroppable({
    id: name.split(' ').join('-').toLowerCase(),
    data: {
      type: 'Lane',
    },
  });

  return (
    <div ref={setNodeRef} className="w-60 h-fit space-y-4">
      <Badge>{name}</Badge>
      <div className="space-y-2.5">
        <SortableContext items={items}>
          {items.map((item) => (
            <KanbanItem key={item.id} item={item} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
