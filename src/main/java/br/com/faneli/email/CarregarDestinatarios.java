/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.email;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 *
 * @author marcos.faneli
 */
public class CarregarDestinatarios {

    String caminho = "c:/emails.txt";

    public String[] listar() throws FileNotFoundException, IOException {

        int tamanho = definirTamanho(caminho);

        String[] emails = new String[tamanho];

        try (BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(caminho)))) {
            String linha = br.readLine();

            for (int i = 0; i < tamanho; i++) {
                emails[i] = linha;
                linha = br.readLine();
            }
        }

        return emails;
    }

    private int definirTamanho(String caminho) throws FileNotFoundException, IOException {
        int tamanho = 0;

        try (BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(caminho)))) {
            tamanho = (int) br.lines().count();
        }

        return tamanho;
    }
}
