import { Body, Controller, Delete, Get, Param, 
        Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criaJogadorDTO: CriarJogadorDTO
    ){
        await this.jogadoresService.criarJogador(criaJogadorDTO)
    }

    @Put(':_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() criaJogadorDTO: CriarJogadorDTO,
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
    ){
        await this.jogadoresService.atualizarJogador(_id, criaJogadorDTO)
    }

    @Get(":_id")
    async buscaJogadorPorId(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id:string
        ): Promise<Jogador>{
        return await this.jogadoresService.buscarJogadorPorId(_id);
    }

    @Get()
    async listarJogadores(): Promise<Jogador[]>{
        return await this.jogadoresService.buscarJogadores()
    }

    @Delete(':_id')
    async deletarJogador(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id:string
    ): Promise<void>{
        this.jogadoresService.deletarJogador(_id)
    }

    

}
