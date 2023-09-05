const prompt = require("prompt-sync")();

// Classe para pessoa (uma pessoa física)
class pessoa {
  constructor(nome, idade, altura, peso) {
    this.nome = nome;
    this.idade = idade;
    this.altura = altura;
    this.peso = peso;
  }

  // Metodo que verifica os atributos dessa pessoa
  verificarPessoa() {
    console.log(`
    Nome: ${this.nome},
    Idade: ${this.idade} anos,
    Altura: ${this.altura} m,
    Peso: ${this.peso} kg
    `);
  }
}

// Classe para pessoa (documentação)
class pessoaFisica extends pessoa {
  constructor(nome, idade, cpf, email, telefone) {
    super(nome, idade);

    this.cpf = cpf;
    this.email = email;
    this.telefone = telefone;
  }

  verificarPessoaFisica() {
    console.log(`
    Nome: ${this.nome},
    Idade: ${this.idade} anos,
    CPF: ${this.cpf},
    E-mail: ${this.email}@gmail.com,
    Telefone: 55 ${this.telefone}
    `);
  }
}

// Classe para conta do banco
class contaBanco extends pessoaFisica {
  constructor(nome, cpf, agencia, conta, saldo = 0) {
    super(nome);

    // Devido a um pequenino erro, estou declarando este elemento de forma manual, diminuindo assim o processamento mas fazendo meu código funcionar 
    this.cpf = cpf;
    this.agencia = agencia;
    this.conta = conta;
    this.saldo = saldo;

    // Variável de controle para extrato
    var gratuito = 3;
    this.gratuito = gratuito;
  }

  verificarPessoaBanco() {
    console.log(`
    Nome: ${this.nome},
    CPF: ${this.cpf},
    Agencia: ${this.agencia},
    Conta: ${this.conta},
    Saldo: R$ ${this.saldo},00
    `);
  }

  selecionar() {
    console.log(`
    Qual operação deseja realizar?
    1 - Depósito
    2 - Saque
    3 - Imprimir extrato
    4 - Transferência
    `);
    var selecao = parseInt(prompt("Digite um número: "));
    switch (selecao) {
      case 1:
        console.log("Operação [1] selecionada: Depósito");0
        return this.depositar();
      case 2: 
        console.log("Operação [2] selecionada: Saque");
        return this.sacar();
      case 3:
        console.log("Operação [3] selecionada: Imprimir extrato");
        return this.imprimirExtrato();
      case 4:
        console.log("Operação [4] selecionada: Transferência");
        return this.transferir();
      default:
        console.log("Selecione um dos números acima!");
        return this.selecionar();
    }
  }

  depositar() {
    let valor = parseInt(prompt("Digite um número ou digite 0 para cancelar: "));
    if (valor > 0) {
      this.saldo += valor
      console.log(`[SUCESSO]: R$ ${valor},00 depositados à conta.`);
      return this.selecionar();
    } else if (valor == 0) {
      return this.cancelar();
    } else {
      console.log("[INVÁLIDO]: digite um número positivo.");
      return this.depositar();
    }
  }

  sacar() {
    let valor = parseInt(prompt("Digite um número ou digite 0 para cancelar: "));
      if (valor > this.saldo) {
        console.log(`[INVÁLIDO]: digite um valor disponível em seu saldo.`);
        return this.sacar();
      } else if (valor <= this.saldo) {
        this.saldo -= valor
        console.log(`[SUCESSO]: R$ ${valor},00 descontados da conta.`);
        return this.selecionar()
      } else if (valor == 0) {
        return this.cancelar();
      } else {
        console.log("[INVÁLIDO]: digite um número positivo.");
        return this.depositar();
      }
  }


  imprimirExtrato() {
    if (this.gratuito > 0) {
      console.log(`[EXTRATO]: A conta: ${this.conta} da agencia: ${this.agencia} em nome de: ${this.nome} com documento tipo Cadastro de Pessoa Física: ${this.cpf} possui R$ ${this.saldo},00 na conta.`);
      this.gratuito -= 1;
      console.log(`[ATENÇÂO]: Restam ${this.gratuito} extrato${this.plural(this.gratuito)} gratuito${this.plural(this.gratuito)}.`); 
      return this.selecionar();
    } else if (this.gratuito == 0 && this.saldo > 0) {
      console.log(`[EXTRATO]: A conta: ${this.conta} da agencia: ${this.agencia} em nome de: ${this.nome} com documento tipo Cadastro de Pessoa Física: ${this.cpf} possui R$ ${this.saldo},00 na conta.`);
      this.saldo = this.saldo - 2;
      console.log(`[ATENÇÂO]: Nenhum extrato gratuito restante. R$ 2,00 foram descontados de sua conta restando: R$ ${this.saldo},00.`);
      return this.selecionar();
    } else if (this.gratuito == 0 && this.saldo <= 0) {
      console.log(`[INVÁLIDO]: Saldo insufiente! O saldo possui número inferior a R$ 2,00.`);
      return this.selecionar();
    }
  }

