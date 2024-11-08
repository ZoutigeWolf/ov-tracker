import Base from "./Base";

interface Shape extends Base {
    id: string;
    line: [number, number][];
}

export default Shape;
