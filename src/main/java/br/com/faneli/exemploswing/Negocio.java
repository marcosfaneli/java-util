/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.exemploswing;

import java.util.Date;

/**
 *
 * @author marcos.faneli
 */
public class Negocio {

    private Date data;
    private Double quantidade;
    private Double preco;

    Negocio(double preco, double quantidade, Date data) {
        this.preco = preco;
        this.quantidade = quantidade;
        this.data = data;
    }

    public Double getPreco() {
        return this.preco;
    }

    public Double getQuantidade() {
        return this.quantidade;
    }

    public Date getData() {
        return this.data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }
    
}
