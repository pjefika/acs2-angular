import { Injectable } from '@angular/core';

@Injectable()
export class ValidLoginService {

    constructor() { }

    isLogado(): Promise<boolean> {
        // Realizar correção verificação de login
        // Guardar Login e Senha do usuário e fazer comparação com a autenticação
        // Usuário pode bugar adicionando informações fake na localStorage
        let sessionObj = JSON.parse(localStorage.getItem("user"));
        if (typeof (Storage) !== "undefined" && localStorage.getItem('user')) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
}