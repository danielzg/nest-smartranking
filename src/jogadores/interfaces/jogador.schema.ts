import mongoose from "mongoose";

export const JogadorSchema = new mongoose.Schema({
    numero_telefone: {type: String, unique: true},
    email: {type: String, unique: true},
    nome: String,
    ranking: String,
    posicao_ranking: Number,
    url_foto_jogador: String,
}, {
    timestamps: true,
    collection: 'jogadores'
})