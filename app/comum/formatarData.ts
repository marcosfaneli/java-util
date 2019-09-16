export class FormatarData {

    ano = 0;
    mes = 0;
    dia = 0;
    hora = 0;
    minuto = 0;
    segundo = 0;

    constructor(ano, mes, dia, hora, minuto, segundo) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.hora = hora;
        this.minuto = minuto;
        this.segundo = segundo;
    }

    public setData(data: Date) {
        this.ano = data.getFullYear();
        this.mes = data.getMonth() + 1;
        this.dia = data.getDate();
        this.hora = data.getHours();
        this.minuto = data.getMinutes();
        this.segundo = data.getSeconds();
    }

    private getHoraString() {

        let horaString = this.hora.toString();
        let minutoString = this.minuto.toString();
        let segundoString = this.segundo.toString();

        if (horaString.length < 2) {
            horaString = '0' + horaString;
        }

        if (minutoString.length < 2) {
            minutoString = '0' + minutoString;
        }

        if (segundoString.length < 2) {
            segundoString = '0' + segundoString;
        }

        return horaString + ':' + minutoString + ':' + segundoString;

    }

    public getDataString(): string {
        let retorno = '';
        const anoString = this.ano.toString();
        let mesString = this.mes.toString();
        let diaString = this.dia.toString();
        const hora = this.getHoraString();
        const dataString = new Date().toString();
        const fuso = dataString.substr(dataString.indexOf('GMT') + 3, 3 ) + ':' + dataString.substr(dataString.indexOf('GMT') + 6, 2 );

        if (mesString.length < 2) {
            mesString = '0' + mesString;
        }

        if (diaString.length < 2) {
            diaString = '0' + diaString;
        }

        retorno += anoString + '-' + mesString + '-' + diaString + 'T' + hora + fuso;

        return retorno;
    }
    public getDataFormatada(): string {
        let retorno = '';
        const anoString = this.ano.toString();
        let mesString = this.mes.toString();
        let diaString = this.dia.toString();

        if (mesString.length < 2) {
            mesString = '0' + mesString;
        }

        if (diaString.length < 2) {
            diaString = '0' + diaString;
        }

        retorno = diaString + '/' + mesString + '/' + anoString;

        return retorno;
    }
}
