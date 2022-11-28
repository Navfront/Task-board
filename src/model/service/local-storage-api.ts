type Cb = any

interface Item {
  id: string
  [k: string]: any
}
/**
 * Класс для работы с LocalStorage
 * Используйте метод getInstance()
 */
export class LocalStorageApi {
  private static _instance: LocalStorageApi = new LocalStorageApi()

  constructor() {
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
   * Добавляет новый item в Localstorage
   * @param type строка, описывающая тип создаваемого обьекта
   * @param item сам обьект item
   * @param cb при успехе выполнится cb(items)
   * @returns возвращает item
   */

  addItem<T extends Item>(type: string, item: T, cb: Cb = () => {}): T {
    const items = this.getItems(type)
    items.push(item)
    this.setItems(type, items)
    cb(items)
    return item
  }

  /**
   * Записывает в LocalStorage
   * @param type строка, описывающая тип создаваемого обьекта
   * @param items Принимает массив проектов
   * @param cb Исполняет cb(items)
   */
  setItems<T extends Item>(type: string, items: T[], cb: Cb = () => {}): T[] {
    localStorage.setItem(type, JSON.stringify(items))
    cb(items)
    return items
  }

  /**
   * Метод берет из LocalStorage все проекты если они есть.
   * @param type строка, описывающая тип создаваемого обьекта
   * @param cb Исполняет cb(items)
   * @returns Возвращает массив с проектами пустой массив если данных нет
   */
  getItems<T extends Item>(type: string, cb: Cb = () => {}): T[] {
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
   * Метод обновляет данные проекта на представленные, либо удаляет проект при shallDelete = true. Принимает колбэк на исполнение при удаче.
   * @param type строка, описывающая тип создаваемого обьекта
   * @param Item Обьект проекта, обязательное поле id
   * @param shallDelete Удалить проект если true
   * @param Cb Выполнится при успехе cb(items)
   * @returns boolean в зависимости от успеха
   */
  updateItemById<T extends Item>(
    type: string,
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
