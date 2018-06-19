export class EnumOption {
    id: number;
    name: string;
}
export abstract class EnumHelper {

    static getEnumOptions(type: any): EnumOption[] {
      return Object.keys(type)
        .filter(state => isNaN(<any>state) && state !== "values")
        .map(state => {
          return {
            id: type[state],
            name:  state 
          };
        });
    }
}