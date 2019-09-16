import { BaseChartDirective } from 'ng2-charts';

export class DashBoard {

    public removerLabels(labels: any[], dados: any[], novosLabels: any[]): boolean {
        let retorno = false;

        labels.forEach(label => {

            const i: number = novosLabels.indexOf(label);
            const j: number = labels.indexOf(label);

            if (i < 0) {
                dados.splice(j, 1);
                labels.splice(j, 1);
                retorno = true;
            }
        });

        return retorno;
    }

    public reloadChart(atualizacoes: boolean, chart: BaseChartDirective) {
        if (chart !== undefined) {
          if (atualizacoes) {
            chart.chart.update();
          } else {
            chart.ngOnInit();
          }
        }
    }

}
