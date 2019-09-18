/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.exemploswing;

import java.util.List;

/**
 *
 * @author marcos.faneli
 */
public class EscolhedorXML {

    public List<Negocio> escolhe() {

//        try {
//            JFileChooser chooser = new JFileChooser();
            
            return new LeitorXML().carrega(null);

//            Integer retorno = chooser.showOpenDialog(null);
//
//            if (retorno == JFileChooser.APPROVE_OPTION) {
//                FileReader reader = new FileReader(chooser.getSelectedFile());
//
//                return new LeitorXML().carrega(reader);
//            }
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//        }
//
//        return Collections.emptyList();
    }

}
