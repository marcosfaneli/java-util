export class TotalizadorGrafico {

    categorias: any[] = [];

    public processar(marcas: any[]) {
        marcas.forEach(element => {
            if (element.id === 40 || element.id === 31) {
                this.criarCategoria(element.dados, element.id);
            }
        });
    }

    private criarCategoria(dados: any[], marca: number) {
        dados.forEach(item => {
            let categoria: any;

            const index = this.categorias.findIndex((element) => element.id === item.id);

            if (index >= 0) {
                categoria = this.categorias[index];
            } else {
                categoria = {};

                categoria.id = item.id;
                categoria.nome = item.nome;
                categoria.interna = item.interna;
                categoria.valor_jaguar = 0;
                categoria.valor_land_rover = 0;

                this.categorias.push(categoria);
            }

            categoria.valor_jaguar += marca === 40 ? item.original + item.paralelo + item.lubrificante + item.pneu : 0;
            categoria.valor_land_rover += marca === 31 ? item.original + item.paralelo + item.lubrificante + item.pneu : 0;
        });
    }

    public getLabels(): string[] {
        const labels: string[] = [];
        this.categorias.forEach(item => {
            labels.push(item.nome);
        });
        return labels;
    }

    public getDados(): any[] {
        const dados: any[] = [];

        dados.push(this.valoresJaguar());
        dados.push(this.valoresLandRover());

        return dados;
    }

    private valoresJaguar(): any {
        const dados: any = {};
        dados.label = 'Jaguar';
        dados.data = [];

        this.categorias.forEach(item => {
            dados.data.push(item.valor_jaguar.toFixed(2));
        })

        return dados;
    }

    private valoresLandRover(): any {
        const dados: any = {};
        dados.label = 'Land Rover';
        dados.data = [];

        this.categorias.forEach(item => {
            dados.data.push(item.valor_land_rover.toFixed(2));
        });

        return dados;
    }

    public getColors(): any[] {
        return [
                {
                    backgroundColor: 'rgb(7, 214, 180)',
                    borderColor: 'rgb(5, 105, 126)'
                },
                {
                    backgroundColor: 'rgb(2, 56, 16)',
                    borderColor: 'rgb(1, 20, 6)'
                }
               ];
    }

    public getTipo(): string {
        return 'bar';
    }

    public getLegenda(): boolean {
        return true;
    }
}
