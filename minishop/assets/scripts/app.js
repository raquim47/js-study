class Product {
  constructor(title, imgUrl, desc, price) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.desc = desc;
    this.price = price;
  }
}
// attr 담당
class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

// 컴포넌트 출력 담당
class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const $rootElement = document.createElement(tag);
    if (cssClasses) {
      $rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        $rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append($rootElement);
    return $rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];
  constructor(renderHookId) {
    super(renderHookId, false);
    this.orderProducts = () => {
      // 화살표 함수는 자신만의 this 바인딩을 생성하지 않고, 그 대신 상위 스코프의 this를 참조
      console.log('ordering');
    };
    this.render();
  }
  // updatedItems가 value로 전달
  set cartItem(value) {
    this.items = value;
    this.$total.innerText = `Total : \$${this.totalAmount.toFixed(2)}`;
  }

  get totalAmount() {
    const sum = this.items.reduce((prev, curr) => prev + curr.price, 0);
    return sum;
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItem = updatedItems;
  }

  render() {
    const $cartEl = this.createRootElement('section', 'cart');
    $cartEl.innerHTML = `
      <h2>Total : \$${0}</h2>
      <button>Order Now</button>
    `;
    const orderBtn = $cartEl.querySelector('button');
    // orderBtn.addEventListener('click', () => this.orderProducts());
    orderBtn.addEventListener('click', this.orderProducts);
    this.$total = $cartEl.querySelector('h2');
  }
}
// 단일 상품 아이템을 렌더링
class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const $prodEl = this.createRootElement('li', 'product-item');
    $prodEl.innerHTML = `
        <div>
          <img src="${this.product.imgUrl} alt="${this.product.title}"">
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.desc}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const $addCartBtn = $prodEl.querySelector('button');
    // addCartBtn.addEventListener('click', this.addToCart);
    // 이벤트 주체에 this를 바인딩한다. 현재 this는 button 요소
    $addCartBtn.addEventListener('click', this.addToCart.bind(this));
    // class의 this를 바인딩해줌으로서 해결
  }
}

// 상품 리스트, ul을 렌더링
class ProductList extends Component {
  // private field 클래스 내부에서만 접근 가능한 필드를 선언하는데 사용
  #products = [];

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.fetchProducts();
  }

  fetchProducts() {
    this.#products = [
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
    for (const prod of this.#products) {
      new ProductItem(prod, 'product-list');
    }
  }

  render() {
    this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'product-list'),
    ]);
    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}

// 카트와 상품 리스트를 렌더링
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
  // static cart를 사용한다는 것을 명시해주기 위함
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  // addProduct를 cart에서 찾지 못함
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();

// public 프로퍼티, 메서드는 클래스와 인스턴스 외부에서 접근 가능
