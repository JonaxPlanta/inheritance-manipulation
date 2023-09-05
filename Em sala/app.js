class Pessoa { //Classe Pai
  constructor(nome, telefone, email) {
      this.nome = nome;
      this.telefone = telefone;
      this.email = email;
  }
  falar() {
      console.log(`${this.nome} está falando`);
  }
  andar() {
      console.log(`${this.nome} está andando`);
  }
}

class PessoaFisica extends Pessoa { //Classe Filho1
  constructor(nome, telefone, email, cpf) {
      super(nome, telefone, email);
      this.cpf = cpf;
  }
}
class PessoaJuridica extends Pessoa { //Classe Filho2
  constructor(nome, telefone, email, cnpj) {
      super(nome, telefone, email);
      this.cnpj = cnpj;
  }

  // exemplo 1
  pagarSalarios() {
      console.log(`${this.nome} pagou os salários`);
  }
  //exemplo 2
  pagarSalarios() {
      super.andar();
      console.log(`${this.nome} pagou os salários`);
  }

}
let pessoa1 = new PessoaFisica("Jose", "123456",
  "jose@jose.com", "123456");
pessoa1.andar();
console.log(pessoa1.nome, pessoa1.cpf);
let pessoa2 = new PessoaJuridica("Maria", "654312",
  "maria@maria.com", "654312");
pessoa2.andar();
pessoa2.pagarSalarios();