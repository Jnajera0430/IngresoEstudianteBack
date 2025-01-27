import { Worksheet } from "exceljs";

const campusFileRequired = ["Tipo de Documento", "Número de Documento", "Nombre", "Estado", "Apellidos", "FICHA", "FECHA INICIO", "FECHA FIN", "PROFESOR", "TIPO DE DOCUMENTO", "DOCUMENTO", "NOMBRE", "APELLIDOS", "ESTADO"]
export const validDataEmpty = (data: string[] = []) => data.length && data.every(item => item && item.toString().length > 0);
export const validCampusFile = (workSheet: any, numRow: number) => {
    const cellObject = {
        1: "A",
        2: "B",
        3: "C",
        4: "D",
        5: "E",
    }
    for (const cell of Object.values(cellObject)) {
        const dataCampus = workSheet[cell + numRow].v
        switch (cell) {
            case "A":
                if (!campusFileRequired.includes(dataCampus)) return false
                break;
            case "B":
                if (!campusFileRequired.includes(dataCampus)) return false
                break;
            case "C":
                if (!campusFileRequired.includes(dataCampus)) return false
                break;
            case "D":
                if (!campusFileRequired.includes(dataCampus)) return false
                break;
            case "E":
                if (!campusFileRequired.includes(dataCampus)) return false
                break;
        }
    }

    return true;
}