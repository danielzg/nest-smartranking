import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    constructor(
        @InjectModel('Jogador') 
        private readonly _jogadorModel: Model<Jogador>){}

    async atualizarJogador(codigoJogador : string, dadosJogador: CriarJogadorDTO): Promise<void>{
        
        const verificaSeJaEstaCadastrado = this._jogadorModel
                                                    .findOne({codigoJogador})
                                                    .exec()
        if(!verificaSeJaEstaCadastrado){
            throw new NotFoundException(`Jogador ${dadosJogador.nome} ainda não cadastrado`);
        }

        await this._jogadorModel
                            .findOneAndUpdate(
                                {_id: codigoJogador},
                                {$set: dadosJogador}
                            ).exec();
    }
    
    async criarJogador(dadosJogadorDTO: CriarJogadorDTO): Promise<Jogador>{
        const { email } = dadosJogadorDTO;
        const verificaSeJaEstaCadastrado = await this._jogadorModel
                                                            .findOne({email})
                                                            .exec()
        
        if(verificaSeJaEstaCadastrado){
            throw new BadRequestException(`Jogador com email ${email} ja cadastrado`);
        }

        const jogadorCriado = new this._jogadorModel(dadosJogadorDTO)
        return await jogadorCriado.save();
    }

    async buscarJogadores(): Promise<Jogador[]>{
        return await this._jogadorModel
                            .find()
                            .exec()
    }

    async buscarJogadorPorId(id: string): Promise<Jogador>{ 
        const jogador = this._jogadorModel
                            .findOne({_id: id})
                            .exec()

        if(!jogador){
            throw new NotFoundException('Jogador nao encontrado')
        }

        return jogador;
    }

    async deletarJogador(_id: string): Promise<any> {
        return await this._jogadorModel
                            .deleteOne({_id})
                            .exec();
    }

}