  // Por incompetencia minha eu não vou terminar isso
  transferir() {
    console.log("[MANUTENÇÂO]: Desculpe-nos mas o sistema de transferência está atualmente em manutenção!");

    return this.selecionar();

    var contaNome = (prompt("Digite o nome da conta conta: "));
    // Era pra pegar a String e virar Variável
    contaNome = eval(contaNome);
    console.log(`
    Qual valor deseja transferir à conta de ${contaNome}:
    1 - R$ 10,00
    2 - R$ 25,00
    3 - R$ 50,00
    4 - R$ 100,00
    5 - R$ 200,00
    6 - R$ 500,00
    7 - R$ 1000,00
    8 - Outro valor: 
    0 - Cancelar operação (X)
    `);
    var valor = parseInt(prompt("Digite um número: "))
    if (valor == 1 && this.saldo > valor) {
      this.saldo -= 10;
      contaNome.saldo += 10;
      console.log(`[SUCESSO]: R$ ${valor},00 foram transferidos para a conta de ${contaNome}!`);
      contaNome.verificarPessoaBanco();
    } else if (valor == 2 && this.saldo > valor) {
      this.saldo -= 25;
      contaNome.saldo += 25;
      console.log(`[SUCESSO]: R$ ${valor},00 foram transferidos para a conta de ${contaNome}!`);
      contaNome.verificarPessoaBanco();
    } else if (valor == 3 && this.saldo > valor) {
      this.saldo -= 50;
      contaNome.saldo += 50;
      console.log(`[SUCESSO]: R$ ${valor},00 foram transferidos para a conta de ${contaNome}!`);
      contaNome.verificarPessoaBanco();
    } else if (valor == 4 && this.saldo > valor) {
      this.saldo -= 100;
      contaNome.saldo += 100;
      console.log(`[SUCESSO]: R$ ${valor},00 foram transferidos para a conta de ${contaNome}!`);
      contaNome.verificarPessoaBanco();
    } else if (valor == 5 && this.saldo > valor) {
      this.saldo -= 200;
      contaNome.saldo += 200;
      console.log(`[SUCESSO]: R$ ${valor},00 foram transferidos para a conta de ${contaNome}!`);
      contaNome.verificarPessoaBanco();
    } else if (valor == 6 && this.saldo > valor) {
      this.saldo -= 500;
      contaNome.saldo += 500;
      console.log(`[SUCESSO]: R$ ${valor},00 foram transferidos para a conta de ${contaNome}!`);
      contaNome.verificarPessoaBanco();
    } else if (valor == 7 && this.saldo > valor) {
      this.saldo -= 1000;
      contaNome.saldo += 1000;
      console.log(`[SUCESSO]: R$ ${valor},00 foram transferidos para a conta de ${contaNome}!`);
      contaNome.verificarPessoaBanco();
    } else if (valor == 8 && this.saldo > valor) {
      valoNovo = parseInt(prompt("Digite o valor que deseja transferir: "))
      if (valorNovo == 0 || valorNovo < 0) {
        console.log(`[INVÁLIDO]: Valor inválido! Digite um número positivo.`);
        return
      }
      this.saldo -= valorNovo;
      contaNome.saldo += valorNovo;
      console.log(`[SUCESSO]: R$ ${valor},00 foram transferidos para a conta de ${contaNome}!`);
      contaNome.verificarPessoaBanco();
    } else if (valor > this.saldo) {
      console.log(`[INVÁLIDO]: Saldo insufiente! Selecione um valor válido.`);
      return this.transferir();
    } else if (valor == 0) {
      this.cancelar();
    } else {
      console.log(`[INVÁLIDO]: Valor inválido! Digite uma das opções acima.`);
      return this.transferir();
    }
  }

  cancelar() {
    console.log("Operação cancelada, selecione outra operação!");
    return this.selecionar();
  }

  //ignorar por hora
  plural(n) {
    if(n > 1 || n < 1) {
      return "s"
    } else {
      return ""
    }
  }
}

// Pessoa 
// var joao = new pessoa("João", 15, 1.70, 50);
// joao.verificarPessoa();

// Pessoa Fisica
// var joaoFisico = new pessoaFisica("João", 15, "028.874.778-03", "joaozinho23", "(65) 99936-0932")
// joaoFisico.verificarPessoaFisica();

// Pessoa em conta de banco
var joaoBanco = new contaBanco("João", "028.874.778-03", "0164-9", "35.665-8", 1000)
joaoBanco.verificarPessoaBanco();
joaoBanco.selecionar();

var contaTeste = new contaBanco("teste", "123.456.789-00", "0123-0", "11.222-3", 0)

