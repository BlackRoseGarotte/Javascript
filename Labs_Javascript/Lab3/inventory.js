/**
 * @class Item
 * Представляет предмет в инвентаре.
 */
class Item {
    /**
     * @param {string} name - Название предмета.
     * @param {number} weight - Вес предмета.
     * @param {string} rarity - Редкость предмета (common, uncommon, rare, legendary).
     */
    constructor(name, weight, rarity) {
      this.name = name;
      this.weight = weight;
      this.rarity = rarity;
    }
  
    /**
     * Возвращает информацию о предмете.
     * @returns {string}
     */
    getInfo() {
      return `Name: ${this.name}, Weight: ${this.weight}kg, Rarity: ${this.rarity}`;
    }
  
    /**
     * Изменяет вес предмета.
     * @param {number} newWeight
     */
    setWeight(newWeight) {
      this.weight = newWeight;
    }
  }
  
  /**
   * @class Weapon
   * Наследуется от Item и представляет оружие.
   */
  class Weapon extends Item {
    /**
     * @param {string} name
     * @param {number} weight
     * @param {string} rarity
     * @param {number} damage - Урон оружия.
     * @param {number} durability - Прочность (0-100).
     */
    constructor(name, weight, rarity, damage, durability) {
      super(name, weight, rarity);
      this.damage = damage;
      this.durability = durability;
    }
  
    /**
     * Использует оружие, снижая его прочность.
     */
    use() {
      if (this.durability > 0) {
        this.durability -= 10;
        console.log(`${this.name} used. Durability is now ${this.durability}.`);
      } else {
        console.log(`${this.name} is broken and cannot be used.`);
      }
    }
  
    /**
     * Восстанавливает прочность до 100.
     */
    repair() {
      this.durability = 100;
      console.log(`${this.name} has been repaired.`);
    }
  }



 
  // Тестирование
  // Тестируем класс Item
const magisterium = new Item("Magisterium", 1, "legendary");
console.log(magisterium.getInfo()); 
magisterium.setWeight(2);
console.log(magisterium.getInfo()); 

// Тестируем класс Weapon
const phantomDancer = new Weapon("Phantom Dancer", 3, "epic", 35, 87);
console.log(phantomDancer.getInfo()); 
phantomDancer.use(); 
console.log(`Durability: ${phantomDancer.durability}`); 
phantomDancer.repair(); 
console.log(`Durability after repair: ${phantomDancer.durability}`); 



  // Защита от ошибок при доступе к свойствам
  const unknownItem = null;
  console.log(unknownItem?.getInfo?.()); // ничего не произойдёт, не будет ошибки

/**
 * Функция-конструктор Item
 * @constructor
 */
function ItemFn(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }
  
  ItemFn.prototype.getInfo = function () {
    return `Name: ${this.name}, Weight: ${this.weight}kg, Rarity: ${this.rarity}`;
  };
  
  ItemFn.prototype.setWeight = function (newWeight) {
    this.weight = newWeight;
  };
  
  /**
   * Функция-конструктор Weapon (наследуется от Item)
   * @constructor
   */
  function WeaponFn(name, weight, rarity, damage, durability) {
    ItemFn.call(this, name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }
  
  WeaponFn.prototype = Object.create(ItemFn.prototype);
  WeaponFn.prototype.constructor = WeaponFn;
  
  WeaponFn.prototype.use = function () {
    if (this.durability > 0) {
      this.durability -= 10;
      console.log(`${this.name} used. Durability: ${this.durability}`);
    } else {
      console.log(`${this.name} is broken.`);
    }
  };
  
  WeaponFn.prototype.repair = function () {
    this.durability = 100;
    console.log(`${this.name} repaired.`);
  };
  // Тестирование
// Тестируем функцию-конструктор ItemFn
const doranRing = new ItemFn("Doran Ring", 0.1, "epic");
console.log(doranRing.getInfo()); 

doranRing.setWeight(0.2);
console.log(doranRing.getInfo()); 

// Тестируем функцию-конструктор WeaponFn
const guardianSword = new WeaponFn("Guardian Sword", 4, "rare", 17, 9);
console.log(guardianSword.getInfo()); 

guardianSword.use(); 

console.log(`Durability: ${guardianSword.durability}`); 

guardianSword.use();

guardianSword.repair(); 
console.log(`Durability after repair: ${guardianSword.durability}`); 



  
  
