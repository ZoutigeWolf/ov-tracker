type Grouped<T> = { [key: string]: T[] };

function groupBy<T, K extends keyof T>(
    arr: T[],
    key: (item: T) => K,
): Grouped<T> {
    return arr.reduce((acc: Grouped<T>, currentValue: T) => {
        const group = key(currentValue).toString();

        if (acc[group] == undefined) {
            acc[group] = [];
        }

        acc[group].push(currentValue);

        return acc;
    }, {});
}

export default groupBy;
