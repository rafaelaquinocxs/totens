import { useState, useEffect } from "react";
import axios from "axios";
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
  Clock,
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

// Tipo das mídias (alinhado com o backend)
interface MediaItem {
  id: string;
  name: string;
  type: "video" | "image";
  url: string;
  size: number;
  totemId: string;
  order: number;
}

interface Totem {
  id: string;
  name: string;
  location: string;
  mediaItems: MediaItem[];
}

const SortableMediaItem = ({ item }: { item: MediaItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

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
          <p className="text-sm text-muted-foreground">{item.size.toFixed(2)} MB</p>
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
  const [totems, setTotems] = useState<Totem[]>([
    { id: "1", name: "Totem do Shopping", location: "Entrada Principal", mediaItems: [] },
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Carregar mídias do backend quando a página abrir
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/totems/1/media");
        setTotems((prev) =>
          prev.map((t) => (t.id === "1" ? { ...t, mediaItems: response.data } : t))
        );
      } catch (error) {
        console.error("Erro ao carregar mídias:", error);
      }
    };
    fetchMedia();
  }, []);

  // Fazer upload de mídia
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedTotem) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("totemId", selectedTotem);

    try {
      const response = await axios.post("http://localhost:3000/api/media/upload", formData);
      setTotems((prev) =>
        prev.map((t) =>
          t.id === selectedTotem
            ? { ...t, mediaItems: [...t.mediaItems, response.data] }
            : t
        )
      );
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    }
  };

  // Reordenar mídias
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !selectedTotem) return;

    const totem = totems.find((t) => t.id === selectedTotem);
    if (!totem) return;

    const oldIndex = totem.mediaItems.findIndex((item) => item.id === active.id);
    const newIndex = totem.mediaItems.findIndex((item) => item.id === over.id);

    const newMediaItems = arrayMove(totem.mediaItems, oldIndex, newIndex);
    setTotems((prev) =>
      prev.map((t) =>
        t.id === selectedTotem ? { ...t, mediaItems: newMediaItems } : t
      )
    );

    try {
      await axios.put(`http://localhost:3000/api/totems/${selectedTotem}/media/order`, {
        mediaOrder: newMediaItems.map((item) => item.id),
      });
    } catch (error) {
      console.error("Erro ao reordenar mídias:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Gerenciador de Mídia</h1>
          <div>
            <input
              type="file"
              onChange={handleUpload}
              className="hidden"
              id="media-upload"
            />
            <label
              htmlFor="media-upload"
              className="flex items-center gap-2 px-4 py-2 text-foreground bg-accent hover:bg-accent/90 rounded-md transition-colors cursor-pointer"
            >
              <UploadCloud className="w-5 h-5" />
              Upload de Mídia
            </label>
          </div>
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