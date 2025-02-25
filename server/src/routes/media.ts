import express, { Request, Response } from "express";
import multer from "multer";

// Tipo pra definir como cada mídia vai ser
interface MediaItem {
  id: string;
  name: string;
  type: "video" | "image";
  url: string;
  size: number;
  totemId: string;
  order: number;
}

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Pasta temporária pra guardar arquivos

// Array temporário pra simular o banco de dados
let mediaItems: MediaItem[] = [
  {
    id: "1",
    name: "campanha-verao.mp4",
    type: "video",
    url: "/uploads/campanha-verao.mp4",
    size: 12.5,
    totemId: "1",
    order: 0,
  },
  {
    id: "2",
    name: "promo-primavera.jpg",
    type: "image",
    url: "/uploads/promo-primavera.jpg",
    size: 2.8,
    totemId: "1",
    order: 1,
  },
];

// Listar mídias de um totem
router.get("/totems/:totemId/media", (req: Request, res: Response) => {
  const { totemId } = req.params;
  const totemMedia = mediaItems
    .filter((item) => item.totemId === totemId)
    .sort((a, b) => a.order - b.order); // Ordena por "order"
  res.json(totemMedia);
});

// Upload de mídia
router.post(
  "/media/upload",
  upload.single("file"),
  (req: Request, res: Response) => {
    const { totemId } = req.body as { totemId?: string }; // Tipando o body
    const file = req.file; // O multer adiciona essa propriedade

    if (!file || !totemId) {
      res.status(400).json({ error: "Arquivo e totemId são obrigatórios" });
      return; // Só pra sair da função, sem retornar valor
    }

    const newMedia: MediaItem = {
      id: String(mediaItems.length + 1), // ID simples pra simular
      name: file.originalname,
      type: file.mimetype.startsWith("video") ? "video" : "image",
      url: `/uploads/${file.filename}`,
      size: file.size / 1024 / 1024, // Convertendo bytes pra MB
      totemId,
      order: mediaItems.filter((item) => item.totemId === totemId).length, // Ordem no final
    };

    mediaItems.push(newMedia);
    res.status(201).json(newMedia);
  }
);

// Atualizar ordem das mídias
router.put("/totems/:totemId/media/order", (req: Request, res: Response) => {
  const { totemId } = req.params;
  const { mediaOrder }: { mediaOrder: string[] } = req.body; // Define o tipo do body

  // Filtra as mídias do totem
  const totemMedia = mediaItems.filter((item) => item.totemId === totemId);

  // Reordena baseado no mediaOrder
  const reorderedMedia: MediaItem[] = mediaOrder
    .map((id) => totemMedia.find((item) => item.id === id))
    .filter((item): item is MediaItem => !!item); // Remove undefined e tipa corretamente

  // Atualiza a ordem
  reorderedMedia.forEach((item, index) => {
    item.order = index; // Atualiza o order
  });

  // Atualiza o array principal
  mediaItems = [
    ...mediaItems.filter((item) => item.totemId !== totemId), // Mantém outros totens
    ...reorderedMedia, // Adiciona as mídias reordenadas
  ];

  res.json({ message: "Ordem atualizada" });
});

export default router;