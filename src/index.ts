import {getType,} from "./utils/is";

type StoreType = keyof typeof STORES
type TypeIsValue = keyof typeof TYPE_IS_VALUE

const STORES = {
    localStorage,
    sessionStorage
}

// undefined 不被保存，NaN 被转为 null
const TYPE_IS_VALUE = {
    'undefined': undefined,
    'NaN': NaN
}

const TYPE_IS_VALUE_KEY = Object.keys(TYPE_IS_VALUE)

class DZStorage {
    protected store: Storage

    constructor(type: StoreType) {
        this.store = STORES[type]
    }

    private pack(originalData: unknown) {
        const type = getType(originalData)
        return JSON.stringify({value: originalData, type})
    }

    set(key: string, value: unknown) {
        const packValue = this.pack(value)
        this.store.setItem(key, packValue)
    }

    get(key: string): unknown {
        const wrapper = JSON.parse(this.store.getItem(key) as string)

        if (wrapper) {
            const {value, type} = wrapper

            // 类型既值
            if (TYPE_IS_VALUE_KEY.includes(type)) {
                return TYPE_IS_VALUE[type as TypeIsValue]
            } else {
                return value
            }
        } else {
            // 该 key 无对应的值，为 null
            return wrapper
        }
    }
}

const store = new DZStorage('localStorage')

export default store
