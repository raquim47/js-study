class AgedPerson {
  printAge(){
    console.log(this.age)
  }
}
class Person extends AgedPerson {
  name = 'Max';
  constructor() {
    super();
    this.age = 30;
  }

  greet() {
    console.log('hi Im ' + this.name + ', ' + this.age);
  }
}

// function Person(){
//   this.age = 30;
//   this.name = 'Max';
//   this.greet = function(){
//     console.log('hi')
//   }
// }
// new 키워드가 하는 일 : this에 빈 객체{}를 저장, 그 다음 return this
const person = new Person();
person.greet();
person.printAge();
console.log(person.__proto__)

// 프로토 타입 내의 this 키워드는 항상 메서드를 호출하는 객체를 의미