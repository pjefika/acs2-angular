import { Equipamento } from "viewmodel/equipamento/equipamento";
import { QueuePicture } from "./queue-picture";

export class AcsResponse {
    id?: string
    device: Equipamento
    entrada?: any
    saida?: any
    queuePictures?: QueuePicture[]
    executor: string
    acao: string
    forced: boolean
    dataInicio: Date
    dataFim?: Date
}