import { Clients } from "./clients"
import { Team } from "./team"
import { Users } from "./users"

export class Ticket {
    id?: number
    owner?: Users
    user?: Users
    title?: string
    description?: string
    due_date?: string
    priority?: Priority
    status?: Status
    client?: Clients
    team?: Team
    created_at?: Date
    updated_at?: Date
}

enum Status {
    Aguardando,
    Execução,
    Revisão,
    Finalizado
}

type Priority = {
    priority: "ALTA" | "MEDIA" | "BAIXA"
}
