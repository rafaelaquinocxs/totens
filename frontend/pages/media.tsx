import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { 
  UploadCloud, 
  Image, 
  FileVideo, 
  Trash2, 
  GripVertical,
  ChevronRight,
  ChevronDown,
  Clock 
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface MediaItem {
  id: string;
  name: string;
  type: "video" | "image";
  size: string;
  date: string;
  campaignEnd?: string;
}

interface Totem {
  id: string;
  name: string;
  location: string;
  mediaItems: MediaItem[];
}

const SortableMediaItem = ({ item }: { item: MediaItem }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center gap-4">
        <button {...attributes} {...listeners} className="cursor-grab hover:text-accent">
          <GripVertical className="w-5 h-5" />
        </button>
        {item.type === "video" ? (
          <FileVideo className="w-8 h-8 text-accent" />
        ) : (
          <Image className="w-8 h-8 text-accent" />
        )}
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-muted-foreground">
            {item.size} • {item.date}
          </p>
          {item.campaignEnd && (
            <div className="flex items-center gap-1 text-xs text-accent mt-1">
              <Clock className="w-3 h-3" />
              <span>Campanha termina em: {item.campaignEnd}</span>
            </div>
          )}
        </div>
      </div>
      <button className="p-2 text-muted-foreground hover:text-destructive rounded-full hover:bg-destructive/10 transition-colors">
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default function Media() {
  const [selectedTotem, setSelectedTotem] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const totems: Totem[] = [
    {
      id: "1",
      name: "Totem do Shopping",
      location: "Entrada Principal",
      mediaItems: [
        {
          id: "1",
          name: "campanha-verao.mp4",
          type: "video",
          size: "12,5 MB",
          date: "22/03/2024",
          campaignEnd: "30/04/2024",
        },
        {
          id: "2",
          name: "promocao-primavera.jpg",
          type: "image",
          size: "2,8 MB",
          date: "21/03/2024",
          campaignEnd: "15/04/2024",
        },
      ],
    },
    {
      id: "2",
      name: "Totem da Praça de Alimentação",
      location: "Praça de Alimentação - Piso 2",
      mediaItems: [
        {
          id: "3",
          name: "promo-restaurantes.jpg",
          type: "image",
          size: "1,5 MB",
          date: "20/03/2024",
          campaignEnd: "10/04/2024",
        },
      ],
    },
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const totem = totems.find(t => t.id === selectedTotem);
      if (!totem) return;

      const oldIndex = totem.mediaItems.findIndex(item => item.id === active.id);
      const newIndex = totem.mediaItems.findIndex(item => item.id === over.id);

      totem.mediaItems = arrayMove(totem.mediaItems, oldIndex, newIndex);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Gerenciador de Mídia</h1>
          <button className="flex items-center gap-2 px-4 py-2 text-foreground bg-accent hover:bg-accent/90 rounded-md transition-colors">
            <UploadCloud className="w-5 h-5" />
            Upload de Mídia
          </button>
        </div>

        <div className="grid gap-4">
          {totems.map((totem) => (
            <Card key={totem.id} className="bg-card">
              <CardContent className="p-0">
                <button
                  onClick={() => setSelectedTotem(selectedTotem === totem.id ? null : totem.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-secondary/10 transition-colors"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{totem.name}</h2>
                    <p className="text-sm text-muted-foreground">{totem.location}</p>
                  </div>
                  {selectedTotem === totem.id ? (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {selectedTotem === totem.id && (
                  <div className="p-6 pt-0">
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={totem.mediaItems}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-4">
                          {totem.mediaItems.map((item) => (
                            <SortableMediaItem key={item.id} item={item} />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}