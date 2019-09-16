import { ListItem } from './ListItem';

export class ListitemBuilder {

    private itens: ListItem[] = [];

    public add(valor, texto): ListitemBuilder {
        this.itens.push(new ListItem(valor, texto));
        return this;
    }

    public build(): ListItem[] {
        return this.itens;
    }
}
