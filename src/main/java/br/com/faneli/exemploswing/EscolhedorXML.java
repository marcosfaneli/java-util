/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.exemploswing;

import com.sun.java.swing.plaf.windows.WindowsTreeUI;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.Collections;
import java.util.List;
import javax.swing.JFileChooser;
import javax.swing.JOptionPane;

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
