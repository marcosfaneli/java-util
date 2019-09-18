/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.exemploswing;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Cursor;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.net.URL;
import java.util.List;
import javax.swing.BoxLayout;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.SwingConstants;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;

/**
 *
 * @author marcos.faneli
 */
public class ArgentumUI {

    private JFrame janela;

    public static void main(String[] args) {
        new ArgentumUI().montaTela();
    }
    private JPanel painelPrincipal;
    private JTable tabela;
    private JPanel menu;

    private void montaTela() {
        
        new SplashScreen(3000).showSplash();
        
        preparaJanela();
        preparaPainelPrincipal();
        preparaMenuEsquerda();
//        preparaTitulo();
//        preparaTabela();
//        preparaBotaoCarregar();
        preparaBotaoSair();
        mostraJanela();
    }

    private void mostraJanela() {
//        for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()){
//            System.out.println(info.getName());
//        }
        
        try {
            UIManager.setLookAndFeel("com.sun.java.swing.plaf.windows.WindowsLookAndFeel");
        } catch (ClassNotFoundException | IllegalAccessException | InstantiationException | UnsupportedLookAndFeelException ignored) {
        }

        SwingUtilities.updateComponentTreeUI(janela);
        janela.pack();
        janela.setExtendedState(JFrame.MAXIMIZED_BOTH);
        janela.setVisible(true);
    }

    private void preparaBotaoCarregar() {
        JButton botaoCarregar = new JButton("Carrega XML");
        botaoCarregar.addActionListener((ActionEvent e) -> {
            List<Negocio> lista = new EscolhedorXML().escolhe();
            
            NegociosTableModel ntm = new NegociosTableModel(lista);
            
            tabela.setModel(ntm);
        });

        painelPrincipal.add(botaoCarregar);
//        botaoCarregar.addActionListener(new ActionListener(){;
//            @Override
//            public void actionPerformed(java.awt.event.ActionEvent e) {
//                new EscolhedorXML().escolhe();
//            }
//        });
    }

    private void preparaBotaoSair() {
        JButton botaoSair = new JButton("Sair");
        botaoSair.addActionListener((ActionEvent e) -> {
            System.exit(0);
        });

        painelPrincipal.add(botaoSair);
    }

    private void preparaPainelPrincipal() {
        painelPrincipal = new JPanel();
        janela.add(painelPrincipal);
    }

    private void preparaJanela() {
        janela = new JFrame("Argentum");
        janela.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    private void preparaTabela() {
        tabela = new JTable();
        
        JScrollPane scroll = new JScrollPane();
        scroll.getViewport().add(tabela);
        
        painelPrincipal.add(scroll);
    }

    private void preparaTitulo() {
        JLabel titulo = new JLabel("Lista de negócios", SwingConstants.CENTER);
        titulo.setFont(new Font("Verdana", Font.BOLD, 25));
        painelPrincipal.add(titulo);
    }

    private void preparaMenuEsquerda() {
        menu = new JPanel();
        menu.setBackground(Color.BLACK);
        janela.add(menu, BorderLayout.WEST);
        
        JPanel panelLogo = new JPanel();
        panelLogo.setBackground(Color.BLACK);
        panelLogo.setLayout(new BoxLayout(panelLogo, BoxLayout.PAGE_AXIS));
        menu.add(panelLogo, BorderLayout.SOUTH);
        
        URL url = getClass().getResource("/logo.png");
        JLabel img = new JLabel(new ImageIcon(url));
        panelLogo.add(img, BorderLayout.CENTER);
        
        JPanel itensMenu = new JPanel();
        itensMenu.setBackground(Color.BLACK);
        menu.add(itensMenu, BorderLayout.LINE_START);
        
        JLabel titulo = new JLabel("Cadastro", SwingConstants.CENTER);
        titulo.setForeground(Color.WHITE);
        titulo.setCursor(new Cursor(Cursor.HAND_CURSOR));

        itensMenu.add(titulo);
    }

}
