/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.restclient;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.json.JSONObject;
import org.json.JSONTokener;

/**
 *
 * @author marcos.faneli
 */
public class RestClient {

    private final String url = "http://localhost/log";

    public int enviar(String mensagem) {
        return send(gerarRequest(mensagem));
    }

    private String gerarRequest(String mensagem) {
        String xml = "<dados><excessao><mensagem><![CDATA[" + mensagem + "]]></mensagem></excessao></dados>";
        return "{\"cnpj_dealer\": \"00000000000000\",\"nome_cliente\": \"teste Interface\",\"log\": \"" + xml + "\",\"tipo\": 2}";
    }

    private int send(String request) {
        int retorno = 0;
        try {
            HttpClient client = new HttpClient();
            PostMethod post = new PostMethod(url);

            StringRequestEntity requestEntity = new StringRequestEntity(request, "application/json", "UTF-8");

            post.setRequestEntity(requestEntity);
            client.executeMethod(post);

            InputStream is = post.getResponseBodyAsStream();
            Reader rd = new BufferedReader(new InputStreamReader(is));

            JSONObject json = new JSONObject(new JSONTokener(rd));

            retorno = json.getInt("erro");
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
            retorno = 0;
        }
        return retorno;
    }
}
