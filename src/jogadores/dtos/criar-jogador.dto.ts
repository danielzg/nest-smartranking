import { IsEmail, IsNotEmpty } from "class-validator";

export class CriarJogadorDTO {
     @IsNotEmpty()
     numero_telefone: string;

     @IsEmail()
     email: string;

     @IsNotEmpty()
     nome: string;
     ranking: string;
     posicao_ranking: number;
     url_foto_jogador: string
}