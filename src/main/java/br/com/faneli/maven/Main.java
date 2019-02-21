/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.maven;

/**
 *
 * @author faneli
 */
public class Main {

    public static void main(String args[]){
        testarEnvioJson();
    }

    private static void testarEnvioJson() {
        ClientRest service = new ClientRest();
        Request request = new Request();
        service.post(request);
    }
}
