/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.maven;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author faneli
 */
@XmlRootElement
public class Request {
    
    @XmlElement(name = "nome_dealer")
    private String nome;
    @XmlElement(name = "cnpj_dealer")
    private String cnpj;
    private int tipo;
    private String log;

    public Request() {
        nome = "teste";
        cnpj = "1234";
        tipo = 2;
        log = "<dados><mensagem>uahca</mensagem></dados>";
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public int getTipo() {
        return tipo;
    }

    public void setTipo(int tipo) {
        this.tipo = tipo;
    }

    public String getLog() {
        return log;
    }

    public void setLog(String log) {
        this.log = log;
    }
    
}
