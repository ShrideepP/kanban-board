import { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

import { DndContext, DragOverlay, DragStartEvent, DragOverEvent } from '@dnd-kit/core';
import KanbanLane from '@/components/kanban-lane';
import KanbanItem from '@/components/kanban-item';

import { Item } from '@/components/types';
import JSON from '@/data.json';

export default function KanbanBoard() {
  const [data, setData] = useState<Item[]>(JSON);
  const [activeItem, setActiveItem] = useState<Item | null>(null);

  function onDragStart(event: DragStartEvent) {
    setActiveItem(event.active.data.current?.item);
  }

  function onDragOver(event: DragOverEvent) {
    if (!event.over) return;

    const isOverAItem = event.over.data.current?.type === 'Item';

    if (isOverAItem) {
      setData((prevData) => {
        const activeIndex = prevData.findIndex((item) => item.id === event.active.id);
        const overIndex = prevData.findIndex((item) => item.id === event.over?.id);

        if (prevData[activeIndex].parent !== prevData[overIndex].parent) {
          prevData[activeIndex].parent = prevData[overIndex].parent;
          return arrayMove(prevData, activeIndex, overIndex);
        }

        return arrayMove(prevData, activeIndex, overIndex);
      });
    }

    const isOverALane = event.over.data.current?.type === 'Lane';

    if (isOverALane && event.over.id) {
      setData((prevData) => {
        const activeIndex = prevData.findIndex((item) => item.id === event.active.id);
        prevData[activeIndex].parent = String(event.over?.id);
        return arrayMove(prevData, activeIndex, activeIndex);
      });
    }
  }

  function onDragEnd() {
    setActiveItem(null);
  }

  return (
    <main className="w-full min-h-screen py-20 relative font-poppins antialiased flex justify-center">
      <DndContext onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
        <div className="w-fit h-fit flex gap-x-4">
          <KanbanLane name="To Do" items={data.filter((item) => item.parent === 'to-do')} />
          <KanbanLane
            name="In Progress"
            items={data.filter((item) => item.parent === 'in-progress')}
          />
          <KanbanLane name="Done" items={data.filter((item) => item.parent === 'done')} />
        </div>
        <DragOverlay>{activeItem ? <KanbanItem item={activeItem} /> : null}</DragOverlay>
      </DndContext>
    </main>
  );
}
