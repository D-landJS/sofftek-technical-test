import { TRANSLATION } from '../constants/translation.constant';

export class TranslateHelper {
  static translateProperty(data: Array<object>) {
    return data.map((item: object) => {
      const newItem = {};
      for (const [key, value] of Object.entries(item)) {
        newItem[TRANSLATION[key] ?? key] = value;
      }
      return newItem;
    });
  }
}
