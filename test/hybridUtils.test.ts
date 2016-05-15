import {HybridValue, ArrayValue, ObjectValue, NumberValue
    , StringValue, BoolValue, NullValue} from "../src/models.ts";
import {HybridUtils} from "../src/hybridUtils";

describe("HybridUtils", () => {
    describe("primitiveToHybridValue function", () => {
        it("should return NumberValue", () => {
            const numberValue: NumberValue = HybridUtils.primitiveToHybridValue(1) as NumberValue;
            chai.assert.strictEqual(
                JSON.stringify({
                    content: numberValue.content, name: numberValue.name,
                    leaf: numberValue.leaf(), single: numberValue.single()
                }),
                JSON.stringify({ content: 1, name: "", leaf: true, single: true })
            );
        });

        it("should return StringValue", () => {
            const stringValue: StringValue = HybridUtils.primitiveToHybridValue("abc") as StringValue;
            chai.assert.strictEqual(
                JSON.stringify({
                    content: stringValue.content, name: stringValue.name,
                    leaf: stringValue.leaf(), single: stringValue.single()
                }),
                JSON.stringify({ content: "abc", name: "", leaf: true, single: true })
            );
        });

        it("should return BoolValue", () => {
            const boolValue: BoolValue = HybridUtils.primitiveToHybridValue(true) as BoolValue;
            chai.assert.strictEqual(
                JSON.stringify({
                    content: boolValue.content, name: boolValue.name,
                    leaf: boolValue.leaf(), single: boolValue.single()
                }),
                JSON.stringify({ content: true, name: "", leaf: true, single: true })
            );
        });

        it("should return ArrayValue which has NumberValues", () => {
            const arrayValue: ArrayValue = HybridUtils.primitiveToHybridValue([1, 2, 3]) as ArrayValue;
            chai.assert.strictEqual(
                JSON.stringify({
                    content: arrayValue.contents.map((elm: NumberValue) => {
                        return {
                            content: elm.content, name: elm.name,
                            leaf: elm.leaf(), single: elm.single()
                        };
                    }), name: arrayValue.name,
                    leaf: arrayValue.leaf(), root: arrayValue.root
                }),
                JSON.stringify({
                    content: [
                        { content: 1, name: "0", leaf: true, single: false },
                        { content: 2, name: "1", leaf: true, single: false },
                        { content: 3, name: "2", leaf: true, single: false }
                    ], name: "", leaf: false, root: true
                })
            );
        });

        it("should return ArrayValue which has nest-ArrayValue", () => {
            const arrayValue: ArrayValue = HybridUtils.primitiveToHybridValue([1, 2, [1, 2], 3]) as ArrayValue;
            chai.assert.strictEqual(
                JSON.stringify({
                    content: arrayValue.contents.map((elm: any) => {
                        if (elm instanceof NumberValue) {
                            return {
                                content: elm.content, name: elm.name,
                                leaf: elm.leaf(), single: elm.single()
                            };
                        } else {
                            return {
                                content: elm.contents.map((elm: NumberValue) => {
                                    return {
                                        content: elm.content, name: elm.name,
                                        leaf: elm.leaf(), single: elm.single()
                                    };
                                }), name: elm.name,
                                leaf: elm.leaf(), root: elm.root
                            };
                        }
                    }), name: arrayValue.name,
                    leaf: arrayValue.leaf(), root: arrayValue.root
                }),
                JSON.stringify({
                    content: [
                        { content: 1, name: "0", leaf: true, single: false },
                        { content: 2, name: "1", leaf: true, single: false },
                        {
                            content: [
                                { content: 1, name: "0", leaf: true, single: false },
                                { content: 2, name: "1", leaf: true, single: false },
                            ], name: "2", leaf: false, root: false
                        },
                        { content: 3, name: "3", leaf: true, single: false }
                    ], name: "", leaf: false, root: true
                })
            );
        });

        it("should return ObjectValue", () => {
            const objectValue: ObjectValue =
                HybridUtils.primitiveToHybridValue({ a: 1, b: 2, c: 3 }) as ObjectValue;
            chai.assert.strictEqual(
                JSON.stringify({
                    content: objectValue.contents.map((elm: NumberValue) => {
                        return {
                            content: elm.content, name: elm.name,
                            leaf: elm.leaf(), single: elm.single()
                        };
                    }), name: objectValue.name,
                    leaf: objectValue.leaf(), root: objectValue.root
                }),
                JSON.stringify({
                    content: [
                        { content: 1, name: "a", leaf: true, single: false },
                        { content: 2, name: "b", leaf: true, single: false },
                        { content: 3, name: "c", leaf: true, single: false }
                    ], name: "", leaf: false, root: true
                })
            );
        });

        it("should return ObjectValue which has nest-ObjectValue", () => {
            const objectValue: ObjectValue = HybridUtils.primitiveToHybridValue({ a: 1, b: 2, c: { a: 1, b: 2 }, d: 3 }) as ObjectValue;
            chai.assert.strictEqual(
                JSON.stringify({
                    content: objectValue.contents.map((elm: any) => {
                        if (elm instanceof NumberValue) {
                            return {
                                content: elm.content, name: elm.name,
                                leaf: elm.leaf(), single: elm.single()
                            };
                        } else {
                            return {
                                content: elm.contents.map((elm: NumberValue) => {
                                    return {
                                        content: elm.content, name: elm.name,
                                        leaf: elm.leaf(), single: elm.single()
                                    };
                                }), name: elm.name,
                                leaf: elm.leaf(), root: elm.root
                            };
                        }
                    }), name: objectValue.name,
                    leaf: objectValue.leaf(), root: objectValue.root
                }),
                JSON.stringify({
                    content: [
                        { content: 1, name: "a", leaf: true, single: false },
                        { content: 2, name: "b", leaf: true, single: false },
                        {
                            content: [
                                { content: 1, name: "a", leaf: true, single: false },
                                { content: 2, name: "b", leaf: true, single: false },
                            ], name: "c", leaf: false, root: false
                        },
                        { content: 3, name: "d", leaf: true, single: false }
                    ], name: "", leaf: false, root: true
                })
            );
        });
    });
});