export default class Utils {
    static randomInt(min, max) {
        return parseInt(Math.random() * (max - min) + min, 10);
    }
    
    static centerX(container, field) {
        field.x = Math.floor((container.width - field.width) / 2);
    }
    
    static addIfUnique(array, element) {
        if (array.indexOf(element) != -1) {
            return;
        }
        
        array.push(element);
    }
}