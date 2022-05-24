import { Document } from "mongoose";

export interface Jogador extends Document{
    readonly numero_telefone: string,
    readonly email: string,
    nome: string,
    ranking: string,
    posicao_ranking: number,
    url_foto_jogador: string
}