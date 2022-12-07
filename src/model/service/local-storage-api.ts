import { Item, LocalStorageApiTypes } from '../data-types'
type Cb = any

/**
 * Класс для работы с LocalStorage
 * Используйте метод getInstance()
 */
export class LocalStorageApi {
  private static _instance: LocalStorageApi = new LocalStorageApi()
  order: { [key: string]: number }

  constructor() {
    this.order = {}
    if (LocalStorageApi._instance !== undefined) {
      throw new Error(
        'Error: Instantiation failed: Use LocalStorageApi.getInstance() instead of new.'
      )
    }
    LocalStorageApi._instance = this
  }

  public static getInstance(): LocalStorageApi {
    return this._instance
  }

  /**
   * Счетчик item's
   * @returns возвращает текущее значение order
   */
  private getLastOrder(type: LocalStorageApiTypes): number {
    const name = 'lastOrderOf' + type
    let num
    console.log(typeof this.order[name])

    if (typeof this.order[name] === 'undefined') {
      const str = localStorage.getItem(name)
      if (str === null) {
        num = 0
      } else {
        num = parseInt(str)
      }
      if (!isNaN(num)) {
        this.order[name] = num
      } else {
        this.order[name] = 0
      }
    }
    localStorage.setItem(name, String(this.order[name] + 1))
    return this.order[name]++
  }

  /**
   * Добавляет новый item в Localstorage
   * @param type строка, описывающая тип создаваемого обьекта
   * @param item сам обьект item
   * @param cb при успехе выполнится cb(items)
   * @returns возвращает item
   */

  addItem<T extends Item>(type: LocalStorageApiTypes, item: T, cb: Cb = () => {}): T {
    const items = this.getItems(type)
    console.log(this.order)

    const newItem = { ...item, order: this.getLastOrder(type) }
    items.push(newItem)
    this.setItems(type, items)
    cb(items)
    return newItem
  }

  /**
   * Записывает в LocalStorage
   * @param type строка, описывающая тип создаваемого обьекта
   * @param items Принимает массив items
   * @param cb Исполняет cb(items)
   */
  setItems<T extends Item>(type: LocalStorageApiTypes, items: T[], cb: Cb = () => {}): T[] {
    localStorage.setItem(type, JSON.stringify(items))
    cb(items)

    return items
  }

  /**
   * Метод берет из LocalStorage все items если они есть.
   * @param type строка, описывающая тип создаваемого обьекта
   * @param cb Исполняет cb(items)
   * @returns Возвращает массив с items пустой массив если данных нет
   */
  getItems<T extends Item>(type: LocalStorageApiTypes, cb: Cb = () => {}): T[] {
    const response = localStorage.getItem(type)
    if (response !== null) {
      const parsed = JSON.parse(response) as T[]
      cb(parsed)
      return parsed.map((it) => ({
        ...it,
        time: it.time != null ? new Date(it.time) : null
      }))
    }
    return []
  }

  /**
   * Метод обновляет данные item на представленные, либо удаляет item при shallDelete = true. Принимает колбэк на исполнение при удаче.
   * @param type строка, описывающая тип создаваемого обьекта
   * @param Item Обьект item, обязательное поле id
   * @param shallDelete Удалить items если true
   * @param Cb Выполнится при успехе cb(item)
   * @returns boolean в зависимости от успеха
   */
  updateItemById<T extends Item>(
    type: LocalStorageApiTypes,
    item: T,
    shallDelete: boolean = false,
    cb: Cb = () => {}
  ): boolean {
    const items = this.getItems(type)
    if (items.length > 0) {
      const index = items.findIndex((p) => p.id === item.id)
      if (index >= 0) {
        if (shallDelete) {
          const newItems = [...items.slice(0, index), ...items.slice(index + 1)]
          cb(newItems)
          this.setItems(type, newItems)
          return true
        } else {
          const newItems = [
            ...items.slice(0, index),
            { ...items[index], ...item },
            ...items.slice(index + 1)
          ]
          this.setItems(type, newItems)
          cb(newItems)
          return true
        }
      }
      return false
    }
    return false
  }
}
