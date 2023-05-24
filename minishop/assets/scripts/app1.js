class Product {
  constructor(title, img, desc, price) {
    this.title = title;
    this.imageUrl = img;
    this.decription = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    this.totalOutput = cartEl.querySelector('h2');
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
    console.log(this.product)
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl} alt="${this.product.title}"">
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.decription}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartBtn = prodEl.querySelector('button');
    // addCartBtn.addEventListener('click', this.addToCart);
    // 이벤트 주체에 this를 바인딩한다. 현재 this는 button 요소
    addCartBtn.addEventListener('click', this.addToCart.bind(this));
    // class의 this를 바인딩해줌으로서 해결
  }
}

class ProductList extends Component {
  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }

  fetchProducts() {
    this.products = [
      new Product(
        'Pillow',
        'http://placehold.it/320x100.png/E8117F/ffffff?text=sample',
        'A soft pillow',
        19.19
      ),
      new Product(
        'Carpet',
        'http://placehold.it/320x100.png/E8117F/ffffff?text=sample',
        'A soft Carpet',
        39.19
      ),
    ];
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.products) {
      new ProductItem(prod, 'prod-list');
    }
  }

  render() {
    this.createRootElement('ul', 'prod-list', [
      new ElementAttribute('id', 'prod-list'),
    ]);
    if (this.products && this.products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }
  render() {
    this.cart = new ShoppingCart('app');
    new ProductList('app');
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
// 필드 vs 프로퍼티

// static(정적) 필드/프로퍼티/메서드 : 클래스 자체에서 접근할 수 있으므로 인스턴스 작업이 필요 없음. -> 핼퍼 클래스, 전역 구성에 사용
// 인스턴스 필드/프로퍼티/메서드 : 인스턴스에서만 접근 가능, 재사용 로직

// 객체리터럴 vs 클래스
// 객체 리터럴:
// 1. 간단하고 명확한 문법.
// 2. 재사용성이 떨어짐 : 같은 구조를 갖는 객체를 여러 번 만들려면 같은 속성과 메소드를 복사해야 함
// 3. 생성된 각 객체가 독립적인 메소드를 가지므로 메모리 사용이 비효율적일 수 있음.
// 단일 사용 객체 혹은 간단한 구조로 사용할 때 적합.
// 클래스
// 1. 재사용성: 같은 구조를 가지는 객체를 쉽게 만들 수 있음
// 2. 메소드가 객체 인스턴스 간에 공유되므로 메모리 효율이 높음
// 3. 상속, 추상화 등 객체 지향 프로그래밍의 개념을 활용할 수 있음
// 재사용이 필요하거나 복잡한 구조를 가진 객체를 필요로 할 때 적합

// class에서 get, set
// 1. get get 키워드는 특정 속성의 값을 가져오는 메소드를 정의합니다. 이 메소드는 해당 속성에 접근할 때 자동으로 호출됩니다. 2. set set 키워드는 특정 속성의 값을 설정하는 메소드를 정의합니다. 이 메소드는 해당 속성에 값을 할당할 때 자동으로 호출됩니다. 예를 들어:

// super() 클래스의 상속 관계에서 사용됩니다. 주로 자식 클래스에서 부모 클래스의 메서드를 호출할 때 사용하는데, 특히 생성자 함수 내에서 super를 사용하면 부모 클래스의 생성자를 호출할 수 있습니다.

// class Parent {
//   constructor() {
//     console.log('Parent constructor!');
//   }
// }

// class Child extends Parent {
//   constructor() {
//     super();  // Call the parent constructor
//     console.log('Child constructor!');
//   }
// }

// let child = new Child();  // Logs "Parent constructor!" then "Child constructor!"

// 또한, super는 부모 클래스의 일반 메서드를 호출하는 데에도 사용될 수 있습니다.
// class Parent {
//   sayHello() {
//     console.log('Hello from parent!');
//   }
// }

// class Child extends Parent {
//   sayHello() {
//     super.sayHello();  // Call the parent method
//     console.log('Hello from child!');
//   }
// }

// let child = new Child();
// child.sayHello();  // Logs "Hello from parent!" then "Hello from child!"

// 부모 클래스의 메서드를 자식 클래스에서 오버라이딩하고 부모 클래스에서 호출하면 부모 메서드를 참조하는 것이 아니라 자식 클랙스의 메서드를 참조한다
