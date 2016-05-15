import {Utils} from "./utils";

abstract class HybridValue {
    public id: string;
    public name: string;

    constructor(name: string) {
        this.id = Utils.uuid();
        this.name = name;
    }

    public abstract leaf(): boolean;
}

class ArrayValue extends HybridValue {
    constructor(public contents: HybridValue[], public root: boolean, name: string = "") {
        super(name);
    }

    public leaf(): boolean {
        return this.contents.length === 0;
    }
}

class ObjectValue extends HybridValue {
    constructor(public contents: HybridValue[], public root: boolean, name: string = "") {
        super(name);
    }

    public leaf(): boolean {
        return this.contents.length === 0;
    }
}

class NumberValue extends HybridValue {
    constructor(public content: number, name: string = "") {
        super(name);
    }

    public leaf(): boolean {
        return true;
    }

    public single(): boolean {
        return this.name === "";
    }
}

class StringValue extends HybridValue {
    constructor(public content: string, name: string = "") {
        super(name);
    }

    public leaf(): boolean {
        return true;
    }

    public single(): boolean {
        return this.name === "";
    }
}

class BoolValue extends HybridValue {
    constructor(public content: boolean, name: string = "") {
        super(name);
    }

    public leaf(): boolean {
        return true;
    }

    public single(): boolean {
        return this.name === "";
    }
}

class NullValue extends HybridValue {
    constructor(name: string = "") {
        super(name);
    }

    public leaf(): boolean {
        return true;
    }

    public single(): boolean {
        return this.name === "";
    }
}

export {HybridValue, ArrayValue, ObjectValue, NumberValue, StringValue, BoolValue, NullValue}