const _REGEX = /^\[object |\]$/g;
const TYPE_MAPING = {
    'String': 'string',
    'Boolean': 'boolean',
    'Undefined': 'undefined',
    'Null': 'null',
    'Number': 'number',
    'NaN': 'NaN',
    'object': 'object',
};
// 类型清晰的类型
const CLEAR_TYPES = ['String', 'Boolean', 'Undefined', 'Null'];
const LIKE_OBJECT_TYPES = ['Object', 'Array'];
const judgeType = (val) => Object.prototype.toString.call(val);
function isNumber(val) {
    return !Number.isNaN(val) && judgeType(val) === '[object Number]';
}
function getType(val) {
    const typeText = judgeType(val);
    const replaced = typeText.replace(_REGEX, '');
    // 类型为 String、Boolean、Undefined、Null 直接输出
    if (CLEAR_TYPES.includes(replaced)) {
        return TYPE_MAPING[replaced];
    }
    // NaN or 数值
    if (replaced === 'Number') {
        if (isNumber(val)) {
            return TYPE_MAPING[replaced];
        }
        else {
            return TYPE_MAPING['NaN'];
        }
    }
    // 对象 or 数组
    if (LIKE_OBJECT_TYPES.includes(replaced)) {
        return TYPE_MAPING['object'];
    }
}

const STORES = {
    localStorage,
    sessionStorage
};
// undefined 不被保存，NaN 被转为 null
const TYPE_IS_VALUE = {
    'undefined': undefined,
    'NaN': NaN
};
const TYPE_IS_VALUE_KEY = Object.keys(TYPE_IS_VALUE);
class DZStorage {
    constructor(type) {
        this.store = STORES[type];
    }
    pack(originalData) {
        const type = getType(originalData);
        return JSON.stringify({ value: originalData, type });
    }
    set(key, value) {
        const packValue = this.pack(value);
        this.store.setItem(key, packValue);
    }
    get(key) {
        const wrapper = JSON.parse(this.store.getItem(key));
        if (wrapper) {
            const { value, type } = wrapper;
            // 类型既值
            if (TYPE_IS_VALUE_KEY.includes(type)) {
                return TYPE_IS_VALUE[type];
            }
            else {
                return value;
            }
        }
        else {
            // 该 key 无对应的值，为 null
            return wrapper;
        }
    }
}
const store = new DZStorage('localStorage');

export { store as default };
