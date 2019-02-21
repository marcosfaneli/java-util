/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.maven;

import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author faneli
 */
@XmlRootElement
public class Return {
    private int erro;

    public Return() {
    }

    public int getErro() {
        return erro;
    }

    public void setErro(int erro) {
        this.erro = erro;
    }
    
}
