export function getFloorUtil(index: number, lastFloor: number): string {
    return Math.abs(lastFloor - index).toString();
}