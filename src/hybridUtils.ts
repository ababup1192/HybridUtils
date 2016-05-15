import {HybridValue, ArrayValue, ObjectValue, NumberValue
    , StringValue, BoolValue, NullValue} from "./models.ts";


export namespace HybridUtils {
    export function primitiveToHybridValue(value: any, name: string = "", root: boolean = true): HybridValue {
        if (value instanceof Array) {
            return new ArrayValue((value as any[]).map((elm: any, idx: number) => {
                return primitiveToHybridValue(elm, idx.toString(), false);
            }), root, name);
        } else if (value instanceof Object) {
            return new ObjectValue(Object.keys(value).map((key: string) => {
                return primitiveToHybridValue(value[key], key, false);
            }), root, name);
        } else if (typeof value === "number") {
            return new NumberValue(value as number, name);
        } else if (typeof value === "string") {
            return new StringValue(value as string, name);
        } else if (typeof value === "boolean") {
            return new BoolValue(value as boolean, name);
        } else {
            return new NullValue(name);
        }
    }
}