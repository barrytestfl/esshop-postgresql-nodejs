export interface Value {
    AttributeValueId: number;
    Value: string;
    Count: number;
}

export interface AttributeValue {
    AttributeId: number;
    Name: string;
    Values: Value[];
}

export interface Filterattributes {
    attributeValues: AttributeValue[];
}

export default interface IFilterAttributes {
    filterattributes: Filterattributes;
}
 