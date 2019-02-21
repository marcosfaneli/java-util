/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.maven;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.jboss.resteasy.client.jaxrs.ResteasyWebTarget;

/**
 *
 * @author faneli
 */
public class ClientRest {

    private Client client;

    private WebTarget webTarget;

    private final String URL_SERVICE = "http://200.179.98.130:8521/log_interface/api/log";

    public ClientRest() {
        this.client = ClientBuilder.newBuilder().build();
    }

    public String post(Request request) {
        
        String json = "{\"cnpj_dealer\":\"00111222000133\",\"nome_dealer\":\"Empresa teste\",\"log\":\"<tag>teste</tag>\",\"tipo\":1}";

        ResteasyClient cli = new ResteasyClientBuilder().build();
        ResteasyWebTarget target = cli.target(URL_SERVICE);
        Response response = target.request().post(Entity.entity(json, MediaType.APPLICATION_JSON));
        String value = response.readEntity(String.class);
        System.out.println(value);
        response.close();
        return value;
    }
}
