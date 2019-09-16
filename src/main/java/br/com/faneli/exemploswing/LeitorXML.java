/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.exemploswing;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

/**
 *
 * @author marcos.faneli
 */
public class LeitorXML {

    List<Negocio> carrega(FileReader reader) {
        List<Negocio> lista = new ArrayList<>();
        
        lista.add(new Negocio(1.2, .5, Calendar.getInstance().getTime()));
        lista.add(new Negocio(1.2, .5, Calendar.getInstance().getTime()));
        lista.add(new Negocio(1.2, .5, Calendar.getInstance().getTime()));
        
        return lista;
    }
    
}
