export function timeDiff(t: string): number {
    const date = parseTimestamp(t);

    const now = new Date();
    const dateNow = new Date(
        1970,
        0,
        1,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
    );

    const differenceInMilliseconds = Math.abs(
        dateNow.getTime() - date.getTime(),
    );

    const differenceInMinutes = Math.floor(
        differenceInMilliseconds / (1000 * 60),
    );

    return differenceInMinutes;
}

export function parseTimestamp(t: string): Date {
    const [h, m, s] = t.split(":").map(Number);

    return new Date(1970, 0, 1, h, m, s);
}
