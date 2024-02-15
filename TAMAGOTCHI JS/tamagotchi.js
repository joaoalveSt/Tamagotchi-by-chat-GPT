class Tamagotchi {
    constructor(name) {
      this.name = name;
      this.happiness = 50;
      this.hunger = 50;
      this.alive = true;
      this.emoji = '🐶';
    }
  
    feed() {
      this.hunger -= 10;
      if (this.hunger < 0) this.hunger = 0;
      console.log(this.name + ' foi alimentado!');
    }
  
    play() {
      this.happiness += 10;
      if (this.happiness > 100) this.happiness = 100;
      console.log(this.name + ' brincou e está feliz!');
    }
  
    walk() {
      this.happiness += 5;
      this.hunger += 5;
      if (this.happiness > 100) this.happiness = 100;
      console.log(this.name + ' deu um passeio e se divertiu!');
    }
  
    changeEmoji(emoji) {
      this.emoji = emoji;
      console.log(this.name + ' mudou de emoji para ' + emoji);
    }
  
    updateStatus() {
      this.hunger += 10;
      this.happiness -= 10;
      if (this.hunger >= 100 || this.happiness <= 0) {
        this.alive = false;
        console.log(this.name + ' morreu...');
      } else {
        console.log('Status atual de ' + this.name + ':');
        console.log('Fome: ' + this.hunger);
        console.log('Felicidade: ' + this.happiness);
      }
    }
  }
  
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('Qual o nome do seu Tamagotchi? ', (name) => {
    const tamagotchi = new Tamagotchi(name);
  
    const interval = setInterval(() => {
      tamagotchi.updateStatus();
      if (!tamagotchi.alive) {
        clearInterval(interval);
        readline.close();
      }
    }, 10000);
  
    console.log('Bem-vindo ao Tamagotchi de ' + name + '!');
  
    const menu = () => {
      console.log('\nO que você quer fazer?');
      console.log('1. Alimentar');
      console.log('2. Brincar');
      console.log('3. Passear');
      console.log('4. Mudar de Emoji');
      console.log('5. Sair');
    };
  
    menu();
  
    readline.on('line', (input) => {
      switch (input.trimnode()) {
        case '1':
          tamagotchi.feed();
          break;
        case '2':
          tamagotchi.play();
          break;
        case '3':
          tamagotchi.walk();
          break;
        case '4':
          readline.question('Qual emoji você quer usar? ', (emoji) => {
            tamagotchi.changeEmoji(emoji);
            menu();
          });
          break;
        case '5':
          console.log('Obrigado por jogar!');
          clearInterval(interval);
          readline.close();
          break;
        default:
          console.log('Opção inválida.');
          break;
      }
    });
  });
  