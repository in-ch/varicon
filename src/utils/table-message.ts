import colorMap from '@/src/utils/color-map';
import convertFromObjects, { Row } from '@/src/utils/convert-from-objects';

interface BoxedMessageProps {
    data: Row[]
    textColor?: keyof typeof colorMap;
    headerColor?: keyof typeof colorMap;
    borderColor?: keyof typeof colorMap;
}

/**
 * @param {Row[]} data table data
 * @param {Color} textColor text color
 * @param {Color} headerColor header color
 * @param {Color} borderColor border color
 * @description This function will draw a table with the given data
 * @returns {void} console with the table
 */
export default function boxedMessage({
    data,
    textColor = colorMap.default,
    headerColor = colorMap.default,
    borderColor = colorMap.default
}: BoxedMessageProps): void {
    const { rows, column } = convertFromObjects(data);
    const borderColorCode = colorMap[borderColor] || colorMap.default;
    const headerColorCode = colorMap[headerColor] || colorMap.default;
    const textColorCode = colorMap[textColor] || colorMap.default;

    const initialLength = column.map((message) => message.length + 2);
    const boxWidths = initialLength.map((col, index) => {
        return rows.reduce((length, row) => Math.max(row[index].length + 2, length), col);
    });
    const padIndex = (str: string, index: number) => `${textColorCode}${str.padEnd(boxWidths[index])}`;
    const padHeaderIndex = (str: string, index: number) => `${headerColorCode}${str.padEnd(boxWidths[index])}`;
    const drawHeaderTopBoder = () => `${borderColorCode}┌${column.map((_, index) => "".padEnd(boxWidths[index] + 1, `─`)).join("┬")}┐`;
    const drawHeaderBottomBoder = () => `${borderColorCode}├${column.map((_, index) => "".padEnd(boxWidths[index] + 1, `─`)).join("┼")}┤`;
    const drawFooterBottomBoder = () => `${borderColorCode}└${column.map((_, index) => "".padEnd(boxWidths[index] + 1, `─`)).join("┴")}┘`;

    // Draw the top border
    console.log(drawHeaderTopBoder());
    console.log(`${borderColorCode}│ ${column.map(padHeaderIndex).join(`${borderColorCode}│ `)}${borderColorCode}│`);
    console.log(drawHeaderBottomBoder());
    rows.forEach((row) => {
        console.log(`${borderColorCode}│ ${row.map(padIndex).join(`${borderColorCode}│ `)}│`);
    });
    // Draw the bottom border
    console.log(`${drawFooterBottomBoder()}${colorMap['default']}`);
}
